WA.onInit().then(() => {
    // 画面下部にポップアップメッセージを表示する
    WA.ui.displayActionMessage({
        message: "倉田研究室のメタバース空間へようこそ！案内係に近づいてみてください（スペースキーで閉じる）",
        type: "message", // "warning" にすると強調表示になります
        callback: () => {
            // ユーザーがスペースキーで閉じたあとの処理（空でもOK）
            console.log("メッセージが閉じられました");
        }
    });
});

console.log("AI案内係のCo-WebSite連動スクリプトが起動しました。");

let isChatWindowOpen = false;

// 表示させたいAIチャットアプリ（後述のHTML）のURLを指定します
// ※実際にホスティングするURLに書き換えてください
const AI_CHAT_URL = 'https://shin1222kurata.github.io/wa.kuratalab.net-sample01/ai-chat.html';

setInterval(async () => {
    try {
        const players = await WA.room.getPlayers();
        const bot = players.find(p => p.name === '案内係' || (p.state && p.state.isGuideBot));

        if (bot) {
            const myPos = await WA.player.getPosition();
            const distanceX = Math.abs(myPos.x - bot.x);
            const distanceY = Math.abs(myPos.y - bot.y);
            
            // 3マス以内に接近した場合
            if (distanceX <= 3 && distanceY <= 3) {
                if (!isChatWindowOpen) {
                    isChatWindowOpen = true;
                    console.log("案内係に接近。AIチャット画面を開きます。");
                    
                    // 画面右側にチャット用Webページをスライドイン表示させる
                    WA.nav.openCoWebSite(AI_CHAT_URL);
                }
            } else {
                // 3マスより離れた場合
                if (isChatWindowOpen) {
                    isChatWindowOpen = false;
                    console.log("案内係から離れました。AIチャット画面を閉じます。");
                    
                    // チャット画面を閉じる
                    WA.nav.closeCoWebSite();
                }
            }
        } else {
            if (isChatWindowOpen) {
                isChatWindowOpen = false;
                WA.nav.closeCoWebSite();
            }
        }
    } catch (e) {}
}, 1000);