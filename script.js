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

// マップ側の script.js に追記するコード
WA.player.proximityMeeting.onJoin().subscribe((user) => {
    if (user.name === '案内係') {
        // 近づいてきたら、自分の画面左側のチャット欄にメッセージを追加する
        WA.chat.sendChatMessage('なにか私にできることはありますか？', '案内係');
    }
});
