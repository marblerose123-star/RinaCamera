// ------------------------------
// 履歴
// ------------------------------

let monitorTimer = null;
let lastResult = "";
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

    if(monitorTimer){
        clearInterval(monitorTimer);
    　　}
    
    monitorTimer = setInterval(function(){
        const image = getCameraImage();
        const live =
            document.getElementById("liveCamera");
        live.src = image;
        const result = detectObject(image);
        updateAIStatus(result);
        
    if(result === "none"){
    
        lastResult = "";
        
        return;
    }

    if(result === lastResult){
        return;
    }

    lastResult = result;
    
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
        increasePerson();
    }

    else{
        console.log("何も検知しませんでした");
    }

},cameraConfig.interval);
}

function stopMonitor(){

    document.getElementById("status").textContent="⚪ 監視停止";

    clearInterval(monitorTimer);

    monitorTimer = null;

    lastResult = "";

    const live =
        document.getElementById("liveCamera");
    
    document.getElementById("aiStatus").textContent =
        "🤖 AI待機中";
    document.getElementById("aiScore").textContent =
        "AI信頼度：--";

    live.src = "images/no-camera.png";
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

// ------------------------------
// 設定
// ------------------------------

function openSettings(){

    const mode=prompt(

`監視モード

1 = 夜だけ

2 = 24時間

3 = 停止

4 = テスト画像

5 = カメラアドレス`

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

　　else if(mode==="4"){

    cameraConfig.mode = "test";

    localStorage.setItem("cameraMode","test");

    alert("テスト画像モードに切り替えました");

  }

    else if(mode==="5"){

    const url = prompt(

        "カメラのアドレスを入力してください",

        cameraConfig.url

    );

    if(url){

        cameraConfig.url = url;

        localStorage.setItem("cameraUrl", url);

        alert("カメラアドレスを保存しました");

    }

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

function increasePerson(){

    const person =
        document.getElementById("personCount");

    let number =
        Number(person.textContent.replace(/[^0-9]/g,""));

    number++;

    person.textContent =
        "🚶 人　" + number + "件";

}

function updateAIStatus(result){

    const ai =
        document.getElementById("aiStatus");

    if(result=="chacha"){

        ai.textContent =
        "🤖 AI：チャチャを認識";

        document.getElementById("aiScore").textContent =
        "AI信頼度：98%";

    }

    else if(result=="shiro"){

        ai.textContent =
        "🤖 AI：シロを認識";

        document.getElementById("aiScore").textContent =
        "AI信頼度：96%";

    }

    else if(result=="person"){

        ai.textContent =
        "🤖 AI：人を認識";

        document.getElementById("aiScore").textContent =
        "AI信頼度：99%";

    }

    else{

        ai.textContent =
        "🤖 AI：何も検知していません";

        document.getElementById("aiScore").textContent =
        "AI信頼度：--";

    }

}

// ------------------------------

function clearHistory(){

    if(!confirm("履歴を全部消しますか？")){

        return;

    }

    localStorage.removeItem("rinaHistory");

    document.getElementById("history").innerHTML =

    `<div class="history-card">

    まだ検知はありません

    </div>`;

    document.getElementById("catCount").textContent =
    "🐈 猫　0件";

    document.getElementById("personCount").textContent =
    "🚶 人　0件";

    document.getElementById("aiStatus").textContent =
    "🤖 AI待機中";

    document.getElementById("aiScore").textContent =
    "AI信頼度：--";

}

window.onload = function(){

    loadHistory();

    const camera =
    cameraReady();

    console.log(camera);

    aiReady();

};
