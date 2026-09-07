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


// ------------------------------
// 履歴追加
// ------------------------------

function addHistory(text, image){

    const history =
        document.getElementById("history");

    const now = new Date();

    const time =
        now.getHours().toString().padStart(2,"0")
        + ":"
        +
        now.getMinutes().toString().padStart(2,"0");


    // 実カメラ画像がある場合はそれを使用
    // なければ従来のテスト画像を使用

    let photo = image || "images/cat-test.jpg";


    history.innerHTML =

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

    + history.innerHTML;


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


    document.getElementById("latestDetect").textContent =
        text;

    document.getElementById("latestTime").textContent =
        time;

}


// ------------------------------
// 履歴削除
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


    document.getElementById("todayHistory").innerHTML =

    `<div class="history-card">

        まだ検知はありません

    </div>`;


    document.getElementById("chachaCount").textContent =
        "🐈 チャチャ　0件";

    document.getElementById("shiroCount").textContent =
        "🤍 シロ　0件";

    document.getElementById("personCount").textContent =
        "🚶 人　0件";


    document.getElementById("aiStatus").textContent =
        "🤖 AI待機中";

    document.getElementById("aiScore").textContent =
        "AI信頼度：--";

}
