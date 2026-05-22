let isChatOpen = false;
const baseUrl = 'https://shin1222kurata.github.io/wa.kuratalab.net-sample01/ai-chat.html';

console.log("=== 案内係スクリプト起動（動くBOT追従版） ===");

// 1. 会話の輪（白い円）に誰かが入ってきたときの処理
WA.player.proximityMeeting.onJoin().subscribe((players) => {
    // 輪に入ってきたプレイヤーの中に「案内係」がいるかチェック
    const bot = players.find(p => p.name === '案内係');
    
    if (bot && !isChatOpen) {
        console.log("✅ 案内係が会話の輪に入りました！");
        isChatOpen = true;
        
        let myName = '不明なユーザー';
        if (WA.player && WA.player.name) {
            myName = WA.player.name;
        }
        
        const chatUrl = baseUrl + "?name=" + encodeURIComponent(myName);
        WA.nav.openCoWebSite(chatUrl);
    }
});

// 2. 会話の輪から出たときの処理
WA.player.proximityMeeting.onLeave().subscribe((players) => {
    // 輪から離れた（または自分が離れた）プレイヤーの中に案内係がいるかチェック
    const botLeft = players.find(p => p.name === '案内係');
    
    if (botLeft && isChatOpen) {
        console.log("🚪 案内係との会話の輪から出ました");
        isChatOpen = false;
        WA.nav.closeCoWebSite();
    }
});