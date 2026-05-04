async function askAI() {
  let q = document.getElementById("question").value;

  document.getElementById("answer").innerText = "Thinking...";

  let res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question: q })
  });

  let data = await res.json();

  let answer =
    data.choices?.[0]?.message?.content || "No response";

  document.getElementById("answer").innerText = answer;
}
