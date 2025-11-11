const questions = [
    {
        question: "Pakistan ka capital kya hai?",
        options: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
        correctAnswer: "Islamabad"
    },
    {
        question: "HTML ka full form kya hai?",
        options: [
            "Hyper Text Markup Language",
            "High Transfer Mark Language",
            "Hyperlinks and Text Mark Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "CSS ka use kis ke liye hota hai?",
        options: [
            "Structure banana",
            "Website style aur layout ke liye",
            "Data store karne ke liye",
            "Server connect karne ke liye"
        ],
        correctAnswer: "Website style aur layout ke liye"
    },
    {
        question: "JavaScript kis type ki language hai?",
        options: ["Programming", "Markup", "Styling", "Database"],
        correctAnswer: "Programming"
    },
    {
        question: "React.js kis cheez ke liye popular hai?",
        options: ["Backend APIs", "UI Components", "Database design", "Testing"],
        correctAnswer: "UI Components"
    },
    {
        question: "SQL ka main use kya hai?",
        options: ["Designing", "Database query", "Styling", "Animation"],
        correctAnswer: "Database query"
    },
    {
        question: "HTTPS mein S ka matlab kya hota hai?",
        options: ["Secure", "Simple", "Static", "Server"],
        correctAnswer: "Secure"
    },
    {
        question: "Git ka use kis liye hota hai?",
        options: ["Version control", "Video editing", "UI designing", "Testing"],
        correctAnswer: "Version control"
    },
    {
        question: "Node.js kis engine par based hai?",
        options: ["SpiderMonkey", "V8", "Chakra", "Nitro"],
        correctAnswer: "V8"
    },
    {
        question: "JavaScript mein array ki indexing kis se start hoti hai?",
        options: ["1", "0", "-1", "Random"],
        correctAnswer: "0"
    },
    {
        question: "DOM ka full form kya hai?",
        options: [
            "Document Object Model",
            "Dynamic Object Method",
            "Document Orientation Mode",
            "Data Object Module"
        ],
        correctAnswer: "Document Object Model"
    },
    {
        question: "Bootstrap ka primary purpose kya hai?",
        options: ["Database operations", "Styling framework", "Testing", "Server deployment"],
        correctAnswer: "Styling framework"
    }
];

const quizCard = document.getElementById("quiz-card");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const resultBox = document.getElementById("result");
const scoreText = document.getElementById("scoreText");


let timerElement = document.createElement("p");
timerElement.id = "timer";
timerElement.style.textAlign = "center";
timerElement.style.fontWeight = "600";



quizCard.insertBefore(timerElement, optionsContainer);
const darkModeBtn = document.createElement("button");
darkModeBtn.textContent = "🌙 Dark Mode";
darkModeBtn.classList.add("btn", "ghost", "theme-toggle");
document.querySelector(".app-header").appendChild(darkModeBtn);

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

function showQuestion() {
    clearInterval(timerInterval);
    timeLeft = 10;
    startTimer();

    quizCard.style.animation = "none";
    quizCard.offsetHeight;
    quizCard.style.animation = "";

    const current = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${current.question}`;
    optionsContainer.innerHTML = "";

    current.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.dataset.value = option;

        const badge = document.createElement("span");
        badge.classList.add("option-badge");
        badge.textContent = String.fromCharCode(65 + index);

        const textWrapper = document.createElement("span");
        textWrapper.classList.add("option-text");
        textWrapper.textContent = option;

        button.appendChild(badge);
        button.appendChild(textWrapper);

        button.style.animationDelay = `${index * 70}ms`;
        button.addEventListener("click", () => selectAnswer(option));
        optionsContainer.appendChild(button);
    });

    resultBox.classList.add("hidden");
    timerElement.style.display = "block";

}
function startTimer() {
    timerElement.textContent = `⏱ Time left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `⏱ Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}
function selectAnswer(selected) {
    clearInterval(timerInterval);
    const correct = questions[currentQuestionIndex].correctAnswer;
    const optionButtons = optionsContainer.querySelectorAll(".option");

    optionButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove("correct", "incorrect");
        if (btn.dataset.value === correct) {
            btn.classList.add("correct");
        } else if (btn.dataset.value === selected) {
            btn.classList.add("incorrect");
        }
    });

    if (selected === correct) score++;
}

function nextQuestion() {
    clearInterval(timerInterval);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timerInterval);
    questionElement.textContent = "Quiz Complete!";
    optionsContainer.innerHTML = "";
    timerElement.style.display = "none";
    resultBox.classList.remove("hidden");
    scoreText.textContent = `${score} out of ${questions.length}`;
}

function restartQuiz() {
    clearInterval(timerInterval);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "☀️ Light Mode";
    } else {
        darkModeBtn.textContent = "🌙 Dark Mode";
    }
});

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

showQuestion();