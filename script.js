// WorkAdventureのシステム準備が整うのを待つ
WA.onInit().then(() => {
    
    // 画面の右上に緑色のトースト通知（ポップアップ）を出す
    WA.ui.openToast("メタバース空間へようこそ！ここはサンプルの空間です。", {
        // 表示位置（top, bottom と left, center, right の組み合わせ）
        vertical: "top",
        horizontal: "right",
        
        // メッセージの種類（success:緑, warning:オレンジ, error:赤, info:青）
        type: "success",
        
        // 何秒表示するか（ミリ秒。5000なら5秒で消える）
        timeout: 5000 
    });

});