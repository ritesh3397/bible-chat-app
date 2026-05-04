export default async function handler(req, res) {
  const { question } = req.body;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/flan-t5-base",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.HF_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: "Answer from a Bible perspective: " + question
      })
    }
  );

  const data = await response.json();

  res.status(200).json(data);
}
