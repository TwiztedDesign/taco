import {send} from './utils/messenger.js';
import {READY} from './utils/events.js';
import {TOUCH} from './utils/events.js';
import {MOUSE_MOVE} from './utils/events.js';
import "../scripts/custom-elements-es5-adapter.exec";
import "./components/components.js";
import {tacoData} from './core/tacodata.js';
require('./utils/listener').start();
let api = require('./core/api.js');
import {observable, observe} from './observer/accessorObserver';

window.onload = function(){
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
};

module.exports = {
    addTemplate : tacoData.addTemplate,
    onUpdate    : tacoData.onUpdate,
    go          : api.go,
    next        : api.next,
    previous    : api.previous,
    home        : api.home,
    show        : api.show,
    hide        : api.hide,
    toggle      : api.toggle,
    observe     : observe,
    observable  : observable,
};