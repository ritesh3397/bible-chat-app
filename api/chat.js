export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { question } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://bible-chat-app.vercel.app", // required
        "X-Title": "Bible Chat App" // required
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", 
        messages: [
          {
            role: "user",
            content: "Answer simply from a Bible perspective: " + question
          }
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(200).json({ error: data.error.message });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
