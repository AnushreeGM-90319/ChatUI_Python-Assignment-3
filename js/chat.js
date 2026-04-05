const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const typing = document.getElementById("typing");
const welcome = document.getElementById("welcome");
const history = document.getElementById("history");

/* Time */
function getTime() {
  return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}

/* Response */
function getResponse(text) {
  text = text.toLowerCase();
  if (text.includes("hi")) return "Hello 😊";
  if (text.includes("ai")) return "AI means Artificial Intelligence 🤖";
  return "Tell me more!";
}

/* Add Message */
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);

  const avatar = document.createElement("div");
  avatar.classList.add("avatar", sender === "user" ? "user-avatar" : "bot-avatar");
  avatar.innerText = sender === "user" ? "U" : "B";

  const content = document.createElement("div");

  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.innerText = text;

  const time = document.createElement("div");
  time.classList.add("time");
  time.innerText = getTime();

  content.appendChild(bubble);
  content.appendChild(time);

  msg.appendChild(avatar);
  msg.appendChild(content);

  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

/* History */
function addToHistory(text) {
  const item = document.createElement("div");
  item.innerText = text;
  history.appendChild(item);
}

/* Send */
function sendMessage() {
  let text = input.value.trim();

  // 🔥 FIX: Remove unwanted line breaks
  text = text.replace(/\n+/g, " ");

  if (!text) return;

  addMessage(text, "user");
  addToHistory(text);

  input.value = "";
  input.style.height = "auto";

  sendBtn.disabled = true;
  welcome.style.display = "none";
  typing.style.display = "block";

  setTimeout(() => {
    typing.style.display = "none";
    addMessage(getResponse(text), "bot");
  }, 1000);
}

/* Button */
sendBtn.onclick = sendMessage;

/* Input handling */
input.addEventListener("input", () => {
  sendBtn.disabled = input.value.trim() === "";

  // auto resize
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});

/* 🔥 ENTER FIX */
input.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

/* Chips */
document.querySelectorAll(".chip").forEach(c => {
  c.onclick = () => {
    input.value = c.innerText;
    sendMessage();
  };
});

/* Dark mode */
document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

/* Sidebar */
document.getElementById("menuBtn").onclick = () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
};

/* Initial */
window.onload = () => {
  addMessage("Hello, Buddy here 👋 How can I help you?", "bot");
};