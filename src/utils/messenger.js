import {uuid} from './helpers';
let window = window || global.window;
const REQUEST_TIMEOUT = 20000;

function sendMessage(type, payload){
    var message = {
        type : type,
        payload: payload,
    };
    postMessage(message);
}

function request(type, payload, cb){
    var cid = uuid();
    payload._cid = cid;
    var message = {
        type : type,
        payload: payload,
    };
    var timeout;
    var handler = function(message){
        message = JSON.parse(message.data);
        if(message.cid === cid){
            removeHandler();
            cb(message);
        }
    };
    var removeHandler = function(){
        clearTimeout(timeout);
        window.removeEventListener('message', handler, false);
    };

    window.addEventListener('message', handler, false);
    timeout = setTimeout(removeHandler, REQUEST_TIMEOUT);

    postMessage(message);
}


function postMessage(message){
    let w = (window || global.window);
    if(w && w.parent){
        w.parent.postMessage(JSON.stringify(message), '*');
    }
}

module.exports = {
    send : sendMessage,
    request : request
};