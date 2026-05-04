export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { question } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.HF_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: "Answer from a Bible perspective: " + question,
        }),
      }
    );

    const text = await response.text(); // 🔥 important

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: "HF returned non-JSON",
        raw: text.slice(0, 200),
      });
    }

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
