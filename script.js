let currentCoWebsite = null;
let isChatOpen = false;
// ご自身のGitHub PagesのURL
const chatUrl = 'https://shin1222kurata.github.io/wa.kuratalab.net-sample01/ai-chat.html';

// 距離判定（1秒に1回チェック）
setInterval(async () => {
    try {
        const players = await WA.room.getPlayers();
        const bot = players.find(p => p.name === '案内係' || (p.state && p.state.isGuideBot));

        if (bot) {
            const myPos = await WA.player.getPosition();
            const distanceX = Math.abs(myPos.x - bot.x);
            const distanceY = Math.abs(myPos.y - bot.y);
            
            // 3マス以内に入った場合の処理
            if (distanceX <= 3 && distanceY <= 3) {
                if (!isChatOpen) {
                    isChatOpen = true;
                    // 最新のAPI仕様に合わせて、画面を開きつつ「名前取得の権限（true）」を付与します
                    currentCoWebsite = await WA.nav.openCoWebSite(chatUrl, true);
                }
            } else {
                // 離れたら閉じる処理
                if (isChatOpen) {
                    isChatOpen = false;
                    // 最新のAPI仕様（オブジェクトから直接閉じる）で安全に画面を消去します
                    if (currentCoWebsite && typeof currentCoWebsite.close === 'function') {
                        currentCoWebsite.close();
                        currentCoWebsite = null;
                    } else if (typeof WA.nav.closeCoWebSite === 'function') {
                        // 古いバージョンのWorkAdventure向けの保険
                        WA.nav.closeCoWebSite();
                    }
                }
            }
        }
    } catch (e) {
        console.error("距離判定または画面開閉のエラー:", e);
    }
}, 1000);