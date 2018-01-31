import {send} from './utils/messenger.js';
import {READY} from './utils/events.js';
import {TOUCH} from './utils/events.js';
import {MOUSE_MOVE} from './utils/events.js';
import "../scripts/custom-elements-es5-adapter.exec";
import "./components/components.js";
import {tacoData} from './core/tacodata.js';
require('./utils/listener').start();
let api = require('./core/api.js');
require('./core/init').init();
import tacoElement from './core/tacoElement';


window.addEventListener('load', function(){
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


let taco = function(selector){
    return new tacoElement(selector);
};

taco.addTemplate = function(name, data){return tacoData.addTemplate(name, data);};
taco.onUpdate    = function(cb){return tacoData.onUpdate(cb);};
taco.go          = api.go;
taco.next        = api.next;
taco.previous    = api.previous;
taco.home        = api.home;
taco.show        = api.show;
taco.hide        = api.hide;
taco.toggle      = api.toggle;

module.exports = taco;
