// ------------------------------
// Monitor Engine
// ------------------------------

let motionState = {

    detected: false,

    lastImage: null

};

let aiProcessing = false;


// ------------------------------
// 監視開始
// ------------------------------

function startMonitor(){

    aiState.running = true;

    document.getElementById("status").textContent =
        "🟢 監視中";

    if(monitorTimer){

        clearInterval(monitorTimer);

    }

    monitorTimer = setInterval(async function(){

        // 前のAI解析がまだ終わっている場合は待つ
        if(aiProcessing){

            return;

        }

        const live =
            document.getElementById("liveCamera");

        if(!live){

            console.error("liveCamera が見つかりません");

            return;

        }

        // ライブ映像から1フレーム取得
        const image = captureFrame();

        if(!image){

            return;

        }

        motionState.lastImage = image;

        const area = getDetectArea();

        // AI解析中
        aiProcessing = true;

        try{

  const result =
    await runAI(image, area);


// ------------------------------
// 何も検知しなかった場合
// ------------------------------

if(result === "none"){

    updateAIStatus("none");

    lastResult = "";

    console.log(
        "ライブ映像AI判定: none"
    );

    return;

}


// ------------------------------
// AI判定結果
// ------------------------------

const type = result.type;

const score = result.score;

console.log(
    "ライブ映像AI判定:",
    type,
    Math.round(score * 100) + "%"
);


// ------------------------------
// AI表示
// ------------------------------

updateAIStatus(
    type,
    score
);


// ------------------------------
// 同じ検知を連続記録しない
// ------------------------------

if(type === lastResult){

    return;

}

lastResult = type;


// ------------------------------
// 人
// ------------------------------

if(type === "person"){

    notify("🚶 人を検知");

    addHistory("🚶 人を検知", image);

    increasePerson();

}


// ------------------------------
// 猫
// ------------------------------

else if(type === "cat"){

    notify("🐈 猫を検知");

    addHistory("🐈 猫を検知", image);

}
        }
        catch(error){

            console.error(
                "AI解析エラー:",
                error
            );

        }
        finally{

            aiProcessing = false;

        }

    }, aiConfig.detectInterval);

}


// ------------------------------
// 検知エリア
// ------------------------------

function getDetectArea(){

    return detectArea;

}


// ------------------------------
// 監視停止
// ------------------------------

function stopMonitor(){

    aiState.running = false;

    document.getElementById("status").textContent =
        "⚪ 監視停止";

    clearInterval(monitorTimer);

    monitorTimer = null;

    lastResult = "";

    aiProcessing = false;

    document.getElementById("aiStatus").textContent =
        "🤖 AI待機中";

    document.getElementById("aiScore").textContent =
        "AI信頼度：--";

    // ライブ映像のsrcは変更しない

}
