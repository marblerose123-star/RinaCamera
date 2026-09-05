// ------------------------------
// Monitor Engine
// ------------------------------

let motionState = {

    detected: false,

    lastImage: null

};

function startMonitor(){

    aiState.running = true;

    document.getElementById("status").textContent =
        "🟢 監視中";

    if(monitorTimer){

        clearInterval(monitorTimer);

    }

    monitorTimer = setInterval(function(){

        // ライブ映像を壊さないため、
        // video要素のsrcは変更しない
        const live =
            document.getElementById("liveCamera");

        if(!live){

            console.error("liveCamera が見つかりません");

            return;

        }

        // 現在はAIテスト段階
        // 実カメラ映像のフレーム取得は次の段階で追加
        const image = captureFrame();

        motionState.lastImage = image;

        const area = getDetectArea();

        const result =
            runAI(image, area);

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

            increaseChacha();

        }

        else if(result == "shiro"){

            notify("🤍 シロを検知");

            addHistory("🤍 シロを検知");

            increaseShiro();

        }

        else if(result == "person"){

            notify("🚶 人を検知");

            addHistory("🚶 人を検知");

            increasePerson();

        }

        else{

            console.log("何も検知しませんでした");

        }

    }, aiConfig.detectInterval);

}

function getDetectArea(){

    return detectArea;

}

function stopMonitor(){

    aiState.running = false;

    document.getElementById("status").textContent =
        "⚪ 監視停止";

    clearInterval(monitorTimer);

    monitorTimer = null;

    lastResult = "";

    document.getElementById("aiStatus").textContent =
        "🤖 AI待機中";

    document.getElementById("aiScore").textContent =
        "AI信頼度：--";

    // ライブ映像のsrcは変更しない
}
