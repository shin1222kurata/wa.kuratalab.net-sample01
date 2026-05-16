WA.onInit().then(() => {
    // 画面下部にポップアップメッセージを表示する
    WA.ui.displayActionMessage({
        message: "倉田研究室のメタバース空間へようこそ！（スペースキーで閉じる）",
        type: "message", // "warning" にすると強調表示になります
        callback: () => {
            // ユーザーがスペースキーで閉じたあとの処理（空でもOK）
            console.log("メッセージが閉じられました");
        }
    });
});

console.log("案内係のクリーンチャットシステムが起動しました。");

// 案内係Botが近くにいるかを判定する変数
let isGuideBotNear = false;

// 1秒ごとに、自分の周りに「案内係」という名前のユーザー（Bot）がいるかを安全にスキャンする
// ※proximityMeeting（通話）を使わないため、ビープ音や円グラフは100%発生しません。
setInterval(async () => {
    try {
        // 1. 周辺にいるすべてのプレイヤーの情報を取得
        const players = await WA.room.getPlayers();
        
        // 2. その中に「案内係」または「isGuideBotタグ」を持つBotがいるか探す
        const bot = players.find(p => p.name === '案内係' || (p.state && p.state.isGuideBot));

        if (bot) {
            // 自分とBotの座標を取得
            const myPos = await WA.player.getPosition();
            
            // マス目（タイル）単位での直線の距離を計算
            const distanceX = Math.abs(myPos.x - bot.x);
            const distanceY = Math.abs(myPos.y - bot.y);
            
            // 3マス以内（会話範囲内）に入った場合の処理
            if (distanceX <= 3 && distanceY <= 3) {
                if (!isGuideBotNear) {
                    isGuideBotNear = true; // チャットの連続発火を防ぐロック
                    
                    console.log("案内係の会話範囲内に進入しました。メッセージを送信します。");

                    // 1. 画面左側のチャット欄（Timeline）にシステムメッセージとして表示
                    WA.chat.sendChatMessage('なにか私にできることはありますか？', '案内係');

                    // 2. 画面中央下にトーストポップアップを表示（チャット欄を閉じていても見える）
                    WA.ui.displayActionMessage({
                        message: "案内係：なにか私にできることはありますか？",
                        type: "message"
                    });
                }
            } else {
                // 3マスより離れたらロックを解除（再度近づいた時に喋れるようにする）
                if (isGuideBotNear) {
                    isGuideBotNear = false;
                }
            }
        } else {
            // マップ上にBot自体がいない場合も状態をリセット
            isGuideBotNear = false;
        }
    } catch (e) {
        // エラーが発生してもフリーズさせずに無視する（堅牢化）
        console.error("スキャン中にエラーが発生しました:", e);
    }
}, 1000); // 1秒ごとに距離を優しく監視