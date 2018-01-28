let handlers = require('../core/handlers.js');


function messageHandler(message){
    let messageData = JSON.parse(message.data);
    let type = messageData.type;
    let handler = handlers[type];
    if(handler){
        handler(messageData.payload);
    }
}

module.exports = {
    start : function(){
        if(window && window.addEventListener){
            window.addEventListener('message', messageHandler);
        }
    }
};

