let window = window || global.window;


function sendMessage(type, payload){
    let w = (window || global.window);
    if(w && w.parent){
        w.parent.postMessage(JSON.stringify({type : type, payload: payload}), '*');
    }
}

module.exports = {
    send : sendMessage
};