// Global variables
let currentLevel = null;
let currentQuestionIndex = 0;
let questions = {
  easy: [
    ["Who was Prophet Yusuf's father?", ["Prophet Ya'qub", "Prophet Ibrahim", "Prophet Musa"], 0],
    ["What did Prophet Yusuf see in his dream?", ["Eleven stars", "A full moon", "A burning tree"], 0],
    ["Who were Prophet Yusuf's brothers?", ["Twelve", "Ten", "Seven"], 0],
    ["Where was Prophet Yusuf thrown into?", ["A well", "A cave", "A dungeon"], 0],
    ["Who bought Prophet Yusuf in Egypt?", ["A merchant", "The king", "Al-Aziz"], 2],
    ["What was Prophet Yusuf's position in Egypt?", ["A slave", "A minister", "A prisoner"], 1],
    ["What did Prophet Yusuf's brothers do to him?", ["They threw him into a well", "They sold him", "They kidnapped him"], 0],
    ["Who rescued Prophet Yusuf from the well?", ["A group of travelers", "A merchant", "A priest"], 0],
    ["What did Prophet Yusuf's father feel when he lost him?", ["Sadness", "Happiness", "Jealousy"], 0],
    ["Who was the woman who tried to seduce Prophet Yusuf?", ["Zulaikha", "Asiya", "Aisha"], 0],
    ["How did Prophet Yusuf react to the woman's advances?", ["He ran away", "He accepted", "He remained silent"], 0],
    ["What did Prophet Yusuf interpret for the king’s dream?", ["Seven years of abundance followed by seven years of famine", "A new kingdom", "A great harvest"], 0],
    ["What did the king dream of?", ["Seven fat cows and seven thin cows", "A great tree", "A river flooding"], 0],
    ["Who was Prophet Yusuf's mother?", ["Raheel", "Sarah", "Hannah"], 0],
    ["How many brothers did Prophet Yusuf have?", ["Twelve", "Ten", "Seven"], 0],
    ["What did Prophet Ya'qub see when he smelled Prophet Yusuf's shirt?", ["He regained his sight", "He fainted", "He became happy"], 0],
    ["What happened when Prophet Yusuf revealed his identity to his brothers?", ["They were shocked", "They apologized", "They ran away"], 1],
    ["How did Prophet Yusuf forgive his brothers?", ["He forgave them wholeheartedly", "He threw them into prison", "He demanded they repay him"], 0],
    ["What did Prophet Yusuf give to his brothers when they returned to him?", ["Food", "Money", "A ring"], 0],
    ["What happened after Prophet Yusuf reunited with his family?", ["They moved to Egypt", "They stayed in Canaan", "They left for Makkah"], 0]
  ],
  medium: [
    ["How many brothers did Prophet Yusuf have?", ["Ten", "Eleven", "Twelve"], 1],
    ["What did Prophet Ya'qub see when he smelled Prophet Yusuf's shirt?", ["He regained his sight", "He fainted", "He became happy"], 0],
    ["What did the king’s dream symbolize?", ["Years of plenty followed by years of famine", "The rise of a new empire", "A disaster on the horizon"], 0],
    ["What was Prophet Yusuf’s job in Egypt after his release?", ["He managed the food supply", "He was a general", "He worked in the palace"], 0],
    ["Who brought Prophet Yusuf’s shirt to his father?", ["His brothers", "A messenger", "A caravan"], 0],
    ["How did Prophet Ya'qub react when he found out his sons lied about Prophet Yusuf?", ["He cried", "He was angry", "He disowned them"], 0],
    ["What was the first thing Prophet Yusuf did when he saw his father?", ["He embraced him", "He kissed his hands", "He bowed to him"], 0],
    ["Why did Prophet Yusuf’s brothers become jealous of him?", ["He was favored by their father", "He was good-looking", "He had wisdom"], 0],
    ["What happened when Prophet Yusuf was thrown into prison?", ["He interpreted dreams", "He became depressed", "He escaped"], 0],
    ["Who did Prophet Yusuf interpret dreams for in prison?", ["The king’s cupbearer and baker", "A prisoner", "A merchant"], 0],
    ["What was the relationship between Prophet Yusuf and Zulaikha?", ["She was his mistress", "She was a seductress", "She was his sister-in-law"], 1],
    ["How did Prophet Yusuf avoid the temptation of Zulaikha?", ["He sought refuge in God", "He ignored her", "He rejected her advances"], 0],
    ["How did Prophet Yusuf’s brothers apologize to him?", ["They begged for forgiveness", "They offered him gifts", "They promised to be loyal"], 0],
    ["What was the condition for Prophet Yusuf to forgive his brothers?", ["He asked them to bring Benjamin", "He asked them to confess their sins", "He demanded they repay him"], 0],
    ["What did Prophet Yusuf do when he saw his brothers coming to Egypt for food?", ["He tested them", "He ignored them", "He helped them immediately"], 0],
    ["What was the final test Prophet Yusuf gave to his brothers?", ["He planted a silver cup in Benjamin's bag", "He gave them a test of character", "He asked them to return with gifts"], 0],
    ["What did Prophet Yusuf do after his brothers repented?", ["He forgave them", "He imprisoned them", "He sent them away"], 0],
    ["How did Prophet Yusuf react when he was reunited with his father?", ["He cried and embraced him", "He remained calm", "He asked for forgiveness"], 0],
    ["What did Prophet Ya'qub say when Prophet Yusuf was found?", ["He praised God", "He was silent", "He rejoiced"], 0],
    ["What did the people of Egypt do when Prophet Yusuf interpreted the dream?", ["They admired him", "They rejected him", "They questioned his authority"], 0]
  ],
    hard: [
    ["What was the king's dream in Prophet Yusuf's story?", ["Seven fat cows and seven thin cows", "A river overflowing", "A harvest of wheat"], 0],
    ["What was the interpretation of the king's dream?", ["Years of plenty followed by years of famine", "A new ruler will come", "Egypt will prosper"], 0],
    ["How many brothers did Prophet Yusuf have?", ["Twelve", "Eleven", "Seven"], 0],
    ["What did Prophet Yusuf's brothers plan to do to him?", ["Kill him", "Sell him", "Exile him"], 0],
    ["What did Prophet Yusuf interpret for the king’s cupbearer?", ["He would be reinstated to his position", "He would be hanged", "He would be exiled"], 0],
    ["What happened to the king's baker after Prophet Yusuf interpreted his dream?", ["He was hanged", "He was released", "He was sent to prison"], 0],
    ["What did Zulaikha do when Prophet Yusuf rejected her advances?", ["She accused him of wrongdoing", "She begged for forgiveness", "She threatened him"], 0],
    ["How did Prophet Yusuf respond when Zulaikha accused him?", ["He denied the accusation", "He confessed", "He remained silent"], 0],
    ["What did Prophet Yusuf’s father do when he learned about the betrayal?", ["He became blind from grief", "He went to Egypt", "He cursed his sons"], 0],
    ["How did Prophet Yusuf test his brothers?", ["He asked them to bring Benjamin", "He demanded they bring back their father", "He accused them of theft"], 0],
    ["What did Prophet Yusuf’s brothers say when they found the silver cup?", ["They begged for forgiveness", "They denied stealing it", "They blamed Benjamin"], 0],
    ["What did Prophet Yusuf do when his brothers repented?", ["He forgave them", "He imprisoned them", "He asked for a ransom"], 0],
    ["Why was Prophet Yusuf’s forgiveness important?", ["He showed mercy", "He was forgiving by nature", "He was commanded by God"], 0],
    ["What did Prophet Yusuf's brothers do when they realized he was their brother?", ["They apologized", "They were angry", "They left Egypt"], 0],
    ["How did Prophet Yusuf react when he revealed his identity?", ["He forgave them", "He scolded them", "He sent them away"], 0],
    ["What did Prophet Yusuf give his brothers when they returned to him?", ["Food and clothing", "Gold and silver", "Money and jewels"], 0],
    ["What happened after Prophet Yusuf reunited with his family?", ["They moved to Egypt", "They stayed in Canaan", "They left for Makkah"], 0],
    ["What did Prophet Yusuf say to his brothers after his revelation?", ["God has been merciful", "You have wronged me", "I will take revenge"], 0],
    ["What did Prophet Yusuf say when he invited his family to Egypt?", ["Come and stay with me", "I will provide for you", "You will be honored in Egypt"], 0]
  ]
};
// DOM Elements
const startQuizBtn = document.getElementById("start-quiz-btn");
const easyBtn = document.getElementById("easy-btn");
const mediumBtn = document.getElementById("medium-btn");
const hardBtn = document.getElementById("hard-btn");
const nextBtn = document.getElementById("next-btn");
const returnToMainBtn = document.getElementById("return-to-main-btn");
const restartBtn = document.getElementById("restart-btn");

const welcomeScreen = document.getElementById("welcome-screen");
const levelScreen = document.getElementById("level-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const finalScore = document.getElementById("final-score");

// Show/Hide Screens
function showScreen(screenId) {
  welcomeScreen.classList.add("hidden");
  levelScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");

  document.getElementById(screenId).classList.remove("hidden");
}

// Show Welcome Screen (Start Button)
showScreen("welcome-screen");

// Start Quiz
startQuizBtn.addEventListener("click", () => {
  showScreen("level-screen"); // Show level selection screen after clicking Start
});

// Level Selection
easyBtn.addEventListener("click", () => {
  currentLevel = "easy";
  startQuiz();
});

mediumBtn.addEventListener("click", () => {
  currentLevel = "medium";
  startQuiz();
});

hardBtn.addEventListener("click", () => {
  currentLevel = "hard";
  startQuiz();
});

// Start Quiz after selecting level
function startQuiz() {
  currentQuestionIndex = 0;
  showScreen("quiz-screen");
  loadQuestion();
}

// Load Question
function loadQuestion() {
  const questionData = questions[currentLevel][currentQuestionIndex];
  questionText.textContent = questionData.question;
  optionsContainer.innerHTML = "";
  questionData.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(button);
  });
}

// Check Answer
function checkAnswer(selectedOption) {
  const questionData = questions[currentLevel][currentQuestionIndex];
  if (selectedOption === questionData.answer) {
    alert("Correct!");
  } else {
    alert("Incorrect!");
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[currentLevel].length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// Show Results
function showResults() {
  showScreen("results-screen");
  finalScore.textContent = "Your score is: " + currentQuestionIndex;
}

// Restart Quiz
restartBtn.addEventListener("click", () => {
  startQuiz();
});

// Return to Main Menu
returnToMainBtn.addEventListener("click", () => {
  showScreen("welcome-screen");
});
