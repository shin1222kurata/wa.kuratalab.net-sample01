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

// --- 以下を既存のコードの末尾に追記 ---

WA.player.proximityMeeting.onJoin().subscribe((user) => {
    // 近づいてきた相手の名前が「案内係」だった場合、自分のチャット欄にメッセージを表示する
    if (user.name === '案内係') {
        WA.chat.sendChatMessage('なにか私にできることはありますか？', '案内係');
    }
});
