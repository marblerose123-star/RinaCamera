// Rina Camera AI

function aiReady(){

    console.log("AI Module Ready");

}

function detectObject(image, area){

    console.log("AIで画像を解析中...", area);

    if(image.includes("chacha")){

        return "chacha";

    }

    if(image.includes("shiro")){

        return "shiro";

    }

    if(image.includes("person")){

        return "person";

    }

    return "none";

}

function runAI(image, area){

    return detectObject(image, area);

}
