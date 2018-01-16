let tacoData = require('./tacodata.js');

function sendMessage(w, type, payload){
    w.parent.postMessage(JSON.stringify({type : type, payload: payload}), '*');
}



function update(data){
    for(var template in tacoData.main) {
        var key = getKey(data, template);
        for(var control in tacoData.main[template]){
            if(data[key] && data[key].hasOwnProperty(control)){
                tacoData.main[template][control] = data[key][control];
            }
        }

    }

    if(tacoData.updateCB){
        tacoData.updateCB();
    }
}

function getKey(data, keyToFind) {
    var keys = Object.keys(data);
    for(var i = 0 ; i < keys.length ; i++){
        if(keys[i].toLowerCase() === keyToFind.toLowerCase()){
            return keys[i];
        }
    }
}

var handlers = {
    'taco-update' : update
};


function messageHandler(message){
    var messageData = JSON.parse(message.data);
    var type = messageData.type;
    var handler = handlers[type];
    if(handler){
        handler(messageData.payload);
    }
}


module.exports = {
    send : sendMessage,
    receive : messageHandler
};