import {TACO_EVENT, OUTGOING_EVENT} from '../../utils/events.js';
import {findKey} from '../../utils/helpers';
import {send} from '../../utils/messenger';
let timeouts = {};


module.exports = {

    onEvent : (arg1, arg2, arg3) => {

        let template, callback, options;
        switch (arguments.length){
            case 0:
                throw new Error("onEvent was called without arguments");
            case 1:
                callback = arg1;
                break;
            default:
                if(typeof arg1 === 'string'){
                    template = arg1;
                    callback = arg2;
                    options = arg3 || {};
                } else if(typeof arg1 === 'function'){
                    callback = arg1;
                    options = arg2 || {};
                }
                break;
        }

        function runCB(data){
            if(options.consolidate){
                clearTimeout(timeouts[template || '__global_event__']);
                timeouts[template || '__global_event__'] = setTimeout(function(){
                    callback(data);
                }, 50);
            } else {
                callback(data);
            }
        }

        function listener(event){
            if(template){
                let key = findKey(event.detail, template);
                if(key){
                    runCB(event.detail[key]);
                }
            } else {
                runCB(event.detail);
            }
        }

        document.addEventListener(TACO_EVENT, listener);
    },

    emit : (payload) => {
        send(OUTGOING_EVENT, payload);
    }

};

