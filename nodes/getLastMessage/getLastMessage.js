module.exports = (RED) => {
    'use strict';

    const authorize = require('../libs/authorize');
    const getLastMessage = require('./func');
    
    const main = function(config){
        const node = this;
        RED.nodes.createNode(node, config);

        // console.log(config);
        console.log('new!!!!');
        node.on('input', async (msg) => {
            try {
                const auth = authorize(config.Credentials, config.AccessToken);
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