// import {init} from './init.js';
import {send} from './messenger.js';
import {receive} from './messenger.js';
var tacoData = require('./tacodata.js');

(function(w){


    // init(w);


    function sendMessage(type, payload){
        w.parent.postMessage(JSON.stringify({type : type, payload: payload}), '*');
    }



    var tacoData = {};
    var tacoProxyData = {};


    var api = {};
    var updateCB;

    var onChange = {
        set : function(target, prop, value){
            target[prop] = value;
            sendMessage('taco-user-update', tacoData);
            return true;
        }
    };


    api.ready = function(){
        sendMessage('taco-ready');
    };
    api.go = function(target, time){
        sendMessage('taco-go',{
            target : target,
            time : time
        });
    };

    api.next = function(){};
    api.previous = function(){};
    api.home = function(){};


    api.onUpdate = function(cb){
        updateCB = cb;
    };

    api.addTemplate = function(name, data){
        tacoData[name] = data;
        tacoProxyData[name] = new Proxy(data, onChange);
        sendMessage('taco-addtemplate',{
            channel : name,
            data    : data
        });
        return tacoProxyData[name];
    };


    function update(data){
        for(var template in tacoData) {
            var key = getKey(data, template);
            for(var control in tacoData[template]){
                if(data[key] && data[key].hasOwnProperty(control)){
                    tacoData[template][control] = data[key][control];
                }
            }

        }
        
        if(updateCB){
            updateCB();
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

    w.addEventListener('message', messageHandler);

    w.TACO = api;

    w.onload = api.ready;

})




//
// var tacoData = {};
// var tacoProxyData = {};
// var updateCB;

var top = window;
for(var i = 0 ; i < 5 ; i++) {
    if(top.parent !== top){
        try{
            top.parent.document;
            top = top.parent;
        } catch(e){
            break;
        }
    }

}

window.addEventListener('message', receive);

var onChange = {
    set : function(target, prop, value){
        target[prop] = value;
        send('taco-user-update', tacoData.main);
        return true;
    }
};



function addTemplate(name, data){
    tacoData.main[name] = data;
    tacoData.proxy[name] = new Proxy(data, onChange);
    send(top, 'taco-addtemplate',{
        channel : name,
        data    : data
    });
    return tacoData.proxy[name];
}

function onUpdate(cb){
    tacoData.updateCB = cb;
}

window.onload = function(){
    send(top, 'taco-ready');
};

module.exports = {
    addTemplate : addTemplate,
    onUpdate    : onUpdate,
};