export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const { system, messages, maxTokens, stream } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      console.error("[Questa AI] GEMINI_API_KEY is not set");
      return res.status(500).json({ error: "API key not configured" });
    }
    const contents = (messages || []).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content || "") }],
    }));
    const outputTokens = Math.min(Math.max(Number(maxTokens) || 4096, 1024), 16384);
    const body = {
      systemInstruction: { parts: [{ text: String(system || "") }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: outputTokens },
    };
    const key = process.env.GEMINI_API_KEY;
    const base = "https://generativelanguage.googleapis.com/v1beta/models";

    // Models to try -- fastest first
    const models = [
      "gemini-2.0-flash",
      "gemini-3.8-flash",
      "gemini-2.5-flash",
    ];

    // --- STREAMING MODE ---
    if (stream) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      for (const model of models) {
        const url = `${base}/${model}:streamGenerateContent?alt=sse&key=${key}`;
        const ac = new AbortController();
        const tm = setTimeout(() => ac.abort(), 55000);
        let r;
        try {
          r = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: ac.signal,
          });
        } catch (e) {
          clearTimeout(tm);
          continue; // next model
        }
        clearTimeout(tm);

        if (r.status === 429 || r.status === 503 || !r.ok) continue;

        // Stream chunks to client
        try {
          const reader = r.body.getReader();
          const decoder = new TextDecoder();
          let buf = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += decoder.decode(value, { stream: true });
            const lines = buf.split("\n");
            buf = lines.pop() || "";
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const json = line.slice(6).trim();
              if (!json || json === "[DONE]") continue;
              try {
                const chunk = JSON.parse(json);
                const text = chunk?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
                if (text) {
                  res.write(`data: ${JSON.stringify({ text })}\n\n`);
                }
              } catch {}
            }
          }
          res.write("data: [DONE]\n\n");
          res.end();
          return;
        } catch (streamErr) {
          console.error(`[Questa AI] Stream error with ${model}:`, streamErr.message);
          continue;
        }
      }

      // All models failed for streaming
      res.write(`data: ${JSON.stringify({ error: "All AI models are busy" })}\n\n`);
      res.end();
      return;
    }

    // --- NON-STREAMING MODE (for roadmaps etc.) ---
    for (const model of models) {
      const url = `${base}/${model}:generateContent?key=${key}`;
      const ac = new AbortController();
      const tm = setTimeout(() => ac.abort(), 55000);
      let r;
      try {
        r = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: ac.signal,
        });
      } catch (e) {
        clearTimeout(tm);
        continue;
      }
      clearTimeout(tm);

      if (r.status === 429 || r.status === 503) continue;
      if (!r.ok) continue;

      const data = await r.json();
      if (data.error) {
        if (data.error.code === 429 || data.error.message?.includes("quota") || data.error.message?.includes("rate")) continue;
        continue;
      }
      const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("");
      if (text) return res.status(200).json({ text });
    }

    return res.status(429).json({ error: "All AI models are busy. Please try again in a moment." });
  } catch (e) {
    console.error("[Questa AI] Exception:", e.message);
    return res.status(500).json({ error: e.message });
  }
}
