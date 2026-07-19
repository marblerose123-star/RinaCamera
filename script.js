// ------------------------------
// 履歴
// ------------------------------

let monitorTimer = null;

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

// ------------------------------
// 監視モード
// ------------------------------

function loadMode(){

    const mode = localStorage.getItem("rinaMode");

    if(mode){

        document.getElementById("mode").textContent = mode;

    }

}

function saveMode(text){

    localStorage.setItem("rinaMode",text);

}

// ------------------------------
// 監視開始
// ------------------------------

function startMonitor(){

    document.getElementById("status").textContent="🟢 監視中";

const image = getCameraImage();

const result = detectObject(image);

if(result == "chacha"){

    notify("🐈 チャチャを検知");

    addHistory("🐈 チャチャを検知");

    increaseCat();

}

else if(result == "shiro"){

    notify("🤍 シロを検知");

    addHistory("🤍 シロを検知");

    increaseCat();

}

else if(result == "person"){

    notify("🚶 人を検知");

    addHistory("🚶 人を検知");

}

else{

    console.log("何も検知しませんでした");

}
}

function stopMonitor(){

    document.getElementById("status").textContent="⚪ 監視停止";

}

// ------------------------------
// 履歴追加
// ------------------------------

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

    saveHistory();

}

// ------------------------------
// 設定
// ------------------------------

function openSettings(){

    const mode=prompt(

`監視モード

1 = 夜だけ

2 = 24時間

3 = 停止`

    );

    let text="";

    if(mode==="1"){

        text="🌙 監視モード：夜だけ";

    }

    else if(mode==="2"){

        text="☀️ 監視モード：24時間";

    }

    else if(mode==="3"){

        text="⏸ 監視モード：停止";

    }

    if(text!=""){

        document.getElementById("mode").textContent=text;

        saveMode(text);

    }

}

// ------------------------------
// 猫カウンター
// ------------------------------

function increaseCat(){

    const cat=document.getElementById("catCount");

    let number=

    Number(cat.textContent.replace(/[^0-9]/g,""));

    number++;

    cat.textContent=

    "🐈 猫　"+number+"件";

}

// ------------------------------

window.onload = function(){

    loadHistory();

    const camera =
    cameraReady();

    console.log(camera);

    aiReady();

};
