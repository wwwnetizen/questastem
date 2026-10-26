export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const { system, messages, maxTokens } = req.body;
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

    // Model cascade: try each in order; on 429/503/error, move to next
    const models = [
      "gemini-3.8-flash",
      "gemini-2.5-flash",
      "gemini-2.0-flash",
    ];

    for (let i = 0; i < models.length; i++) {
      const model = models[i];
      const url = `${base}/${model}:generateContent?key=${key}`;

      // Each model gets up to 2 attempts (retry once on 429 after short delay)
      for (let attempt = 0; attempt < 2; attempt++) {
        if (attempt > 0) {
          // Wait 2s before retry
          await new Promise((r) => setTimeout(r, 2000));
        }
        const ac = new AbortController();
        const tm = setTimeout(() => ac.abort(), 50000);
        let r;
        try {
          r = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: ac.signal,
          });
        } catch (fetchErr) {
          clearTimeout(tm);
          console.error(`[Questa AI] ${model} attempt ${attempt} fetch error:`, fetchErr.message);
          break; // network error -> skip to next model
        }
        clearTimeout(tm);

        // Rate limited -> retry once, then next model
        if (r.status === 429 || r.status === 503) {
          console.warn(`[Questa AI] ${model} returned ${r.status}, attempt ${attempt}`);
          if (attempt === 0) continue; // retry after delay
          break; // move to next model
        }

        if (!r.ok) {
          const errBody = await r.text().catch(() => "unknown error");
          console.error(`[Questa AI] ${model} error ${r.status}:`, errBody.slice(0, 300));
          break; // non-retryable error -> next model
        }

        // Got a 200 response
        const data = await r.json();

        // Check for in-body errors (Gemini sometimes returns 200 with error)
        if (data.error) {
          console.error(`[Questa AI] ${model} body error:`, data.error.message);
          if (data.error.code === 429 || data.error.message?.includes("quota") || data.error.message?.includes("rate")) {
            if (attempt === 0) continue; // retry
            break; // next model
          }
          break; // non-rate error -> next model
        }

        const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("");
        if (text) {
          return res.status(200).json({ text });
        }

        // Empty response -> next model
        console.warn(`[Questa AI] ${model} returned empty response`);
        break;
      }
    }

    // All models exhausted
    console.error("[Questa AI] All models failed");
    return res.status(429).json({ error: "All AI models are busy. Please try again in a moment." });
  } catch (e) {
    console.error("[Questa AI] Exception:", e.message);
    return res.status(500).json({ error: e.message });
  }
}
