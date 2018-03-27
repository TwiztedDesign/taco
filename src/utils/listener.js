import * as handlers from '../core/handlers';


function messageHandler(message){
    let messageData = JSON.parse(message.data);
    let type = messageData.type;
    let handler = handlers[type];
    if(handler){
        handler(messageData.payload);
    }
}

module.exports = {
    start : () => {
        if(window && window.addEventListener){
            window.addEventListener('message', messageHandler, false);
        }
    }
};

