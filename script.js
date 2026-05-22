WA.onInit().then(() => {
    WA.ui.displayActionMessage({
        message: "メタバース空間へようこそ！ここには案内係がいます。",
        type: "message",
        callback: () => {
            console.log("メッセージが閉じられました");
        }
    });
});

let isChatOpen = false;
// ご自身のGitHub PagesのURL
const chatUrl = 'https://shin1222kurata.github.io/wa.kuratalab.net-sample01/ai-chat.html';

// 方法1：距離判定（こちらの方が確実に特定の位置で発火します）
setInterval(async () => {
    try {
        const players = await WA.room.getPlayers();
        const bot = players.find(p => p.name === '案内係' || (p.state && p.state.isGuideBot));

        if (bot) {
            const myPos = await WA.player.getPosition();
            const distanceX = Math.abs(myPos.x - bot.x);
            const distanceY = Math.abs(myPos.y - bot.y);
            
            // 3マス以内に入ったらチャット画面を開く
            if (distanceX <= 3 && distanceY <= 3) {
                if (!isChatOpen) {
                    isChatOpen = true;
                    //WA.nav.openCoWebSite(chatUrl);
                    // 第2引数の true が「Iframe API（名前の取得など）を許可する」という魔法の鍵です
                    WA.nav.openCoWebSite(chatUrl, true);
                }
            } else {
                // 離れたら閉じる
                if (isChatOpen) {
                    isChatOpen = false;
                    WA.nav.closeCoWebSite();
                }
            }
        }
    } catch (e) {
        console.error("プレイヤー情報の取得エラー", e);
    }
}, 1000);

// ※ proximityMeetingのイベントは、距離判定(setInterval)と重複するため削除またはコメントアウト推奨