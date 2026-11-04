
const questionBank = [
    {
        id: 1,
        title: "Classificação de Funções: Injetora",
        text: "Dada a função f: A → B definida por f(x) = 2x + 3, onde A e B são conjuntos de números reais. Como essa função pode ser classificada quanto à injetividade?",
        options: ["Injetora", "Não injetora", "Sobrejetora apenas", "Constante"],
        answer: "Injetora",
        explanation: "Uma função é injetora se elementos distintos do domínio possuem imagens distintas. Se f(a) = f(b) ⟹ 2a + 3 = 2b + 3 ⟹ a = b, logo a função é injetora."
    },
    {
        id: 2,
        title: "Função Sobrejetora",
        text: "Seja a função f: ℝ → ℝ dada por f(x) = x³. Qual é a afirmação correta sobre a sua sobrejetividade?",
        options: ["É sobrejetora", "Não é sobrejetora", "É apenas injetora", "Não é função"],
        answer: "É sobrejetora",
        explanation: "Para todo elemento y no contradomínio (ℝ), existe um x = ∛y no domínio tal que f(x) = y. Como o conjunto imagem coincide com o contradomínio, a função é sobrejetora."
    },
    {
        id: 3,
        title: "Função Bijetora",
        text: "Uma função f: A → B é bijetora se, e somente se, ela for:",
        options: ["Injetora e sobrejetora", "Apenas injetora", "Apenas sobrejetora", "Par e periódica"],
        answer: "Injetora e sobrejetora",
        explanation: "Por definição, uma função bijetora acumula ambas as propriedades: injetora (elementos diferentes têm imagens diferentes) e sobrejetora (todo elemento do contradomínio tem pré-imagem)."
    },
    {
        id: 4,
        title: "Composição de Funções",
        text: "Dadas as funções f(x) = 3x + 1 e g(x) = x² - 2, qual é o valor da função composta f(g(2))?",
        options: ["7", "4", "10", "15"],
        answer: "7",
        explanation: "Primeiro calculamos g(2): g(2) = (2)² - 2 = 4 - 2 = 2. Depois aplicamos em f: f(g(2)) = f(2) = 3(2) + 1 = 6 + 1 = 7."
    },
    {
        id: 5,
        title: "Função Inversa",
        text: "Dada a função bijetora f(x) = 4x - 8, qual é a lei da sua função inversa f⁻¹(x)?",
        options: ["f⁻¹(x) = (x + 8) / 4", "f⁻¹(x) = 4x + 8", "f⁻¹(x) = (x - 4) / 8", "f⁻¹(x) = 8x - 4"],
        answer: "f⁻¹(x) = (x + 8) / 4",
        explanation: "Trocamos x por y: x = 4y - 8. Isolando y: x + 8 = 4y ⟹ y = (x + 8) / 4. Portanto, f⁻¹(x) = (x + 8) / 4."
    },
    {
        id: 6,
        title: "Composição Algébrica",
        text: "Se f(x) = x + 5 e g(x) = 2x, qual é a expressão algébrica da função composta (f ∘ g)(x)?",
        options: ["2x + 5", "2x + 10", "x² + 5x", "2(x + 5)"],
        answer: "2x + 5",
        explanation: "(f ∘ g)(x) = f(g(x)) = f(2x) = (2x) + 5 = 2x + 5."
    },
    {
        id: 7,
        title: "Inversível e Bijetora",
        text: "Para que uma função admita uma função inversa f⁻¹, qual condição fundamental ela precisa satisfazer?",
        options: ["Ser bijetora", "Ser apenas injetora", "Ser constante", "Ter grau par"],
        answer: "Ser bijetora",
        explanation: "Uma função só é inversível em todo o seu domínio e contradomínio se for bijeção (ao mesmo tempo injetora e sobrejetora)."
    },
    {
        id: 8,
        title: "Análise de Injetividade Gráfica",
        text: "No plano cartesiano, como podemos testar visualmente se uma função é injetora?",
        options: ["Teste da linha horizontal", "Teste da linha vertical", "Verificando se corta a origem", "Analisando o vértice"],
        answer: "Teste da linha horizontal",
        explanation: "Pelo teste da linha horizontal, se qualquer linha horizontal interceptar o gráfico da função em no máximo um ponto, a função é injetora."
    },
    {
        id: 9,
        title: "Composição Inversa",
        text: "Se f(x) é uma função bijetora e f⁻¹ é sua inversa, quanto vale a composição (f ∘ f⁻¹)(x)?",
        options: ["x", "1", "0", "x²"],
        answer: "x",
        explanation: "A composição de uma função bijetora com a sua inversa resulta sempre na função identidade, ou seja, (f ∘ f⁻¹)(x) = x."
    },
    {
        id: 10,
        title: "Aplicação Prática de Inversa",
        text: "Uma locadora de veículos cobra uma taxa fixa de R$ 50,00 mais R$ 20,00 por quilômetro rodado, expressa por C(km) = 20(km) + 50. Qual função permite descobrir os quilômetros rodados a partir do custo C?",
        options: ["km(C) = (C - 50) / 20", "km(C) = (C + 50) / 20", "km(C) = 20C - 50", "km(C) = C / 20 - 50"],
        answer: "km(C) = (C - 50) / 20",
        explanation: "Isolando a variável de quilometragem: C = 20km + 50 ⟹ C - 50 = 20km ⟹ km = (C - 50) / 20, que representa a função inversa."
    }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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
    }
}

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

    // Embaralha as alternativas
    const shuffledOptions = shuffleArray([...q.options]);

    shuffledOptions.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(userChoice) {
    const q = selectedQuestions[currentQuestionIndex];
    const isCorrect = (userChoice === q.answer);
    
    playSound(isCorrect);

    const feedbackIcon = document.getElementById("feedback-icon");
    const feedbackTitle = document.getElementById("feedback-title");

    if (isCorrect) {
        score += 20;
        feedbackTitle.innerText = "🎉 Resposta Correta!";
        feedbackTitle.style.color = "#2ecc71";
        feedbackIcon.innerText = "✅";
    } else {
        feedbackTitle.innerText = "❌ Resposta Incorreta!";
        feedbackTitle.style.color = "#e74c3c";
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

function showTutorial() {
    document.getElementById("modal-tutorial").classList.remove("hidden");
}

function closeTutorial() {
    document.getElementById("modal-tutorial").classList.add("hidden");
}
