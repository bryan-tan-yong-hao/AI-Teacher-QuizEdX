const questions = [
{
q:"When planning with AI, what do you do first?",
a:[
{text:"Craft prompts",type:"A"},
{text:"Generate materials",type:"B"},
{text:"Student AI use",type:"C"},
{text:"Analyse mistakes",type:"D"},
{text:"Improve lesson",type:"E"}
]}
];

const results = {
A:{title:"Prompt Whisperer",desc:"You master prompts."},
B:{title:"Content Alchemist",desc:"You create materials."},
C:{title:"Classroom Conductor",desc:"You guide students."},
D:{title:"Feedback Detective",desc:"You analyse data."},
E:{title:"Lesson Hacker",desc:"You improve lessons."}
};

let index=0;
let scores={A:0,B:0,C:0,D:0,E:0};

function startQuiz(){
index=0;
scores={A:0,B:0,C:0,D:0,E:0};
document.getElementById("start-screen").style.display="none";
document.getElementById("quiz-screen").style.display="block";
showQuestion();
}

function showQuestion(){
let q=questions[index];
document.getElementById("question").innerText=q.q;
let html="";
q.a.forEach(ans=>{
html+=`<button onclick="select('${ans.type}')">${ans.text}</button><br>`;
});
document.getElementById("answers").innerHTML=html;
}

let selected=null;
function select(t){selected=t;}

function nextQuestion(){
scores[selected]++;
showResult();
}

function showResult(){
document.getElementById("quiz-screen").style.display="none";
document.getElementById("result-screen").style.display="block";

let winner=Object.keys(scores).reduce((a,b)=>scores[a]>scores[b]?a:b);

const imageMap={
A:"images/prompt-whisperer.png",
B:"images/content-alchemist.png",
C:"images/classroom-conductor.png",
D:"images/feedback-detective.png",
E:"images/lesson-hacker.png"
};

const resultImage=document.getElementById("result-image");
resultImage.src=imageMap[winner];

document.getElementById("result-title").innerText=results[winner].title;
document.getElementById("result-description").innerText=results[winner].desc;
}
