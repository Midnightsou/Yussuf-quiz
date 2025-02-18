// Questions Data
const questions = {
    easy: [
        ["Who was Prophet Yusuf's father?", ["Prophet Ya'qub", "Prophet Ibrahim", "Prophet Musa"], 0],
        ["What did Prophet Yusuf see in his dream?", ["Eleven stars", "A full moon", "A burning tree"], 0],
        ["How many brothers did Prophet Yusuf have?", ["Twelve", "Ten", "Seven"], 0],
        ["Where was Prophet Yusuf thrown into?", ["A well", "A cave", "A dungeon"], 0],
        ["Who bought Prophet Yusuf in Egypt?", ["A merchant", "The king", "Al-Aziz"], 2],
        ["What was Prophet Yusuf's position in Egypt?", ["A slave", "A minister", "A prisoner"], 1],
        ["Who rescued Prophet Yusuf from the well?", ["A group of travelers", "A merchant", "A priest"], 0],
        ["Who was the woman who tried to seduce Prophet Yusuf?", ["Zulaikha", "Asiya", "Aisha"], 0],
        ["How did Prophet Yusuf react to the woman's advances?", ["He ran away", "He accepted", "He remained silent"], 0],
        ["What did Prophet Yusuf interpret for the king’s dream?", ["Seven years of abundance followed by seven years of famine", "A new kingdom", "A great harvest"], 0]
    ],
    medium: [
        ["How many brothers did Prophet Yusuf have?", ["Ten", "Eleven", "Twelve"], 1],
        ["What was the interpretation of the king’s dream?", ["Years of plenty followed by years of famine", "A new ruler will come", "Egypt will prosper"], 0],
        ["What was Prophet Yusuf’s job in Egypt after his release?", ["He managed the food supply", "He was a general", "He worked in the palace"], 0],
        ["Who did Prophet Yusuf interpret dreams for in prison?", ["The king’s cupbearer and baker", "A prisoner", "A merchant"], 0],
        ["How did Prophet Yusuf avoid the temptation of Zulaikha?", ["He sought refuge in God", "He ignored her", "He rejected her advances"], 0],
        ["What was the final test Prophet Yusuf gave to his brothers?", ["He planted a silver cup in Benjamin's bag", "He gave them a test of character", "He asked them to return with gifts"], 0],
        ["What did Prophet Yusuf do when he saw his brothers coming to Egypt for food?", ["He tested them", "He ignored them", "He helped them immediately"], 0],
        ["How did Prophet Yusuf react when he revealed his identity?", ["He forgave them", "He scolded them", "He sent them away"], 0],
        ["What did Prophet Yusuf give his brothers when they returned to him?", ["Food", "Gold", "Silver"], 0],
        ["What happened after Prophet Yusuf reunited with his family?", ["They moved to Egypt", "They stayed in Canaan", "They left for Makkah"], 0]
    ],
    hard: [
        ["What was the king's dream in Prophet Yusuf's story?", ["Seven fat cows and seven thin cows", "A river overflowing", "A harvest of wheat"], 0],
        ["What happened to the king's baker after Prophet Yusuf interpreted his dream?", ["He was hanged", "He was released", "He was sent to prison"], 0],
        ["What did Zulaikha do when Prophet Yusuf rejected her advances?", ["She accused him of wrongdoing", "She begged for forgiveness", "She threatened him"], 0],
        ["How did Prophet Yusuf respond when Zulaikha accused him?", ["He denied the accusation", "He confessed", "He remained silent"], 0],
        ["How did Prophet Yusuf test his brothers?", ["He asked them to bring Benjamin", "He demanded they bring back their father", "He accused them of theft"], 0],
        ["What did Prophet Yusuf’s brothers say when they found the silver cup?", ["They begged for forgiveness", "They denied stealing it", "They blamed Benjamin"], 0],
        ["What did Prophet Yusuf say when he invited his family to Egypt?", ["Come and stay with me", "I will provide for you", "You will be honored in Egypt"], 0]
    ]
};

// Quiz Variables
let currentLevel = "";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

// Display Level Selection
function showLevelSelection() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("level-screen").classList.remove("hidden");
}

// Start Quiz
function startQuiz(level) {
    currentLevel = level;
    currentQuestions = [...questions[level]].sort(() => Math.random() - 0.5); // Shuffle questions
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    document.getElementById("level-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    startTimer();
}

// Show Question
function showQuestion() {
    const questionData = currentQuestions[currentQuestionIndex];
    document.getElementById("question-number").textContent = `Question ${currentQuestionIndex + 1} of 10`;
    document.getElementById("question-text").textContent = questionData[0];

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    
    questionData[1].forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index);
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
    if (currentQuestionIndex < 9) {
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
    timer = setInterval(() => {
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
    document.getElementById("final-score").textContent = `${score} / 10`;

    const answersContainer = document.getElementById("correct-answers");
    answersContainer.innerHTML = "";
    currentQuestions.forEach((q, index) => {
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
