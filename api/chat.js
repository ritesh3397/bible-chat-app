export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { question } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.HF_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `<s>[INST] Answer in simple words from a Bible perspective: ${question} [/INST]`,
        }),
      }
    );

    const text = await response.text();
    console.log("HF RAW:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(200).json({ error: "Model loading, try again..." });
    }

    if (data.error) {
      return res.status(200).json({ error: data.error });
    }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
