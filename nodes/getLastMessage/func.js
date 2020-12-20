'use strict'

const {google} = require('googleapis');

//最新を取得
module.exports = async (auth, q) => {

    const gmail = google.gmail({version: 'v1', auth});
    
    const resList = await gmail.users.messages.list({
        userId: 'me',
        q: q
    });

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
//     'use strict';

//         const getLastMessage = async (auth, q) => {
//             const gmail = google.gmail({version: 'v1', auth});
        
//             const resList = await gmail.users.messages.list({userId: 'me', q: q});
//             const lastMessage = resList.data.messages[0];
          
//             const resMes = await gmail.users.messages.get({
//               userId: 'me',
//               id: lastMessage.id,
//               format: 'FULL'
//             });
          
//             const buf = new Buffer.from(resMes.data.payload.body.data, 'base64');
//             const str = buf.toString();
        
//             return str;
//         }

//         node.on('input', async (msg) => {
//             const mes = msg.payload;
            
//             try {
//                 const auth = authorize(config.Credentials, config.AccessToken);
//                 const mailMsg = await getLastMessage(auth, config.Q);
//                 msg.payload = mailMsg;
//                 node.send(msg);

//             } catch (error) {
//                 console.log(error);
//             }

//         });
//     }

//     RED.nodes.registerType('GetLastMessage', main);
// }