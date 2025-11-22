const questions = [
  {
    question: "¿Qué país ha ganado más Copas del Mundo?",
    options: ["Argentina", "Brasil", "Alemania", "Italia"],
    correct: 1
  },
  {
    question: "¿En qué año se celebró el primer Mundial?",
    options: ["1928", "1930", "1934", "1938"],
    correct: 1
  },
  {
    question: "¿Quién es el máximo goleador en la historia de los Mundiales?",
    options: ["Pelé", "Ronaldo", "Miroslav Klose", "Diego Maradona"],
    correct: 2
  },
  {
    question: "¿Qué país organizó el Mundial de 2014?",
    options: ["Sudáfrica", "Rusia", "Brasil", "Alemania"],
    correct: 2
  },
  {
    question: "¿Cuántos goles marcó Just Fontaine en el Mundial de 1958?",
    options: ["10", "11", "13", "15"],
    correct: 2
  },
  {
    question: "¿Qué selección ganó el Mundial de 2010 por primera vez?",
    options: ["Holanda", "España", "Italia", "Francia"],
    correct: 1
  },
  {
    question: "¿En qué país se jugó el 'Maracanazo' en 1950?",
    options: ["Argentina", "Uruguay", "Brasil", "Chile"],
    correct: 2
  },
  {
    question: "¿Cuántas Copas del Mundo ha ganado Alemania?",
    options: ["2", "3", "4", "5"],
    correct: 2
  },
  {
    question: "¿Quién anotó el gol más rápido en la historia de los Mundiales?",
    options: ["Hakan Şükür", "Clint Dempsey", "Bryan Robson", "Emilio Butragueño"],
    correct: 0
  },
  {
    question: "¿Qué jugador argentino ganó el Balón de Oro en el Mundial 2022?",
    options: ["Julián Álvarez", "Ángel Di María", "Lionel Messi", "Emiliano Martínez"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionCard = document.getElementById('questionCard');
const resultCard = document.getElementById('resultCard');
const questionNumber = document.getElementById('questionNumber');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const currentScoreElement = document.getElementById('currentScore');
const totalQuestionsElement = document.getElementById('totalQuestions');
const finalScoreElement = document.getElementById('finalScore');
const resultMessage = document.getElementById('resultMessage');
const restartBtn = document.getElementById('restartBtn');

totalQuestionsElement.textContent = questions.length;

function loadQuestion() {
  answered = false;
  nextBtn.classList.remove('show');
  
  const question = questions[currentQuestion];
  questionNumber.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
  questionText.textContent = question.question;
  
  optionsContainer.innerHTML = '';
  
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.classList.add('option-btn');
    button.textContent = option;
    button.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  
  answered = true;
  const question = questions[currentQuestion];
  const buttons = optionsContainer.querySelectorAll('.option-btn');
  
  buttons.forEach((button, index) => {
    button.classList.add('disabled');
    if (index === question.correct) {
      button.classList.add('correct');
    }
    if (index === selectedIndex && selectedIndex !== question.correct) {
      button.classList.add('incorrect');
    }
  });
  
  if (selectedIndex === question.correct) {
    score++;
    currentScoreElement.textContent = score;
  }
  
  nextBtn.classList.add('show');
}

function nextQuestion() {
  currentQuestion++;
  
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  questionCard.style.display = 'none';
  resultCard.classList.add('show');
  
  finalScoreElement.textContent = `${score} / ${questions.length}`;
  
  const percentage = (score / questions.length) * 100;
  
  if (percentage === 100) {
    resultMessage.textContent = "Perfecto. Dominas cada detalle de los Mundiales.";
  } else if (percentage >= 70) {
    resultMessage.textContent = "Excelente. Conoces muy bien la historia del torneo.";
  } else if (percentage >= 50) {
    resultMessage.textContent = "Buen desempeño. Tienes bases sólidas para seguir creciendo.";
  } else {
    resultMessage.textContent = "Sigue practicando. Cada partida afila tu memoria futbolera.";
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  currentScoreElement.textContent = 0;
  questionCard.style.display = 'block';
  resultCard.classList.remove('show');
  loadQuestion();
}

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

loadQuestion(); 