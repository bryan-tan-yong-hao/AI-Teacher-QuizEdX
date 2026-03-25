const quizData = [
{
question: "When planning with AI, what do you do first?",
answers: [
{text:"Craft prompts", persona:"A"},
{text:"Generate materials", persona:"B"},
{text:"Student AI use", persona:"C"},
{text:"Analyse mistakes", persona:"D"},
{text:"Improve lesson", persona:"E"}
]}
];

const personaResults = {
A:{title:"Prompt Whisperer",description:"You master prompts."},
B:{title:"Content Alchemist",description:"You create materials."},
C:{title:"Classroom Conductor",description:"You guide students."},
D:{title:"Feedback Detective",description:"You analyse data."},
E:{title:"Lesson Hacker",description:"You improve lessons."}
};

let current = 0;
let scores = {A:0,B:0,C:0,D:0,E:0};
let selected = null;

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

startBtn.onclick = startQuiz;
nextBtn.onclick = nextQuestion;
restartBtn.onclick = startQuiz;

function startQuiz(){
current=0;
scores={A:0,B:0,C:0,D:0,E:0};

document.getElementById("start-screen").classList.add("hidden");
document.getElementById("result-screen").classList.add("hidden");
document.getElementById("quiz-screen").classList.remove("hidden");

renderQuestion();
}

function renderQuestion(){
const q = quizData[current];
document.getElementById("question-text").innerText = q.question;
const list = document.getElementById("answer-list");
list.innerHTML = "";
selected=null;
nextBtn.disabled=true;

q.answers.forEach((a,i)=>{
const div = document.createElement("div");
div.className="answer";
div.innerText = a.text;

div.onclick = ()=>{
document.querySelectorAll(".answer").forEach(x=>x.classList.remove("selected"));
div.classList.add("selected");
selected = a.persona;
nextBtn.disabled=false;
};

list.appendChild(div);
});
}

function nextQuestion(){
scores[selected]++;

showResult();
}

function showResult(){
document.getElementById("quiz-screen").classList.add("hidden");
document.getElementById("result-screen").classList.remove("hidden");

const winner = Object.keys(scores).reduce((a,b)=>scores[a]>scores[b]?a:b);
const result = personaResults[winner];

const imageMap = {
A: "images/prompt-whisperer.png",
B: "images/content-alchemist.png",
C: "images/classroom-conductor.png",
D: "images/feedback-detective.png",
E: "images/lesson-hacker.png"
};

document.getElementById("result-image").src = imageMap[winner];
document.getElementById("result-title").innerText = result.title;
document.getElementById("result-description").innerText = result.description;
}
