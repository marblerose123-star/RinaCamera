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

    const processedImage =
        preprocessImage(image);

    return detectObject(processedImage, area);

}

function preprocessImage(image){

    console.log("画像前処理開始");

    return image;

}
