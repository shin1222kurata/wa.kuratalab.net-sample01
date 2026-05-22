let isChatOpen = false;
// ベースとなるGitHub PagesのURL
const baseUrl = 'https://shin1222kurata.github.io/wa.kuratalab.net-sample01/ai-chat.html';

setInterval(async () => {
    try {
        const players = await WA.room.getPlayers();
        const bot = players.find(p => p.name === '案内係' || (p.state && p.state.isGuideBot));

        if (bot) {
            const myPos = await WA.player.getPosition();
            const distanceX = Math.abs(myPos.x - bot.x);
            const distanceY = Math.abs(myPos.y - bot.y);
            
            if (distanceX <= 3 && distanceY <= 3) {
                if (!isChatOpen) {
                    isChatOpen = true;
                    // 【大改良】メタバース側で名前を取得し、URLの末尾にくっつける
                    let myName = '不明なユーザー';
                    if (WA.player && WA.player.name) {
                        myName = WA.player.name;
                    }
                    // URLを生成（例: .../ai-chat.html?name=sk）
                    const chatUrl = baseUrl + "?name=" + encodeURIComponent(myName);
                    
                    // セキュリティに引っかからない、最も安全な方法で開く
                    WA.nav.openCoWebSite(chatUrl);
                }
            } else {
                if (isChatOpen) {
                    isChatOpen = false;
                    WA.nav.closeCoWebSite();
                }
            }
        }
    } catch (e) {
        console.error("エラー:", e);
    }
}, 1000);