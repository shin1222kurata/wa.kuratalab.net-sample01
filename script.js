let isChatOpen = false;
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
                    
                    let myName = '不明なユーザー';
                    if (WA.player && WA.player.name) {
                        myName = WA.player.name;
                    }
                    
                    const chatUrl = baseUrl + "?name=" + encodeURIComponent(myName);
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