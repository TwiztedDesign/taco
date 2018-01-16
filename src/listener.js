import {UPDATE} from "./utils/events.js";

let tacoData = require('./tacodata.js');

let window = window || global.window;

function update(data){
    for(var template in tacoData.main) {
        var key = getKey(data, template);
        for(var control in tacoData.main[template]){
            if(data[key] && data[key].hasOwnProperty(control)){
                tacoData.main[template][control] = data[key][control];
            }
        }

    }
    tacoData.updateCB();
}

function getKey(data, keyToFind) {
    var keys = Object.keys(data);
    for(var i = 0 ; i < keys.length ; i++){
        if(keys[i].toLowerCase() === keyToFind.toLowerCase()){
            return keys[i];
        }
    }
}

var handlers = {};
handlers[UPDATE] = update;


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

