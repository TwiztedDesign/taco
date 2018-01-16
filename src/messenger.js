let window = window || global.window;

function sendMessage(type, payload){
    (window || global.window).parent.postMessage(JSON.stringify({type : type, payload: payload}), '*');
}


module.exports = {
    send : sendMessage
};