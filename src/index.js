import {send, request} from './utils/messenger.js';
import {READY, TOUCH, MOUSE_MOVE, TACO_EVENT} from './utils/events.js';
import {tacoData} from './core/tacodata.js';
import * as api from './core/api';
import {start as startListener} from './utils/listener';
import {init as initTacoDom} from './core/init';
import tacoElement from './core/tacoElement';
import './core/defaultExpose';
import "./components/components.js";
import {findKey, isMobile, isController} from './utils/helpers';
startListener();
initTacoDom();

window.addEventListener('load', () => {
    send(READY);

    function onTouch(e){
        send(TOUCH, e.target.tagName);
    }
    let lastMouseMoveTime = 0;
    function onMouseMove(){
        let mouseMoveTime = Date.now();
        if(mouseMoveTime - lastMouseMoveTime < 100) {
            send(MOUSE_MOVE);
        }
        lastMouseMoveTime = mouseMoveTime;

    }
    document.body.addEventListener('touchstart', onTouch);
    document.body.addEventListener('mousemove', onMouseMove);
});


let taco = (selector) => {
    return new tacoElement(selector);
};

taco.addTemplate    = (name, data) => {return tacoData.addTemplate(name, data);};
taco.onUpdate       = (cb) => {return tacoData.onUpdate(cb);};
taco.go             = api.go;
taco.next           = api.next;
taco.previous       = api.previous;
taco.home           = api.home;
taco.show           = api.show;
taco.hide           = api.hide;
taco.toggle         = api.toggle;
taco.getPages       = () => {return tacoData.getPages();};
taco.getQueryParams = () => {return tacoData.getQueryParams();};
taco.onEvent2        = (template, cb) => {
    document.addEventListener(TACO_EVENT, function(event){
        if(cb){
            var key = findKey(event.detail, template);
            if(key){
                cb(event.detail[key]);
            }
        } else {
            template(event.detail);
        }
    });
};

var timeouts = {};

taco.onEvent       = (arg1, arg2, arg3) => {


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
            var key = findKey(event.detail, template);
            if(key){
                runCB(event.detail[key]);
            }
        } else {
            runCB(event.detail);
        }
    }

    document.addEventListener(TACO_EVENT, listener);
};


taco.send           = (type, payload) => { send(type, payload); };
taco.request        = (type, payload, cb) => { request(type, payload, cb); };
taco.isMobile       = isMobile;
taco.isController   = isController;
taco.extend         = (name, extension) => {
    taco[name] = extension;
};
taco.define         = (name, element) => {
    customElements.define(name, element);
};




module.exports = taco;