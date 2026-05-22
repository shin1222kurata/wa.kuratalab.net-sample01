let isChatOpen = false;
// キャッシュ対策を含めたシンプルなURL
const chatUrl = 'https://shin1222kurata.github.io/wa.kuratalab.net-sample01/ai-chat.html?v=4';

console.log("=== 案内係スクリプト（離れたら確実に閉じる版） ===");

// 1. 会話の輪に入ったときの処理
WA.player.proximityMeeting.onJoin().subscribe((players) => {
    // 相手が案内係かどうかを確認して開く
    const bot = players.find(p => p.name === '案内係');
    if (bot && !isChatOpen) {
        isChatOpen = true;
        WA.nav.openCoWebSite(chatUrl);
    }
});

// 2. 会話の輪から出たときの処理
WA.player.proximityMeeting.onLeave().subscribe(() => {
    // 誰が離れたかにかかわらず、輪が崩れたらとにかく画面を閉じる
    if (isChatOpen) {
        isChatOpen = false;
        WA.nav.closeCoWebSite();
    }
});

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