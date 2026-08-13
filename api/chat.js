export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const { system, messages } = req.body;
    const contents = (messages || []).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content || "") }],
    }));
    const r = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: String(system || "") }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
        }),
      }
    );
    const data = await r.json();
    if (data.error) return res.status(200).json({ text: "Gemini error: " + data.error.message });
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "No response from Gemini";
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}