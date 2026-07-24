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

    document.getElementById("settingsDialog").style.display = "block";

}

function closeSettings(){

    document.getElementById("settingsDialog").style.display = "none";

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

function openSettings(){

    document.getElementById("settingsDialog").style.display = "block";

}

function closeSettings(){

    document.getElementById("settingsDialog").style.display = "none";

}

window.onload = function(){

    loadHistory();

    const camera =
    cameraReady();

    console.log(camera);

    aiReady();

};

function setTestMode(){

    cameraConfig.mode = "test";

    document.getElementById("cameraMode").textContent =
        "📷 カメラモード：テスト画像";

    alert("テスト画像モードに切り替えました");

    closeSettings();

}

function setCameraUrl(){

    const url = prompt(
        "カメラアドレスを入力してください",
        cameraConfig.url || "rtsp://192.168.1.5:554"
    );

    if(!url){

        return;

    }

    cameraConfig.url = url;

    alert("保存しました");

    closeSettings();

}

function setMonitorMode(mode){

    if(mode=="night"){

        document.getElementById("mode").textContent =
        "🌙 監視モード：夜だけ";
        saveMode("🌙 監視モード：夜だけ");        
    }

    else if(mode=="all"){

        document.getElementById("mode").textContent =
        "☀️ 監視モード：24時間";
        saveMode("☀️ 監視モード：24時間");
    }

    else{

        document.getElementById("mode").textContent =
        "⏸ 監視モード：停止";
        saveMode("⏸ 監視モード：停止");
    }

    closeSettings();

}
