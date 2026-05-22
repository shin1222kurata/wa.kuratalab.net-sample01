let isChatOpen = false;
const chatUrl = 'https://shin1222kurata.github.io/wa.kuratalab.net-sample01/ai-chat.html?v=4';

console.log("=== 案内係スクリプト（ウェルカム挨拶＆離脱対応版） ===");

// ==========================================
// 【追加】入室時のウェルカムメッセージ
// ==========================================
WA.onInit().then(() => {
    // 画面左下のチャット欄にシステムメッセージとして表示させます
    WA.chat.sendChatMessage('倉田研究室のメタバース空間へようこそ！', '案内係');
});
// ==========================================

// 1. 会話の輪に入ったときの処理
WA.player.proximityMeeting.onJoin().subscribe((players) => {
    const bot = players.find(p => p.name === '案内係');
    if (bot && !isChatOpen) {
        isChatOpen = true;
        WA.nav.openCoWebSite(chatUrl);
    }
});

// 2. 会話の輪から出たときの処理
WA.player.proximityMeeting.onLeave().subscribe(() => {
    if (isChatOpen) {
        isChatOpen = false;
        WA.nav.closeCoWebSite();
    }
});