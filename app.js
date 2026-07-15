function startCamera() {
    document.getElementById("status").textContent = "🟢監視中";
}

function stopCamera() {
    document.getElementById("status").textContent = "⚪監視停止";
}

function addHistory(text) {

    const list = document.getElementById("history");

    if (!list) return;

    if (list.innerHTML.includes("まだありません")) {
        list.innerHTML = "";
    }

    const li = document.createElement("li");

    const now = new Date();

    const time =
        now.getHours().toString().padStart(2,"0")
        + ":"
        +
        now.getMinutes().toString().padStart(2,"0");

    li.textContent = time + "　" + text;

    list.prepend(li);

}
