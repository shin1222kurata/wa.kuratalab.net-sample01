WA.onInit().then(() => {
    // 画面下部にポップアップメッセージを表示する
    WA.ui.displayActionMessage({
        message: "メタバース空間へようこそ！本日の授業はここのルームで行います。（スペースキーで閉じる）",
        type: "message", // "warning" にすると強調表示になります
        callback: () => {
            // ユーザーがスペースキーで閉じたあとの処理（空でもOK）
            console.log("メッセージが閉じられました");
        }
    });
});