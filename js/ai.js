// Rina Camera AI
function aiReady(){

    console.log("AI Module Ready");

}

function detectObject(image){

    console.log("AIで画像を解析中...");

    console.log("解析画像:", image);

    const testObjects = [

        "chacha",

        "shiro",

        "person",

        "none"

    ];

    const random =
        Math.floor(Math.random()*testObjects.length);

    return testObjects[random];

}
