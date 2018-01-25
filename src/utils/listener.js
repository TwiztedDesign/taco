let handlers = require('../core/handlers.js');


function messageHandler(message){
    var messageData = JSON.parse(message.data);
    var type = messageData.type;
    var handler = handlers[type];
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

