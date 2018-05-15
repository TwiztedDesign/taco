import {send} from './utils/messenger.js';
import {READY, TOUCH, MOUSE_MOVE, TACO_EVENT} from './utils/events.js';
import {tacoData} from './core/tacodata.js';
import * as api from './core/api';
import {start as startListener} from './utils/listener';
import {init as initTacoDom} from './core/init';
import tacoElement from './core/tacoElement';
import './core/defaultExpose';
import "./components/components.js";
import {findKey} from './utils/helpers';
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
taco.onEvent        = (template, cb) => {
    document.addEventListener(TACO_EVENT, function(event){
        if(cb){
            var key = findKey(event.detail, template);
            if(key){
                cb(event.detail[key]);
            }
        } else {
            cb = template;
            cb(event.detail);
        }
    });
};
taco.send           = (type, payload) => {
    send(type, payload);
};


module.exports = taco;