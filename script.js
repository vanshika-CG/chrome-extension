const textToType = document.getElementById("text-to-type");
const typingArea = document.getElementById("typing-area");
const speedElement = document.getElementById("speed");
const accuracyElement = document.getElementById("accuracy");
const resetButton = document.getElementById("reset");
const pointsElement = document.createElement("div");
pointsElement.id = "points";
document.body.appendChild(pointsElement);

let startTime = null;
let points = 0;
let typedCharacters = 0;

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "In the middle of difficulty lies opportunity.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts."
];

let currentSentenceIndex = 0;

function setNewSentence() {
  textToType.textContent = sentences[currentSentenceIndex];
  typingArea.value = ""; // Clear typing area for the new sentence
}

setNewSentence(); // Set the initial sentence

typingArea.addEventListener("input", () => {
  if (!startTime) startTime = new Date();

  const typedText = typingArea.value;
  const elapsedTime = (new Date() - startTime) / 1000 / 60; // in minutes

  // Calculate speed (WPM)
  const wordsTyped = typedText.trim().split(/\s+/).length;
  const speed = Math.round(wordsTyped / elapsedTime);
  speedElement.textContent = isNaN(speed) ? 0 : speed;

  // Calculate accuracy
  const typedArray = typedText.split("");
  const originalArray = textToType.textContent.split("");
  let correctChars = 0;
  typedArray.forEach((char, index) => {
    if (char === originalArray[index]) correctChars++;
  });

  const accuracy = Math.round((correctChars / originalArray.length) * 100);
  accuracyElement.textContent = isNaN(accuracy) ? 0 : accuracy;

  // Award points for 100% accuracy
  if (accuracy === 100 && typedText === textToType.textContent) {
    points += 10; // Add 10 points for perfect typing
    pointsElement.textContent = `Points: ${points}`;
    // Change to the next sentence after 100% accuracy
    currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
    setNewSentence(); // Set new sentence after completion
    startTime = null; // Reset the timer for the new sentence
  }
});

// Reset functionality
resetButton.addEventListener("click", () => {
  points = 0;
  pointsElement.textContent = `Points: ${points}`;
  typingArea.value = "";
  speedElement.textContent = 0;
  accuracyElement.textContent = 0;
  startTime = null;
  currentSentenceIndex = 0;
  setNewSentence(); // Reset to the first sentence
});
