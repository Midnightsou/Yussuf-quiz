// Questions Data
const questions = {
    easy: [
        ["Who was Prophet Yusuf's father?", ["Prophet Ya'qub", "Prophet Ibrahim", "Prophet Musa"], 0],
        ["What did Prophet Yusuf see in his dream?", ["Eleven stars", "A full moon", "A burning tree"], 0]
    ],
    medium: [
        ["How many brothers did Prophet Yusuf have?", ["Ten", "Eleven", "Twelve"], 1],
        ["What was the interpretation of the king’s dream?", ["Years of plenty followed by years of famine", "A new ruler will come", "Egypt will prosper"], 0]
    ],
    hard: [
        ["What was the king's dream in Prophet Yusuf's story?", ["Seven fat cows and seven thin cows", "A river overflowing", "A harvest of wheat"], 0],
        ["What happened to the king's baker after Prophet Yusuf interpreted his dream?", ["He was hanged", "He was released", "He was sent to prison"], 0]
    ]
};

// Variables
let currentLevel = "";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

// Show Level Selection Screen
function showLevelSelection() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("level-screen").classList.remove("hidden");
}

// Start Quiz
function startQuiz(level) {
    currentLevel = level;
    currentQuestions = [...questions[level]].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    document.getElementById("level-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    startTimer();
}

// Show Question
function showQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }

    const questionData = currentQuestions[currentQuestionIndex];
    document.getElementById("question-number").textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    document.getElementById("question-text").textContent = questionData[0];

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    
    questionData[1].forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = function () {
            checkAnswer(index);
        };
        optionsContainer.appendChild(btn);
    });

    document.getElementById("quiz-screen").classList.add("fade");
}

// Check Answer
function checkAnswer(selectedIndex) {
    if (selectedIndex === currentQuestions[currentQuestionIndex][2]) {
        score++;
    }
    nextQuestion();
}

// Next Question
function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        endQuiz();
    }
}

// Previous Question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

// Timer
function startTimer() {
    timeLeft = 30;
    document.getElementById("time-left").textContent = timeLeft;
    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("time-left").textContent = timeLeft;
        if (timeLeft === 0) {
            nextQuestion();
        }
    }, 1000);
}

// End Quiz
function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz-screen").classList.add("hidden");
    document.getElementById("results-screen").classList.remove("hidden");
    document.getElementById("final-score").textContent = `${score} / ${currentQuestions.length}`;

    const answersContainer = document.getElementById("correct-answers");
    answersContainer.innerHTML = "";
    currentQuestions.forEach(function (q, index) {
        const p = document.createElement("p");
        p.textContent = `Q${index + 1}: ${q[0]} - Correct Answer: ${q[1][q[2]]}`;
        answersContainer.appendChild(p);
    });
}

// Restart Quiz
function restartQuiz() {
    document.getElementById("results-screen").classList.add("hidden");
    document.getElementById("level-screen").classList.remove("hidden");
}

// Main Menu
function goToMainMenu() {
    document.getElementById("results-screen").classList.add("hidden");
    document.getElementById("welcome-screen").classList.remove("hidden");
            }
