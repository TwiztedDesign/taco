import {UPDATE} from "./events.js";
import {findKey} from './helpers.js';
let tacoData = require('../core/tacodata.js');


let window = window || global.window;

function update(data){
    for(var template in tacoData.main) {
        var key = findKey(data, template);
        for(let item in data[key]){
            var mainKey = findKey(tacoData.main, key);
            tacoData.main[mainKey][item] = data[key][item];
        }
    }
    tacoData.updateCB();
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

