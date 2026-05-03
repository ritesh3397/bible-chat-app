async function askAI() {
  let q = document.getElementById("question").value;

  document.getElementById("answer").innerText = "Thinking...";

  try {
    let res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: q })
    });

    let data = await res.json();

    // HuggingFace response handle
    let answer =
      data[0]?.generated_text ||
      data.generated_text ||
      "No response";

    document.getElementById("answer").innerText = answer;

  } catch (err) {
    document.getElementById("answer").innerText = "Error connecting AI";
    console.error(err);
  }
}
