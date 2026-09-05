// ------------------------------
// 履歴
// ------------------------------

let monitorTimer = null;
let lastResult = "";

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

const detectArea = {

    x: 0.03,

    y: 0.60,

    width: 0.90,

    height: 0.40

};

const aiConfig = {

    detectInterval: 1000,

    confidence: 90,

    detectCats: true,

    detectPeople: true,

    detectOther: false

};

let aiState = {

    running: false,

    lastDetect: "none",

    confidence: 0,

    lastTime: ""

};

// ------------------------------
// 履歴追加
// ------------------------------


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

function increaseChacha(){

    const cat =
        document.getElementById("chachaCount");

    let number =
        Number(cat.textContent.replace(/[^0-9]/g,""));

    number++;

    cat.textContent =
        "🐈 チャチャ　" + number + "件";

    updateTodayTotal();

}

function increaseShiro(){

    const cat =
        document.getElementById("shiroCount");

    let number =
        Number(cat.textContent.replace(/[^0-9]/g,""));

    number++;

    cat.textContent =
        "🤍 シロ　" + number + "件";

    updateTodayTotal();

}

function increasePerson(){

    const person =
        document.getElementById("personCount");

    let number =
        Number(person.textContent.replace(/[^0-9]/g,""));

    number++;

    person.textContent =
        "🚶 人　" + number + "件";

    updateTodayTotal();

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

window.onload = function(){

    loadHistory();

    const camera =
    cameraReady();

    console.log(camera);

    aiReady();

};

function loadLocalImage(event){

    const file = event.target.files[0];

    if(!file){
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e){

        const image = e.target.result;

        document.getElementById("liveCamera").src = image;

        addHistory("🖼 保存画像を読み込み");

        alert("画像を読み込みました。");

    };

    reader.readAsDataURL(file);

}

function setTestMode(){

    cameraConfig.mode = "test";
    localStorage.setItem("cameraMode", "test");

    document.getElementById("cameraMode").textContent =
        "📷 カメラモード：テスト画像";

    alert("テスト画像モードに切り替えました");

    closeSettings();

}

function setCameraUrl(){

    const url = prompt(
        "カメラアドレスを入力してください",
        cameraConfig.url || "rtsp://192.168.1.5:554/live"
    );

    if(!url){

        return;

    }

    cameraConfig.url = url;

    cameraConfig.mode = "camera";

    cameraReady();

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

function openLiveView(){

    if(!cameraConfig.url){

        alert("カメラアドレスが設定されていません。");

        return;

    }

    const ok = confirm(
        "VLCでライブ映像を開きます。\n\nOKを押してください。"
    );

    if(ok){

        window.location.href = cameraConfig.url;

    }

}

function updateTodayTotal(){

    const chacha =
        Number(
            document.getElementById("chachaCount")
            .textContent.replace(/[^0-9]/g,"")
        );

    const shiro =
        Number(
            document.getElementById("shiroCount")
            .textContent.replace(/[^0-9]/g,"")
        );

    const person =
        Number(
            document.getElementById("personCount")
            .textContent.replace(/[^0-9]/g,"")
        );

    document.getElementById("todayTotal").textContent =
        "📊 今日 合計 " + (chacha + shiro + person) + "件";

}
