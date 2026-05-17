WA.onInit().then(() => {
    // 画面下部にポップアップメッセージを表示する
    WA.ui.displayActionMessage({
        message: "倉田研究室のメタバース空間へようこそ！ここには案内係がいます．",
        type: "message", // "warning" にすると強調表示になります
        callback: () => {
            // ユーザーがスペースキーで閉じたあとの処理（空でもOK）
            console.log("メッセージが閉じられました");
        }
    });
});

// マップに読み込ませる script.js

let isChatOpen = false;

setInterval(async () => {
    try {
        const players = await WA.room.getPlayers();
        // Botを探す
        const bot = players.find(p => p.name === '案内係' || (p.state && p.state.isGuideBot));

        if (bot) {
            const myPos = await WA.player.getPosition();
            const distanceX = Math.abs(myPos.x - bot.x);
            const distanceY = Math.abs(myPos.y - bot.y);
            
            // 3マス以内に入ったら、チャット画面（Co-WebSite）を強制的に開く！
            if (distanceX <= 3 && distanceY <= 3) {
                if (!isChatOpen) {
                    isChatOpen = true;
                    // ※仮としてWikipediaを開きます。将来ここにAIチャットアプリのURLを入れます。
                    WA.nav.openCoWebSite('https://ja.wikipedia.org/wiki/人工知能');
                }
            } else {
                // 離れたら閉じる
                if (isChatOpen) {
                    isChatOpen = false;
                    WA.nav.closeCoWebSite();
                }
            }
        }
    } catch (e) {}
}, 1000);

// 会話の輪（バブル）が繋がった瞬間に発火するイベント
WA.player.proximityMeeting.onJoin().subscribe((users) => {
    console.log("誰かと会話範囲に入りました", users);
    
    // 繋がった相手の中に「案内係」がいるかチェックする
    const isBot = users.some(user => user.name === '案内係' || user.isGuideBot);

    if (isBot) {
        // 案内係だったらチャット画面を開く
        WA.nav.openCoWebSite('https://shin1222kurata.github.io/wa.kuratalab.net-sample01/ai-chat.html');
    }
});

// 会話の輪（バブル）から離れた瞬間に発火するイベント
WA.player.proximityMeeting.onLeave().subscribe((users) => {
    console.log("会話範囲から出ました");
    
    // チャット画面を閉じる
    WA.nav.closeCoWebSite();
});