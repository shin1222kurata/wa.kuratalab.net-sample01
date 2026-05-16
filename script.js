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

// スクリプトが読み込まれているか確認（ブラウザのF12開発者ツール(Console)で確認できます）
console.log("マップスクリプトが正常に起動しました！");

WA.player.proximityMeeting.onJoin().subscribe((user) => {
    // 誰かが近づいた瞬間に、その人の名前を裏側（Console）に出力して確認する
    console.log("アバターが接近しました。認識された名前:", user.name);

    // 【対策1】完全一致ではなく「案内係」という文字が"含まれているか"で判定し、エラーを吸収する
    if (user.name && user.name.includes('案内係')) {
        
        // 1. 画面左側のチャットログに残す
        WA.chat.sendChatMessage('なにか私にできることはありますか？', '案内係');

        // 2. 【対策2】チャット欄を開いていなくても確実に気付くように、画面にポップアップを出す
        WA.ui.displayActionMessage({
            message: "案内係：なにか私にできることはありますか？",
            type: "message"
        });
    }
});
