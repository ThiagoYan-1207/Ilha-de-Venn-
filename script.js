// Banco de Dados de Questões (10 questões sobre conjuntos e Venn)
const questionBank = [
    {
        id: 1,
        title: "Palco Principal e Tenda Eletrônica",
        text: "No Festival, 120 pessoas foram ao Palco Principal (A) e 80 à Tenda Eletrônica (B). Se 30 foram a ambos, quantas pessoas foram ao festival no total?",
        options: ["170", "200", "150", "230"],
        answer: "170",
        explanation: "Princípio da Inclusão-Exclusão: n(A ∪ B) = n(A) + n(B) - n(A ∩ B) = 120 + 80 - 30 = 170."
    },
    {
        id: 2,
        title: "Praça de Alimentação",
        text: "Em um grupo de 100 visitantes, 60 compraram hambúrguer (H) e 50 pizza (P). Se 20 compraram ambos, quantos não compraram nenhum?",
        options: ["10", "20", "30", "15"],
        answer: "10",
        explanation: "Total que comprou pelo menos um: n(H ∪ P) = 60 + 50 - 20 = 90. Logo, 100 - 90 = 10 não compraram nenhum."
    },
    {
        id: 3,
        title: "Oficinas do Festival",
        text: "45 pessoas fizeram Pintura (A) e 35 Escultura (B). Se 10 fizeram ambas, quantas participaram APENAS da oficina de Pintura?",
        options: ["35", "45", "25", "10"],
        answer: "35",
        explanation: "Apenas A = n(A) - n(A ∩ B) = 45 - 10 = 35."
    },
    {
        id: 4,
        title: "Preferência de Bebidas",
        text: "De 80 pessoas, 50 bebem suco, 40 água e 15 ambos. Quantas pessoas não bebem nem suco nem água?",
        options: ["5", "10", "15", "20"],
        answer: "5",
        explanation: "n(A ∪ B) = 50 + 40 - 15 = 75. Fora dos conjuntos = 80 - 75 = 5."
    },
    {
        id: 5,
        title: "Jogos Indie",
        text: "Na área de jogos, 70 jogaram RPG e 40 Estratégia. Se 100 jogaram pelo menos um, quantos jogaram AMBOS?",
        options: ["10", "20", "30", "15"],
        answer: "10",
        explanation: "n(A ∩ B) = n(A) + n(B) - n(A ∪ B) = 70 + 40 - 100 = 10."
    },
    {
        id: 6,
        title: "Transporte do Evento",
        text: "Das 200 pessoas entrevistadas, 120 usaram Ônibus e 90 Metrô. Se todas usaram pelo menos um transporte, quantas usaram ambos?",
        options: ["10", "30", "50", "20"],
        answer: "10",
        explanation: "n(A ∩ B) = 120 + 90 - 200 = 10."
    },
    {
        id: 7,
        title: "Acessórios do Festival",
        text: "50 usavam óculos escuros, 40 usavam boné. Se 15 usavam ambos e 10 nenhum dos dois, qual o público total consultado?",
        options: ["85", "75", "90", "105"],
        answer: "85",
        explanation: "n(A ∪ B) = 50 + 40 - 15 = 75. Total = 75 + 10 sem acessórios = 85."
    },
    {
        id: 8,
        title: "Sorteio de Brindes",
        text: "30 pessoas ganharam camisas e 25 ganharam bonés. Se 5 pessoas ganharam ambos os brindes, quantas ganharam pelo menos um?",
        options: ["50", "55", "45", "60"],
        answer: "50",
        explanation: "n(A ∪ B) = 30 + 25 - 5 = 50."
    },
    {
        id: 9,
        title: "Workshops de Programação",
        text: "De 60 alunos, 40 fizeram HTML e 30 JS. Se 5 não se inscreveram em nenhum, quantos fizeram AMBOS?",
        options: ["15", "10", "20", "25"],
        answer: "15",
        explanation: "n(A ∪ B) = 60 - 5 = 55. n(A ∩ B) = 40 + 30 - 55 = 15."
    },
    {
        id: 10,
        title: "Sessão de Autógrafos",
        text: "100 fãs compareceram. 80 tiraram foto com a atração A e 40 com a B. Se todos tiraram pelo menos uma foto, quantos tiraram com AMBAS?",
        options: ["20", "40", "10", "30"],
        answer: "20",
        explanation: "n(A ∩ B) = 80 + 40 - 100 = 20."
    }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Função de embaralhamento (Fisher-Yates) para as questões e alternativas
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Efeito Sonoro em Web Audio API
function playSound(isCorrect) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        if (isCorrect) {
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
        } else {
            osc.frequency.setValueAtTime(220, ctx.currentTime);
            osc.frequency.setValueAtTime(164.81, ctx.currentTime + 0.1);
        }
        
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
        // Ignora caso o navegador bloqueie autoplay
    }
}

// Início do jogo e sorteio de 5 questões
function startGame() {
    selectedQuestions = shuffleArray([...questionBank]).slice(0, 5);
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById("screen-welcome").classList.remove("active");
    document.getElementById("screen-game").classList.add("active");
    
    loadQuestion();
}

function loadQuestion() {
    const q = selectedQuestions[currentQuestionIndex];
    document.getElementById("question-tracker").innerText = `Questão ${currentQuestionIndex + 1} de 5`;
    document.getElementById("score-tracker").innerText = `Pontuação: ${score}`;
    document.getElementById("question-title").innerText = q.title;
    document.getElementById("question-text").innerText = q.text;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    // Embaralha as alternativas para que a resposta correta não fique sempre na primeira posição
    const shuffledOptions = shuffleArray([...q.options]);

    shuffledOptions.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(btn);
    });
}

// Validação de resposta e feedback visual
function checkAnswer(userChoice) {
    const q = selectedQuestions[currentQuestionIndex];
    const isCorrect = (userChoice === q.answer);
    
    playSound(isCorrect);

    const feedbackIcon = document.getElementById("feedback-icon");

    if (isCorrect) {
        score += 20;
        document.getElementById("feedback-title").innerText = "🎉 Resposta Correta!";
        document.getElementById("feedback-title").style.color = "#2ecc71";
        feedbackIcon.innerText = "✅";
    } else {
        document.getElementById("feedback-title").innerText = "❌ Resposta Incorreta!";
        document.getElementById("feedback-title").style.color = "#e74c3c";
        feedbackIcon.innerText = "❌";
    }

    document.getElementById("feedback-message").innerText = `Sua escolha: ${userChoice} | Gabarito: ${q.answer}`;
    document.getElementById("math-explanation").innerHTML = `<strong>Explicação Matemática:</strong><br>${q.explanation}`;

    document.getElementById("modal-feedback").classList.remove("hidden");
}

function nextQuestion() {
    document.getElementById("modal-feedback").classList.add("hidden");
    currentQuestionIndex++;

    if (currentQuestionIndex < 5) {
        loadQuestion();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    document.getElementById("screen-game").classList.remove("active");
    document.getElementById("screen-end").classList.add("active");
    document.getElementById("final-score-text").innerText = `Sua pontuação total foi de ${score} de 100 pontos!`;
}

function restartGame() {
    document.getElementById("screen-end").classList.remove("active");
    document.getElementById("screen-welcome").classList.add("active");
}

function showTutorial() { document.getElementById("modal-tutorial").classList.remove("hidden"); }
function closeTutorial() { document.getElementById("modal-tutorial").classList.add("hidden"); }
