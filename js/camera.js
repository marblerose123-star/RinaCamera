// Rina Camera

const cameraConfig = {

    mode: localStorage.getItem("cameraMode") || "test",

    interval: 1000,

    url: localStorage.getItem("cameraUrl") || "",

    snapshotUrl: localStorage.getItem("snapshotUrl") || "",

    streamType: localStorage.getItem("streamType") || "hls"

};


// ------------------------------
// Camera Control
// ------------------------------

function cameraReady(){

    console.log("Camera Module Ready");

    const camera =
        document.getElementById("cameraStatus");

    camera.textContent =
        "📷 カメラ：接続準備完了";

    const mode =
        document.getElementById("cameraMode");

    mode.textContent =
        "📷 カメラモード：実カメラ映像";

    return true;

}


// ------------------------------
// カメラ画像
// ------------------------------

function getCameraImage(){

    console.log("カメラ画像を取得");

    if(cameraConfig.mode == "camera"){

        return cameraConfig.url;

    }

    const testImages = [

        "images/chacha-test.jpg",

        "images/shiro-test.jpg",

        "images/person-test.jpg"

    ];

    const random =
        Math.floor(Math.random() * testImages.length);

    return testImages[random];

}


// ------------------------------
// ライブ映像から1フレーム取得
// ------------------------------

function captureFrame(){

    const video =
        document.getElementById("liveCamera");

    if(!video){

        console.error("liveCamera が見つかりません");

        return null;

    }

    if(video.readyState < 2){

        console.log("ライブ映像の準備中");

        return null;

    }

    const canvas =
        document.createElement("canvas");

    canvas.width =
        video.videoWidth;

    canvas.height =
        video.videoHeight;

    const context =
        canvas.getContext("2d");

    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    console.log(
        "ライブ映像からフレームを取得",
        canvas.width,
        "x",
        canvas.height
    );

    return canvas.toDataURL("image/jpeg", 0.8);

}
