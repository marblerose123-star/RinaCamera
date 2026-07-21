// Rina Camera
const cameraConfig = {

    mode: "test",

    interval: 1000

};
// Camera Control

function cameraReady(){

    console.log("Camera Module Ready");

    const camera =
        document.getElementById("cameraStatus");

    camera.textContent =
        "📷 カメラ：接続準備完了";

    return true;

}

function getCameraImage(){

    console.log("カメラ画像を取得");

    const testImages = [

        "images/chacha-test.jpg",

        "images/shiro-test.jpg",

        "images/person-test.jpg"

    ];

    const random =
        Math.floor(Math.random() * testImages.length);

    return testImages[random];

}
