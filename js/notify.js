// Rina Camera
// Notification Engine


// ------------------------------
// 通知の準備
// ------------------------------

async function notificationReady(){

    // このブラウザが通知に対応していない場合
    if(!("Notification" in window)){

        console.log("このブラウザは通知に対応していません");

        return false;

    }


    // すでに許可されている
    if(Notification.permission === "granted"){

        console.log("通知：許可済み");

        return true;

    }


    // まだ許可を求めていない
    if(Notification.permission === "default"){

        const permission =
            await Notification.requestPermission();

        if(permission === "granted"){

            console.log("通知：許可されました");

            return true;

        }

        console.log("通知：許可されませんでした");

        return false;

    }


    // denied
    console.log("通知：拒否されています");

    return false;

}


// ------------------------------
// 通知
// ------------------------------

function notify(message){

    console.log("通知：" + message);


    if(!("Notification" in window)){

        return;

    }


    if(Notification.permission !== "granted"){

        console.log("通知許可がありません");

        return;

    }


    new Notification(
        "🐈 Rina Camera",
        {
            body: message
        }
    );

}

function testNotification(){

    console.log("通知テスト実行");

    notify("テスト通知です");

    alert("通知テストを実行しました");

}
