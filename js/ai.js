// Rina Camera AI
function aiReady(){

    console.log("AI Module Ready");

}
function detectObject(){

    console.log("AIで画像を解析中...");

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
