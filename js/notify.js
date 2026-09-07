// Rina Camera
// Android対応 Notification Engine

let notificationRegistration = null;


// ------------------------------
// 通知準備
// ------------------------------

async function notificationReady(){

    console.log("通知システム準備開始");

    if(!("Notification" in window)){

        console.log("このブラウザは通知に対応していません");

        return false;

    }

    if(!("serviceWorker" in navigator)){

        console.log("Service Workerに対応していません");

        return false;

    }


    try{

        notificationRegistration =
            await navigator.serviceWorker.register("sw.js");

        console.log(
            "Service Worker登録完了"
        );


        if(Notification.permission === "granted"){

            console.log("通知：許可済み");

            return true;

        }


        if(Notification.permission === "default"){

            const permission =
                await Notification.requestPermission();

            if(permission === "granted"){

                console.log(
                    "通知：許可されました"
                );

                return true;

            }

        }


        console.log(
            "通知：許可されていません"
        );

        return false;

    }
    catch(error){

        console.error(
            "通知準備エラー:",
            error
        );

        return false;

    }

}


// ------------------------------
// 通知
// ------------------------------

async function notify(message){

    console.log(
        "通知：" + message
    );


    if(!notificationRegistration){

        console.log(
            "通知システムがまだ準備されていません"
        );

        return;

    }


    if(Notification.permission !== "granted"){

        console.log(
            "通知許可がありません"
        );

        return;

    }


    try{

        await notificationRegistration.showNotification(
            "🐈 Rina Camera",
            {
                body: message,
                icon: "images/icon.png",
                tag: "rina-camera"
            }
        );

        console.log(
            "通知を表示しました"
        );

    }
    catch(error){

        console.error(
            "通知表示エラー:",
            error
        );

    }

}


// ------------------------------
// 通知テスト
// ------------------------------

async function testNotification(){

    console.log(
        "通知テスト実行"
    );

    await notify(
        "テスト通知です"
    );

    alert(
        "通知テストを実行しました"
    );

}
