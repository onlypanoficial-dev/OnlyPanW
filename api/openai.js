export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Solo POST permitido" });

  const { message } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Falta la API key en el servidor" });
  }

  try {export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Solo POST permitido" });

  const { message } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "Falta la API key en el servidor" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Eres OnlyBot, experto en panadería y recetas." },
          { role: "user", content: message }
        ]
      }),
    });

    const data = await response.json();
    res.status(200).json({ reply: data.choices?.[0]?.message?.content || "No se obtuvo respuesta" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al conectar con OpenAI" });
  }
}

