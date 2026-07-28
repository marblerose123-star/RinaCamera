// ------------------------------
// History Engine
// ------------------------------

function loadHistory() {

    const saved = localStorage.getItem("rinaHistory");

    if(saved){

        document.getElementById("history").innerHTML = saved;

    }

}

function saveHistory(){

    localStorage.setItem(

        "rinaHistory",

        document.getElementById("history").innerHTML

    );

}

function addHistory(text){

    const history=document.getElementById("history");

    const now=new Date();

    const time=

        now.getHours().toString().padStart(2,"0")

        +":"

        +

        now.getMinutes().toString().padStart(2,"0");

let photo = "images/cat-test.jpg";

if(text.includes("チャチャ")){

    photo = "images/chacha-test.jpg";

}
else if(text.includes("シロ")){

    photo = "images/shiro-test.jpg";

}
else if(text.includes("人")){

    photo = "images/person-test.jpg";

}

history.innerHTML=

`

<div class="history-card">

<div class="history-time">

🕒 ${time}

</div>

<div>

${text}

</div>

<img
src="${photo}"
class="history-photo">

</div>

`

+history.innerHTML;

document.getElementById("todayHistory").innerHTML =

`

<div class="history-card">

<div class="history-time">

🕒 ${time}

</div>

<div>

${text}

</div>

<img
src="${photo}"
class="history-photo">

</div>

`;

saveHistory();

    document.getElementById("latestDetect").textContent = text;
    
    document.getElementById("latestTime").textContent = time;

}

