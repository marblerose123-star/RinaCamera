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

    const result =
        detectObject(processedImage, area);

    return postprocessResult(result);

}

function preprocessImage(image){

    console.log("画像前処理開始");

    return image;

}

const aiFilter = {

    ignoreOther: true,

    minConfidence: 90,

    nightMode: true

};

function postprocessResult(result){

    if(result == null){

        return "none";

    }

    if(aiFilter.ignoreOther && result == "other"){

        return "none";

    }

    return result;

}
