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
        "<li>"+time+" "+text+"</li>"
        + history.innerHTML;

}
