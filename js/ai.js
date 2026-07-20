// Rina Camera AI

function aiReady(){

    console.log("AI Module Ready");

}

function detectObject(image){

    console.log("AIで画像を解析中...");

    console.log("解析画像:", image);

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
