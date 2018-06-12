import {send} from '../../utils/messenger';
import {TOUCH, MOUSE_MOVE, SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} from '../../utils/events';

const Hammer = require('hammerjs');

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


const gestureListeners = {
    swipe : {
        swipeup : () => {
            send(SWIPE_UP);
        },
        swipedown : () => {
            send(SWIPE_DOWN);
        },
        swipeleft : () => {
            send(SWIPE_LEFT);
        },
        swiperight : () => {
            send(SWIPE_RIGHT);
        }
    }
};
const activeListeners = {};

let gesture;

window.addEventListener('load', () => {

    gesture = new Hammer(document.body);
    gesture.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    document.body.addEventListener('touchstart', onTouch);
    document.body.addEventListener('mousemove', onMouseMove);

    listen();

});


function listen(){
    for(let category in gestureListeners){
        if(typeof gestureListeners[category] === 'function' && !activeListeners[category]){
            gesture.on(category, gestureListeners[category]);
            activeListeners[category] = true;
        }
        else if(typeof gestureListeners[category] === 'object'){
            for(let listener in gestureListeners[category]){
                if((!activeListeners[category] || !activeListeners[category][listener])){
                    gesture.on(listener, gestureListeners[category][listener]);
                    activeListeners[category] = activeListeners[category] || {};
                    activeListeners[category][listener] = true;
                }

            }
        }
    }
}

function stop(event){
    if(Array.isArray(event)){
        event.forEach(function(e){
            stop(e);
        });
    } else {
        var split = event.split(/\s+/);
        if(split.length > 1){
            stop(split);
        }
    }
    for(let category in gestureListeners){
        if(typeof gestureListeners[category] === 'function'){
            if(!event || event === category){
                gesture.off(category, gestureListeners[category]);
                activeListeners[category] = false;
            }

        }
        else if(typeof gestureListeners[category] === 'object'){
            for (let listener in gestureListeners[category]) {
                if(!event || category === event || listener === event) {
                    gesture.off(listener, gestureListeners[category][listener]);
                    activeListeners[category] = activeListeners[category] || {};
                    activeListeners[category][listener] = false;
                }
            }

        }
    }
}

module.exports = {
    on  : listen,
    off : stop
};
