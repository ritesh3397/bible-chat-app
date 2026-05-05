async function askAI() {
  let input = document.getElementById("question");
  let q = input.value.trim();
  let answerBox = document.getElementById("answer");

  if (!q) return;

  // clear input
  input.value = "";

  // 👉 user message bubble
  answerBox.innerHTML += `<div class="user-msg">${q}</div>`;
  scrollBottom();

  // 👉 typing indicator
  answerBox.innerHTML += `<div class="ai-msg typing">Typing...</div>`;
  scrollBottom();

  try {
    let res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: q })
    });

    let data = await res.json();

    // remove typing
    document.querySelector(".typing")?.remove();

    let answer =
      data.choices?.[0]?.message?.content ||
      data.error ||
      "No response";

    // 👉 AI message bubble
    answerBox.innerHTML += `<div class="ai-msg">${answer}</div>`;
    scrollBottom();

  } catch (err) {
    document.querySelector(".typing")?.remove();

    answerBox.innerHTML += `<div class="ai-msg">Error connecting AI</div>`;
    scrollBottom();
  }
}


// 🔥 auto scroll
function scrollBottom() {
  let box = document.getElementById("answer");
  box.scrollTop = box.scrollHeight;
}
