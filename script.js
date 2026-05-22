let isChatOpen = false;
// キャッシュ対策を含めたシンプルなURL
const chatUrl = 'https://shin1222kurata.github.io/wa.kuratalab.net-sample01/ai-chat.html?v=3';

console.log("=== 案内係スクリプト（シンプル・名前取得なし版） ===");

WA.player.proximityMeeting.onJoin().subscribe((players) => {
    const bot = players.find(p => p.name === '案内係');
    if (bot && !isChatOpen) {
        isChatOpen = true;
        WA.nav.openCoWebSite(chatUrl);
    }
});

WA.player.proximityMeeting.onLeave().subscribe((players) => {
    const botLeft = players.find(p => p.name === '案内係');
    if (botLeft && isChatOpen) {
        isChatOpen = false;
        WA.nav.closeCoWebSite();
    }
});