const quizData = [
  {
    question: "When you first start planning a lesson using AI, what do you usually do?",
    answers: [
      { text: "I start by crafting a good prompt to help AI generate ideas for my lesson.", persona: "A" },
      { text: "I ask AI to generate worksheets, examples, or teaching materials for the topic.", persona: "B" },
      { text: "I think about how students themselves could interact with AI during the lesson.", persona: "C" },
      { text: "I look at past student mistakes and ask AI how I could address those misconceptions.", persona: "D" },
      { text: "I reflect on how my previous lesson went and ask AI how it could be improved.", persona: "E" }
    ]
  },
  {
    question: "You discover a new AI tool designed for education. What is the first thing you want to try?",
    answers: [
      { text: "Experiment with different prompts to see what kind of responses the AI gives.", persona: "A" },
      { text: "Use it to quickly generate resources like quizzes or case studies.", persona: "B" },
      { text: "Design an activity where students can use the AI to explore ideas.", persona: "C" },
      { text: "See whether it can help analyse student responses or give feedback.", persona: "D" },
      { text: "Ask it how it could help improve or redesign one of my existing lessons.", persona: "E" }
    ]
  },
  {
    question: "During a lesson, students seem stuck on a difficult concept. How might AI help?",
    answers: [
      { text: "I quickly prompt AI to generate a clearer explanation or example.", persona: "A" },
      { text: "I ask AI to produce a quick practice question or example for students.", persona: "B" },
      { text: "I let students ask the AI questions to help them explore the concept further.", persona: "C" },
      { text: "I ask AI to help identify the misconception students might have.", persona: "D" },
      { text: "I make a mental note and later use AI to rethink how I teach this concept next time.", persona: "E" }
    ]
  },
  {
    question: "After students submit their work, how are you most likely to use AI?",
    answers: [
      { text: "I ask AI how I could better phrase the instructions or prompts next time.", persona: "A" },
      { text: "I use AI to help generate additional practice questions for students.", persona: "B" },
      { text: "I design a follow-up activity where students can discuss their answers with AI.", persona: "C" },
      { text: "I use AI to help analyse patterns in student responses and identify misconceptions.", persona: "D" },
      { text: "I use AI to reflect on the lesson and think about improvements for the next round.", persona: "E" }
    ]
  },
  {
    question: "When colleagues talk about using AI in teaching, which idea excites you most?",
    answers: [
      { text: "Learning how to write better prompts to get more useful responses.", persona: "A" },
      { text: "Using AI to create high-quality teaching materials quickly.", persona: "B" },
      { text: "Finding ways for students to use AI to support their own learning.", persona: "C" },
      { text: "Using AI to better understand student learning and give feedback.", persona: "D" },
      { text: "Using AI to help refine and improve lesson design over time.", persona: "E" }
    ]
  },
  {
    question: "If you had 10 minutes to experiment with AI before your next lesson, what would you most likely do?",
    answers: [
      { text: "Try different prompts to see which ones produce the best teaching ideas.", persona: "A" },
      { text: "Generate a worksheet, example set, or activity for the lesson.", persona: "B" },
      { text: "Create a short activity where students can explore a topic with AI.", persona: "C" },
      { text: "Analyse sample student answers with AI to identify misconceptions.", persona: "D" },
      { text: "Ask AI to review my lesson plan and suggest improvements.", persona: "E" }
    ]
  }
];

const personaResults = {
  A: {
    title: "You are the Prompt Whisperer",
    description: "You know that good AI output often starts with a good prompt. You use AI as a thinking partner to brainstorm, refine explanations, and sharpen lesson ideas before teaching begins.",
    superpower: "Turning simple prompts into powerful teaching ideas.",
    uses: [
      "Brainstorming lesson directions",
      "Refining explanations and examples",
      "Generating strong question stems",
      "Exploring multiple ways to frame a concept"
    ]
  },
  B: {
    title: "You are the Content Alchemist",
    description: "You are excellent at turning ideas into practical teaching resources. AI helps you produce worksheets, case studies, examples, and tasks that make learning more engaging and accessible.",
    superpower: "Transforming ideas into ready-to-use learning materials.",
    uses: [
      "Creating quizzes and worksheets",
      "Generating examples and case studies",
      "Adapting materials for different learner needs",
      "Building engaging lesson resources efficiently"
    ]
  },
  C: {
    title: "You are the Classroom Conductor",
    description: "You see AI as something students can actively learn with, not just something teachers use behind the scenes. You design learning experiences where AI supports inquiry, exploration, and student agency.",
    superpower: "Orchestrating classroom learning where AI supports student thinking.",
    uses: [
      "Designing student-AI inquiry tasks",
      "Supporting brainstorming and exploration",
      "Facilitating discussion with AI prompts",
      "Encouraging reflection and student agency"
    ]
  },
  D: {
    title: "You are the Feedback Detective",
    description: "You use AI to uncover patterns in student understanding. Whether it is spotting misconceptions, analysing responses, or strengthening feedback, you value how AI can make assessment insight sharper and more actionable.",
    superpower: "Turning student responses into meaningful next steps.",
    uses: [
      "Analysing student answers for patterns",
      "Identifying misconceptions",
      "Supporting targeted feedback",
      "Improving assessment-informed teaching"
    ]
  },
  E: {
    title: "You are the Lesson Hacker",
    description: "You are always looking for better ways to teach. AI helps you rethink lesson flow, strengthen explanations, and improve future learning experiences through constant iteration.",
    superpower: "Using AI to continuously refine and improve your teaching practice.",
    uses: [
      "Reviewing lesson effectiveness",
      "Improving lesson flow and clarity",
      "Redesigning learning activities",
      "Generating alternative teaching approaches"
    ]
  }
};

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const progressFill = document.getElementById("progress-fill");

const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const resultSuperpower = document.getElementById("result-superpower");
const resultUses = document.getElementById("result-uses");

let currentQuestionIndex = 0;
let selectedPersona = null;
let scores = { A: 0, B: 0, C: 0, D: 0, E: 0 };

function startQuiz() {
  currentQuestionIndex = 0;
  selectedPersona = null;
  scores = { A: 0, B: 0, C: 0, D: 0, E: 0 };

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  renderQuestion();
}

function renderQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionNumber.textContent = currentQuestionIndex + 1;
  questionText.textContent = currentQuestion.question;
  progressFill.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;

  answerList.innerHTML = "";
  selectedPersona = null;
  nextBtn.disabled = true;

  currentQuestion.answers.forEach((answer, index) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "answer-option";
    option.innerHTML = `
      <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
      <span class="answer-text">${answer.text}</span>
    `;

    option.addEventListener("click", () => {
      document.querySelectorAll(".answer-option").forEach(el => el.classList.remove("selected"));
      option.classList.add("selected");
      selectedPersona = answer.persona;
      nextBtn.disabled = false;
    });

    answerList.appendChild(option);
  });

  nextBtn.textContent = currentQuestionIndex === quizData.length - 1 ? "See Result" : "Next";
}

function getWinningPersona() {
  const maxScore = Math.max(...Object.values(scores));
  const tiedPersonas = Object.keys(scores).filter(key => scores[key] === maxScore);

  if (tiedPersonas.length === 1) return tiedPersonas[0];

  // Tie-break rule: whichever tied persona appeared first in the user's answers,
  // inferred from question order by checking which tied persona was last selected most recently is not stored.
  // Simpler deterministic fallback:
  const priority = ["A", "B", "C", "D", "E"];
  return priority.find(key => tiedPersonas.includes(key));
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const winner = getWinningPersona();
  const result = personaResults[winner];

  resultTitle.textContent = result.title;
  resultDescription.textContent = result.description;
  resultSuperpower.textContent = result.superpower;
  resultUses.innerHTML = "";

  result.uses.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    resultUses.appendChild(li);
  });
}

nextBtn.addEventListener("click", () => {
  if (!selectedPersona) return;

  scores[selectedPersona] += 1;

  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
});

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
