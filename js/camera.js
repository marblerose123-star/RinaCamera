// Rina Camera
const cameraConfig = {

    mode: "test",

    interval: 1000,

    url:""

};
// Camera Control

function cameraReady(){

    console.log("Camera Module Ready");

    const camera =
        document.getElementById("cameraStatus");

    camera.textContent =
        "📷 カメラ：接続準備完了";
    
    const mode =
        document.getElementById("cameraMode");

    if(cameraConfig.mode=="test"){
        
        mode.textContent =
        "📷 カメラモード：テスト画像";

}

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
