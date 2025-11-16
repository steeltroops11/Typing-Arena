let timerInterval;
let started = false;
let startTime;
let timeLeft;
let totalTime;
let currentText = "";

// Fallback sentences if API fails
const fallbackSentences = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast helps you save time every day.",
    "Coding is fun when you understand the logic.",
    "Practice makes perfect in everything you do.",
    "Technology changes the world every single day."
  ],
  medium: [
    "Practice typing daily to improve your accuracy and speed.",
    "Good typing habits can make your workflow more efficient.",
    "Always keep your fingers on the home row for better control.",
    "Consistency is key when learning any new skill.",
    "The best way to learn is through regular practice."
  ],
  hard: [
    "Typing is not just about speed but also about maintaining rhythm and precision while avoiding errors during long paragraphs.",
    "A fast typist maintains focus, keeps posture straight, and balances both accuracy and momentum over extended sentences.",
    "Mastering the keyboard requires dedication, patience, and continuous improvement through structured practice sessions.",
    "Professional typists understand that accuracy and speed work together to create efficient communication."
  ]
};

// API Configuration - Using Quotable API (free, no key required)
const API_ENDPOINTS = {
  easy: "https://api.quotable.io/random?minLength=20&maxLength=60",
  medium: "https://api.quotable.io/random?minLength=50&maxLength=100",
  hard: "https://api.quotable.io/random?minLength=100&maxLength=200"
};

// Fetch random sentence from API
async function fetchRandomSentence(level) {
  try {
    const response = await fetch(API_ENDPOINTS[level]);
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.warn("API fetch failed, using fallback:", error);
    // Use fallback sentences
    const fallback = fallbackSentences[level];
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
}

// DOM Elements - will be initialized when available
let startBtn, inputText, displayText, timerEl, wpmEl, accuracyEl, rewardPopup, rewardMsg, levelSelect;

// Initialize DOM elements and event listeners
function initTypingTest() {
  startBtn = document.getElementById("start-btn");
  inputText = document.getElementById("input-text");
  displayText = document.getElementById("display-text");
  timerEl = document.getElementById("timer");
  wpmEl = document.getElementById("wpm");
  accuracyEl = document.getElementById("accuracy");
  rewardPopup = document.getElementById("reward-popup");
  rewardMsg = document.getElementById("reward-message");
  levelSelect = document.getElementById("level");

  if (startBtn) startBtn.addEventListener("click", startTest);
  if (inputText) inputText.addEventListener("input", checkProgress);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTypingTest);
} else {
  initTypingTest();
}

async function startTest() {
  if (started || !startBtn || !inputText || !displayText || !timerEl || !levelSelect) return;
  
  // Show loading state
  startBtn.disabled = true;
  startBtn.textContent = "Loading...";
  if (displayText) displayText.textContent = "Fetching a new sentence...";
  
  const level = levelSelect.value;
  
  // Fetch sentence from API
  currentText = await fetchRandomSentence(level);
  if (displayText) displayText.textContent = currentText;
  
  started = true;
  inputText.disabled = false;
  inputText.value = "";
  inputText.focus();
  if (startBtn) startBtn.textContent = "Test Started";

  // Timer according to level
  if (level === "easy") totalTime = 30;
  else if (level === "medium") totalTime = 40;
  else totalTime = 50;

  timeLeft = totalTime;
  if (timerEl) timerEl.textContent = timeLeft;
  startTime = new Date();

  timerInterval = setInterval(() => {
    timeLeft--;
    if (timerEl) timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      endTest();
    }
  }, 1000);
}

function checkProgress() {
  if (!inputText || !currentText) return;
  const typed = inputText.value.trim();
  if (typed === currentText.trim()) {
    endTest(true);
  }
}

function endTest(finishedEarly = false) {
  if (!started) return;
  started = false;
  clearInterval(timerInterval);

  if (!inputText || !currentText) return;

  const endTime = new Date();
  const timeTaken = (endTime - startTime) / 1000 / 60; // minutes
  const typedText = inputText.value.trim();
  const wordsTyped = typedText.split(/\s+/).filter(Boolean).length;
  const correctWords = countCorrectWords(currentText, typedText);
  const accuracy = Math.round((correctWords / wordsTyped) * 100) || 0;
  const wpm = Math.round(wordsTyped / timeTaken) || 0;

  if (wpmEl) wpmEl.textContent = wpm;
  if (accuracyEl) accuracyEl.textContent = accuracy;

  inputText.disabled = true;
  if (startBtn) {
    startBtn.disabled = false;
    startBtn.textContent = "Start Test";
  }
  saveResult(wpm, accuracy);
  showReward(wpm);

  if (finishedEarly && timerEl) timerEl.textContent = "Done!";
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
  if (!rewardMsg || !rewardPopup) return;
  let message = "";
  if (wpm < 30) message = "🏅 Beginner! Keep Practicing!";
  else if (wpm < 50) message = "🥈 Intermediate! Nice Work!";
  else message = "🥇 Pro Typist! You're Amazing!";
  
  rewardMsg.textContent = message;
  rewardPopup.classList.add("show");
}

function closePopup() {
  if (rewardPopup) rewardPopup.classList.remove("show");
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

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeSelector(savedTheme);
}

function changeTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName);
  localStorage.setItem('theme', themeName);
  updateThemeSelector(themeName);
}

function updateThemeSelector(themeName) {
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
    themeSelect.value = themeName;
  }
}

// Initialize theme on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

// Theme selector event listener
document.addEventListener('DOMContentLoaded', () => {
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      changeTheme(e.target.value);
    });
  }
});

if ('windowControlsOverlay' in navigator) {
  navigator.windowControlsOverlay.addEventListener('geometrychange', debounce(e => {
    // Detect if the Window Controls Overlay is visible.
    const isOverlayVisible = navigator.windowControlsOverlay.visible;

    // Get the size and position of the title bar area.
    const titleBarRect = e.titlebarAreaRect;

    console.log(`The overlay is ${isOverlayVisible ? 'visible' : 'hidden'}, the title bar width is ${titleBarRect.width}px`);
  }, 200));
}