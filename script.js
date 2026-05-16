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

WA.player.proximityMeeting.onJoin().subscribe((user) => {
    // コンソールで接近したユーザーを確認（デバッグ用）
    console.log("アバターが接近しました。認識された名前:", user.name);

    // 【修正点】名前が「案内係」であるか、Bot専用のタグを持っている場合のみ発動
    if (user.name === '案内係' || (user.state && user.state.isGuideBot)) {
        
        // 1. 画面左側のチャットログに残す
        WA.chat.sendChatMessage('なにか私にできることはありますか？', '案内係');

        // 2. 画面中央下にポップアップ通知を出す
        WA.ui.displayActionMessage({
            message: "案内係：なにか私にできることはありますか？",
            type: "message"
        });
    }
});