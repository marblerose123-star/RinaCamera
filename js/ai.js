// Rina Camera AI
// COCO-SSDによる実映像認識

let aiModel = null;
let aiModelReady = false;


// ------------------------------
// AI初期化
// ------------------------------

async function aiReady(){

    console.log("AI Module Loading...");

    try {

        // TensorFlow.jsを読み込む
        if(typeof tf === "undefined"){

            await loadScript(
                "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js"
            );

        }

        // COCO-SSDを読み込む
        if(typeof cocoSsd === "undefined"){

            await loadScript(
                "https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd@2.2.3"
            );

        }

        console.log("AIモデルを読み込み中...");

        aiModel = await cocoSsd.load();

        aiModelReady = true;

        console.log("AI Module Ready");

        const ai =
            document.getElementById("aiStatus");

        if(ai){

            ai.textContent =
                "🤖 AI準備完了";

        }

    }
    catch(error){

        console.error(
            "AI読み込みエラー:",
            error
        );

    }

}


// ------------------------------
// 外部JavaScript読み込み
// ------------------------------

function loadScript(src){

    return new Promise(function(resolve, reject){

        const script =
            document.createElement("script");

        script.src = src;

        script.onload = resolve;

        script.onerror = reject;

        document.head.appendChild(script);

    });

}


// ------------------------------
// 実映像をAI判定
// ------------------------------

async function detectObject(image, area){

    if(!aiModelReady){

        console.log("AIモデル準備中");

        return "none";

    }

    if(!image){

        return "none";

    }

    console.log(
        "AIでライブ映像を解析中..."
    );


    // Data URLを画像に変換
    const img =
        new Image();

    img.src = image;

    await new Promise(function(resolve){

        img.onload = resolve;

    });


    const predictions =
        await aiModel.detect(img);


    console.log(
        "AI検出結果:",
        predictions
    );


    // 人を検知
    if(aiConfig.detectPeople){

        const person =
            predictions.find(function(item){

                return item.class === "person"
                    && item.score >= 0.50;

            });

        if(person){

            return "person";

        }

    }


    // 猫を検知
    if(aiConfig.detectCats){

        const cat =
            predictions.find(function(item){

                return item.class === "cat"
                    && item.score >= 0.50;

            });

        if(cat){

            return "cat";

        }

    }


    return "none";

}


// ------------------------------
// AI実行
// ------------------------------

async function runAI(image, area){

    const result =
        await detectObject(
            image,
            area
        );

    return postprocessResult(result);

}


// ------------------------------
// 後処理
// ------------------------------

function postprocessResult(result){

    if(result == null){

        return "none";

    }

    if(
        aiFilter.ignoreOther
        &&
        result == "other"
    ){

        return "none";

    }

    return result;

}


// ------------------------------
// AIフィルター
// ------------------------------

const aiFilter = {

    ignoreOther: true,

    minConfidence: 50,

    nightMode: true

};
