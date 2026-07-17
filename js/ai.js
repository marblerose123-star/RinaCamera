// Rina Camera AI
function aiReady(){

    console.log("AI Module Ready");

}
function detectObject(){

    const testObjects = [

        "cat",

        "person",

        "none"

    ];

    const random = Math.floor(

        Math.random() * testObjects.length

    );

    return testObjects[random];

}
