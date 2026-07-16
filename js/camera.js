// Rina Camera
// Camera Control

function cameraReady() {

    console.log("Camera Module Ready");

    const camera =
    document.getElementById("cameraStatus");

    camera.textContent =
    "📷 カメラ：接続準備完了";

    return true;

}
