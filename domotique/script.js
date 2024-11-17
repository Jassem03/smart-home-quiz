const questions = [
    {
        question: "Quel type de technologie permet de contrôler une maison intelligente à distance via un smartphone ou une tablette?",
        answers: [
            { text: "Intelligence artificielle", correct: false },
            { text: "Application mobile", correct: true },
            { text: "Thermostat", correct: false },
            { text: "Capteur infrarouge", correct: false }
        ]
    },
    {
        question: "Quel est l'avantage principal des systèmes de thermostat intelligents comme le Nest?",
        answers: [
            { text: "Ils changent la température automatiquement pour économiser l'énergie.", correct: true },
            { text: "Ils réduisent la vitesse du Wi-Fi.", correct: false },
            { text: "Ils détectent les mouvements dans toute la maison.", correct: false },
            { text: "Ils contrôlent la lumière des pièces", correct: false }
        ]
    },
    {
        question: "Quel type de connexion est généralement utilisé par les appareils domotiques pour communiquer entre eux?",
        answers: [
            { text: "Bluetooth", correct: false },
            { text: "Zigbee ou Z-Wave", correct: true },
            { text: "USB", correct: false },
            { text: "Réseau filaire", correct: false }
        ]
    },
    {
        question: "Quelle est la principale préoccupation de sécurité pour une maison intelligente?",
        answers: [
            { text: "Le piratage des appareils connectés", correct: true },
            { text: "La consommation d'électricité", correct: false },
            { text: "Les mises à jour automatiques", correct: false },
            { text: "Le nombre d'appareils", correct: false }
        ]
    },
    {
        question: "Comment fonctionne un système de surveillance avec caméras dans une maison intelligente?",
        answers: [
            { text: "Il utilise l'énergie solaire pour alimenter les caméras.", correct: false },
            { text: "Il enregistre des vidéos et les envoie sur une application sécurisée pour le propriétaire.", correct: true },
            { text: "Il remplace le système de chauffage.", correct: false },
            { text: "Il contrôle les lumières en fonction du mouvement.", correct: false }
        ]
    },
    {
        question: "Quel est le rôle d’un détecteur de fuite d'eau dans une maison intelligente?",
        answers: [
            { text: "Détecter les inondations et envoyer des alertes", correct: true },
            { text: "Contrôler l'humidité dans l'air", correct: false },
            { text: "Éteindre automatiquement les lumières", correct: false },
            { text: "Contrôler la température de l'eau", correct: false }
        ]
    },
    {
        question: "Quelle technologie permet aux lumières d'une maison intelligente de s'adapter aux habitudes des occupants?",
        answers: [
            { text: "Intelligence artificielle et apprentissage automatique", correct: true },
            { text: "Bluetooth", correct: false },
            { text: "Zigbee", correct: false },
            { text: "Thermostat", correct: false }
        ]
    },
    {
        question: "Comment un verrou intelligent (smart lock) peut-il être contrôlé?",
        answers: [
            { text: "Avec une clé mécanique uniquement", correct: false },
            { text: "Via une application mobile ou la reconnaissance faciale", correct: true },
            { text: "Par un interrupteur dans la maison", correct: false },
            { text: "Avec une télécommande infrarouge", correct: false }
        ]
    },
    {
        question: "Quel type de capteur est souvent utilisé dans une maison intelligente pour la sécurité incendie?",
        answers: [
            { text: "Capteur de température", correct: false },
            { text: "Détecteur de fumée", correct: true },
            { text: "Caméra de surveillance", correct: false },
            { text: "Détecteur d'humidité", correct: false }
        ]
    },
    {
        question: "Pourquoi l'efficacité énergétique est-elle un avantage important de la domotique?",
        answers: [
            { text: "Elle permet aux appareils de fonctionner plus vite.", correct: false },
            { text: "Elle réduit les coûts de chauffage, d'éclairage et de climatisation.", correct: true },
            { text: "Elle augmente la vitesse de la connexion Internet.", correct: false },
            { text: "Elle offre un accès illimité au réseau électrique.", correct: false }
        ]
    }
];


let currentQuestionIndex = 0;
let totalScore = 0;

const loginContainer = document.getElementById('login-container');
const loginForm = document.getElementById('login-form');
const nicknameInput = document.getElementById('nickname');
const classInput = document.getElementById('class');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreDisplay = document.getElementById('score-display');
const questionScoreElement = document.getElementById('question-score');
const nextButton = document.getElementById('next-btn');
const finalScoreContainer = document.getElementById('final-score-container');
const totalScoreElement = document.getElementById('total-score');
const userInfo = document.getElementById('user-info');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = nicknameInput.value;
    const className = classInput.value;

    // Save data in local storage
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('class', className);

    // Show quiz
    userInfo.innerText = `Surnom : ${nickname} | Classe : ${className}`;
    loginContainer.classList.add('hide');
    quizContainer.classList.remove('hide');

    startQuiz();
});

function startQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;
    scoreDisplay.classList.add('hide');
    finalScoreContainer.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    scoreDisplay.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    let questionScore = 0;

    if (correct) {
        questionScore = 1;
        totalScore += questionScore;
    }

    questionScoreElement.innerText = questionScore;
    scoreDisplay.classList.remove('hide');

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });

    nextButton.classList.remove('hide');
}

function setStatusClass(element, correct) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
    if (correct === "true") {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    finalScoreContainer.classList.remove('hide');
    totalScoreElement.innerText = `${totalScore} / ${questions.length}`;
    
    // Store the score in local storage
    const nickname = localStorage.getItem('nickname');
    const className = localStorage.getItem('class');
    localStorage.setItem('lastQuizResult', `${nickname} (Classe: ${className}): ${totalScore} / ${questions.length}`);
    
    console.log(`Résultat sauvegardé: ${localStorage.getItem('lastQuizResult')}`);
}
function downloadResults() {
    const nickname = localStorage.getItem('nickname');
    const className = localStorage.getItem('class');
    const resultText = `Résultat du quiz pour ${nickname} (Classe: ${className}): ${totalScore} / ${questions.length}`;
    
    const blob = new Blob([resultText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `quiz_result_${nickname}.txt`;
    link.click();
}
function showFinalScore() {
    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    finalScoreContainer.classList.remove('hide');
    totalScoreElement.innerText = `${totalScore} / ${questions.length}`;
    
    // Download results as a file
    downloadResults();
}


