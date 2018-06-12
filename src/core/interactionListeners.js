import {send} from '../utils/messenger';
import {TOUCH, MOUSE_MOVE, SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} from '../utils/events.js';

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


function onSwipeUp(){
    send(SWIPE_UP);
}
function onSwipeDown(){
    send(SWIPE_DOWN);
}
function onSwipeLeft(){
    send(SWIPE_LEFT);
}
function onSwipeRight(){
    send(SWIPE_RIGHT);
}


window.addEventListener('load', () => {

    var gesture = new Hammer(document.body);
    gesture.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    document.body.addEventListener('touchstart', onTouch);
    document.body.addEventListener('mousemove', onMouseMove);
    gesture.on('swipeup', onSwipeUp);
    gesture.on('swipedown', onSwipeDown);
    gesture.on('swipeleft', onSwipeLeft);
    gesture.on('swiperight', onSwipeRight);

});
