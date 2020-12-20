'use strict';

const {google} = require('googleapis');
process.env.GOOGLE_CREDENTIALS='{"installed":{"client_id":"37970816906-2815k5emnjbh549rheor2m8djpb4jf42.apps.googleusercontent.com","project_id":"quickstart-1553848055236","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"Eebyz1DXNG3LmL8NowJto1a7","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}'
process.env.GOOGLE_TOKEN='{"access_token":"ya29.a0AfH6SMBWl1S6Hcl4p8vW3cesy8-YfreXeO6oVXX97YWIFaYpUK2KTKrknaBGiiYEHtLJ00ghsCrh-N6Yz6G5t4S77vdfuzF0B_sx_2z9VK83MaPu2JaotRhxYBX1J0siJAQln2trPGtExMc8fYHsbZsPRl66OBcjmRPmt8NGcCg","refresh_token":"1//0esJp31CzgN6jCgYIARAAGA4SNwF-L9IrtZ-horqx-Kz2NDyZglOKPmjxhsnzhhuN9LEVfWhbS7-MLX1mI0l1xYPtnGbUgKuBJQc","scope":"https://www.googleapis.com/auth/gmail.addons.current.message.readonly https://www.googleapis.com/auth/gmail.addons.current.message.metadata https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.addons.current.message.action https://www.googleapis.com/auth/gmail.modify https://mail.google.com/","token_type":"Bearer","expiry_date":1608126027073}'

//認証関数
const authorize = () => {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    // console.log(credentials);
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );
    oAuth2Client.setCredentials(JSON.parse(process.env.GOOGLE_TOKEN));

    return oAuth2Client;
}

const makeBody = (params) => {
    params.subject = new Buffer.from(params.subject).toString('base64'); //日本語対応
    const str = `Content-Type: text/plain; charset=\"UTF-8\"\n`
              + `MIME-Version: 1.0\n`
              + `Content-Transfer-Encoding: 7bit\n`
              + `to: ${params.to} \n`
              + `from: ${params.from} \n`
              + `subject: =?UTF-8?B?${params.subject}?= \n\n`
              +  params.message;
    return new Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
}

//メッセージ取得関数
const sendMessage = async (auth, raw) => {
    const gmail = google.gmail({version: 'v1', auth});

    const res = await gmail.users.messages.send({
        userId: 'me',
        resource: {raw: raw}
    });
    return res.data;
}

const main = async () => {
    const auth = authorize();
    
    const messageBody = `
    XXXX 様

    商品のご購入、誠にありがとうございます。
    ・Nefry BT x 1
    の商品を本日発送しましたのでご連絡差し上げます。

    こちらから配送状況をご確認頂けます。
    (このメール送信の時点では反映されていない可能性もあります)

    https://trackings.post.japanpost.jp/xxxxxxxxxx`;

    const params = {
        to: 'rsksound@gmail.com',
        from: 'hoge@hoge.com',
        subject: '件名(日本語可)',
        message: messageBody
    };

    const raw = makeBody(params);

    const msg = await sendMessage(auth, raw);
    console.log(msg);
}
main();