export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const { system, messages, maxTokens } = req.body;
    const contents = (messages || []).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content || "") }],
    }));
    // Allow client to request more tokens (capped at 16384 for safety)
    const outputTokens = Math.min(Math.max(Number(maxTokens) || 4096, 1024), 16384);
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: String(system || "") }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: outputTokens },
        }),
      }
    );
    if (r.status === 429 || r.status === 503) {
      return res.status(r.status).json({ error: "Traffic is high" });
    }
    const data = await r.json();
    if (data.error) {
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
    return res.status(500).json({ error: e.message });
  }
}