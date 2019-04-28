const clova = require('@line/clova-cek-sdk-nodejs');
const express = require('express');

const clovaSkillHandler = clova.Client
    .configureSkill()

    //起動時に喋る
    .onLaunchRequest(responseHelper => {
        responseHelper.setSimpleSpeech({
            lang: 'ja',
            type: 'PlainText',
            value: 'これから部活動紹介をします．',
        });
    })

    //ユーザーからの発話が来たら反応する箇所
    .onIntentRequest(async responseHelper => {
        const intent = responseHelper.getIntentName();
        const sessionId = responseHelper.getSessionId();
        const slots = responseHelper.getSlots();
        responseHelper.setSimpleSpeech({
            lang: 'ja',
            type: 'PlainText',
            value: '電子情報研究部，(あいけん)はプログラミングやいろんな技術を用いていろんなものを作ったり，それらについて勉強している人が集まる部活です．わからないところや基本的なプログラムの書き方は聞いたら先輩方が教えてくれるので一年生のうちからプログラムを書いて作品を作れるようになります．また，他にもいろんなイベントを実施したり，様々なコンテストなどに参加できる機会がたくさんあります．活動日は月曜日から金曜日ですが部活にいつ来るかは自由です．pcも部室に多数用意されているのでパソコンを持っていない人も大丈夫！．プログラミング，ものづくりなどに興味がある人の入部待ってます！',
        });
    })

    //終了時
    .onSessionEndedRequest(responseHelper => {
        responseHelper.setSimpleSpeech({
            lang: 'ja',
            type: 'PlainText',
            value: 'ご静聴ありがとうございました',
        });
        const sessionId = responseHelper.getSessionId();
    })
    .handle();


const app = new express();
const port = process.env.PORT || 3000;

//リクエストの検証を行う場合。環境変数APPLICATION_ID(値はClova Developer Center上で入力したExtension ID)が必須
const clovaMiddleware = clova.Middleware({applicationId: 'com.iken.ishikawa_nct'});
app.post('/clova', clovaMiddleware, clovaSkillHandler);

app.listen(port, () => console.log(`Server running on ${port}`));