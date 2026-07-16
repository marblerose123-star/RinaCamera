function loadHistory() {
    const saved = localStorage.getItem("rinaHistory");

    if (saved) {
        document.getElementById("history").innerHTML = saved;
    }
}

function saveHistory() {
    localStorage.setItem(
        "rinaHistory",
        document.getElementById("history").innerHTML
    );
}

function startMonitor() {

    document.getElementById("status").textContent = "🟢監視中";

    addHistory("🐱 テスト検知");

}

function stopMonitor() {

    document.getElementById("status").textContent = "⚪監視停止";

}

function addHistory(text){

    const history = document.getElementById("history");

    if(history.innerHTML=="<li>まだありません</li>"){

        history.innerHTML="";

    }

    const now = new Date();

    const time =
        now.getHours().toString().padStart(2,"0")
        + ":"
        +
        now.getMinutes().toString().padStart(2,"0");

    history.innerHTML =
`
<div class="history-card">

<b>${time}</b><br>

${text}

</div>
`
+ history.innerHTML;
    saveHistory();

}

function openSettings() {

    const mode = prompt(
`監視モードを入力してください。

1 = 夜だけ
2 = 24時間
3 = 停止`
    );

    const modeText = document.getElementById("mode");

    if (mode === "1") {

        modeText.textContent = "🌙 監視モード：夜だけ";

    }

    else if (mode === "2") {

        modeText.textContent = "☀️ 監視モード：24時間";

    }

    else if (mode === "3") {

        modeText.textContent = "⏸ 監視モード：停止";

    }

}

window.onload = loadHistory;
