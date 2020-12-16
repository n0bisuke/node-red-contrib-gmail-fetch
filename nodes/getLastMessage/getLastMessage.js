module.exports = (RED) => {
    'use strict';

    const {google} = require('googleapis');
    
    const main = function(config){
        const node = this;
        RED.nodes.createNode(node, config);

        console.log(config);

        //認証関数
        const authorize = () => {
            const credentials = JSON.parse(config.Credentials);
            const {client_secret, client_id, redirect_uris} = credentials.installed;
            const oAuth2Client = new google.auth.OAuth2(
                client_id,
                client_secret,
                redirect_uris[0]
            );
            oAuth2Client.setCredentials(JSON.parse(config.AccessToken));

            return oAuth2Client;
        }

        //最新を取得
        const getLastMessage = async (auth, q) => {
            const gmail = google.gmail({version: 'v1', auth});
        
            const resList = await gmail.users.messages.list({userId: 'me', q: q});
            const lastMessage = resList.data.messages[0];
          
            const resMes = await gmail.users.messages.get({
              userId: 'me',
              id: lastMessage.id,
              format: 'FULL'
            });
          
            const buf = new Buffer.from(resMes.data.payload.body.data, 'base64');
            const str = buf.toString();
        
            return str;
        }

        node.on('input', async (msg) => {
            const mes = msg.payload;
            
            try {
                const auth = authorize();
                const mailMsg = await getLastMessage(auth, config.Q);
                msg.payload = mailMsg;
                node.send(msg);

            } catch (error) {
                console.log(error);
            }

        });
    }

    RED.nodes.registerType('GetLastMessage', main);
}