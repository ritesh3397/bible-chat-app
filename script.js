// Daily verse (static)
document.getElementById("verse").innerText =
  "John 3:16 - For God so loved the world...";

// Fake AI (abhi ke liye)
function askAI() {
  let q = document.getElementById("question").value;
  
  let response = "Pray and trust God. (" + q + ")";
  
  document.getElementById("answer").innerText = response;
}
