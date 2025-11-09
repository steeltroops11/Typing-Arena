let timerInterval;
let started = false;
let startTime;
let timeLeft;
let totalTime;
let currentText = "";

const sentences = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast helps you save time every day.",
    "Coding is fun when you understand the logic."
  ],
  medium: [
    "Practice typing daily to improve your accuracy and speed.",
    "Good typing habits can make your workflow more efficient.",
    "Always keep your fingers on the home row for better control."
  ],
  hard: [
    "Typing is not just about speed but also about maintaining rhythm and precision while avoiding errors during long paragraphs.",
    "A fast typist maintains focus, keeps posture straight, and balances both accuracy and momentum over extended sentences."
  ]
};

const startBtn = document.getElementById("start-btn");
const inputText = document.getElementById("input-text");
const displayText = document.getElementById("display-text");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const rewardPopup = document.getElementById("reward-popup");
const rewardMsg = document.getElementById("reward-message");
const levelSelect = document.getElementById("level");

startBtn.addEventListener("click", startTest);
inputText.addEventListener("input", checkProgress);

function startTest() {
  if (started) return;
  started = true;
  inputText.disabled = false;
  inputText.value = "";
  inputText.focus();
  startBtn.disabled = true;

  const level = levelSelect.value;
  const randomIndex = Math.floor(Math.random() * sentences[level].length);
  currentText = sentences[level][randomIndex];
  displayText.textContent = currentText;

  // Timer according to level
  if (level === "easy") totalTime = 30;
  else if (level === "medium") totalTime = 40;
  else totalTime = 50;

  timeLeft = totalTime;
  timerEl.textContent = timeLeft;
  startTime = new Date();

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      endTest();
    }
  }, 1000);
}

function checkProgress() {
  const typed = inputText.value.trim();
  if (typed === currentText.trim()) {
    endTest(true);
  }
}

function endTest(finishedEarly = false) {
  if (!started) return;
  started = false;
  clearInterval(timerInterval);

  const endTime = new Date();
  const timeTaken = (endTime - startTime) / 1000 / 60; // minutes
  const typedText = inputText.value.trim();
  const wordsTyped = typedText.split(/\s+/).filter(Boolean).length;
  const correctWords = countCorrectWords(currentText, typedText);
  const accuracy = Math.round((correctWords / wordsTyped) * 100) || 0;
  const wpm = Math.round(wordsTyped / timeTaken) || 0;

  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy;

  inputText.disabled = true;
  startBtn.disabled = false;
  saveResult(wpm, accuracy);
  showReward(wpm);

  if (finishedEarly) timerEl.textContent = "Done!";
}

function countCorrectWords(sample, typed) {
  const s = sample.split(/\s+/);
  const t = typed.split(/\s+/);
  let correct = 0;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === s[i]) correct++;
  }
  return correct;
}

function saveResult(wpm, accuracy) {
  const today = new Date().toISOString().split("T")[0];
  const record = { date: today, wpm, accuracy };
  let history = JSON.parse(localStorage.getItem("typingHistory")) || [];
  history.push(record);
  localStorage.setItem("typingHistory", JSON.stringify(history));
}

function showReward(wpm) {
  let message = "";
  if (wpm < 30) message = "🏅 Beginner! Keep Practicing!";
  else if (wpm < 50) message = "🥈 Intermediate! Nice Work!";
  else message = "🥇 Pro Typist! You're Amazing!";
  
  rewardMsg.textContent = message;
  rewardPopup.classList.add("show");
}

function closePopup() {
  rewardPopup.classList.remove("show");
}
const textArray = [
  "Welcome to Typing Arena",
  "Improve your typing skills!",
  "Compete. Practice. Dominate."
];
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

if ('windowControlsOverlay' in navigator) {
  navigator.windowControlsOverlay.addEventListener('geometrychange', debounce(e => {
    // Detect if the Window Controls Overlay is visible.
    const isOverlayVisible = navigator.windowControlsOverlay.visible;

    // Get the size and position of the title bar area.
    const titleBarRect = e.titlebarAreaRect;

    console.log(`The overlay is ${isOverlayVisible ? 'visible' : 'hidden'}, the title bar width is ${titleBarRect.width}px`);
  }, 200));
}