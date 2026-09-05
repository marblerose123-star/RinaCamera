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

            updateAIStatus(result);

            console.log(
                "ライブ映像AI判定:",
                result
            );

            if(result === "none"){

                lastResult = "";

                return;

            }

            if(result === lastResult){

                return;

            }

            lastResult = result;


            // ------------------------------
            // 人
            // ------------------------------

            if(result == "person"){

                notify("🚶 人を検知");

                addHistory("🚶 人を検知");

                increasePerson();

            }


            // ------------------------------
            // 猫
            // ------------------------------

            else if(result == "cat"){

                notify("🐈 猫を検知");

                addHistory("🐈 猫を検知");

                // 現段階では猫として記録
                // チャチャ・シロの個体識別は次の段階

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
