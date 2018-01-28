import {send} from './utils/messenger.js';
import {READY} from './utils/events.js';
import {TOUCH} from './utils/events.js';
import {MOUSE_MOVE} from './utils/events.js';
import "../scripts/custom-elements-es5-adapter.exec";
import "./components/components.js";
require('./utils/listener').start();
const tacoData = require('./core/tacodata.js');
const api = require('./core/api.js');

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
    addTemplate : tacoData.add,
    onUpdate    : tacoData.onUpdate,
    go          : api.go,
    next        : api.next,
    previous    : api.previous,
    home        : api.home,
    show        : api.show,
    hide        : api.hide,
    toggle      : api.toggle
};