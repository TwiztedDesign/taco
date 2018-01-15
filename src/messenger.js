function sendMessage(w, type, payload){
    // var top = window;
    // for(var i = 0 ; i < 5 ; i++) {
    //     if(top.parent !== top){
    //         try{
    //             top.window.document;
    //             top = top.parent;
    //         } catch(e){
    //             break;
    //         }
    //     }
    //
    // }
    w.parent.postMessage(JSON.stringify({type : type, payload: payload}), '*');
}


module.exports = {
    send : sendMessage
};