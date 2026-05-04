export default async function handler(req, res) {
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
          inputs: "Answer in simple words from Bible perspective: " + question,
        }),
      }
    );

    const text = await response.text();

    console.log("HF RAW:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(200).json({ error: "HF not ready, try again" });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
