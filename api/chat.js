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
    // Allow client to request more tokens (capped at 16384 for safety)
    const outputTokens = Math.min(Math.max(Number(maxTokens) || 4096, 1024), 16384);
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const body = {
      systemInstruction: { parts: [{ text: String(system || "") }] },
      contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: outputTokens },
    };
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);
    let r;
    try {
      r = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } finally { clearTimeout(timeout); }
    if (r.status === 429 || r.status === 503) {
      return res.status(r.status).json({ error: "Traffic is high" });
    }
    if (!r.ok) {
      const errBody = await r.text();
      console.error(`[Questa AI] Gemini API error ${r.status}:`, errBody);
      // Try fallback model if primary fails
      const c2 = new AbortController();
      const t2 = setTimeout(() => c2.abort(), 50000);
      let r2;
      try {
        r2 = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: c2.signal }
        );
      } catch (e2) { clearTimeout(t2); return res.status(200).json({ text: "Gemini error: " + errBody.slice(0, 200) }); }
      clearTimeout(t2);
      if (r2.ok) {
        const data2 = await r2.json();
        const text2 = data2?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "No response";
        return res.status(200).json({ text: text2 });
      }
      return res.status(200).json({ text: "Gemini error: " + errBody.slice(0, 200) });
    }
    const data = await r.json();
    if (data.error) {
      console.error("[Questa AI] Gemini response error:", data.error);
      // Pass through rate limit errors
      if (data.error.code === 429 || data.error.message?.includes("quota") || data.error.message?.includes("rate")) {
        return res.status(429).json({ error: data.error.message });
      }
      return res.status(200).json({ text: "Gemini error: " + data.error.message });
    }
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "No response from Gemini";
    return res.status(200).json({ text });
  } catch (e) {
    console.error("[Questa AI] Exception:", e.message);
    return res.status(500).json({ error: e.message });
  }
}