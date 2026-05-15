// WorkAdventureのシステム準備が整うのを待つ
WA.onInit().then(() => {
    
    // 入室した人にウェルカムメッセージを送る
    WA.chat.sendChatMessage(
        "システムの接続に成功しました．これはサンプルの空間です", 
        "システム管理者：倉田伸"
    );

});