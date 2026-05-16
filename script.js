WA.onInit().then(() => {
    // 画面下部にポップアップメッセージを表示する
    WA.ui.displayActionMessage({
        message: "倉田研究室のメタバース空間へようこそ！（スペースキーで閉じる）",
        type: "message", // "warning" にすると強調表示になります
        callback: () => {
            // ユーザーがスペースキーで閉じたあとの処理（空でもOK）
            console.log("メッセージが閉じられました");
        }
    });
});

// 人間側のブラウザで動くマップスクリプト (map-script.js)
WA.player.proximityMeeting.onJoin().subscribe((user) => {
    // 近づいてきた相手の名前が「案内係」だった場合
    if (user.name === '案内係') {
        // 自分の画面のチャット欄に、案内係からのメッセージとしてローカル表示する
        WA.chat.sendChatMessage('なにか私にできることはありますか？', '案内係');
        
        // （おまけ）画面中央にポップアップ通知を出したい場合はこちら
        // WA.ui.displayActionMessage({
        //     message: "案内係が話しかけています！",
        //     type: "message",
        //     timeout: 5000
        // });
    }
});