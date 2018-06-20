import {send} from '../utils/messenger';
import {TOUCH, MOUSE_MOVE, BUBBLE_UP} from '../utils/events';


function touchesToJson(touches){
    if(!touches) return touches;
    var touchArray = [];

    for (var i = 0; i < touches.length; i++) {
        var touch = touches[i];
        touchArray.push({
            clientX : touch.clientX,
            clientY : touch.clientY,
            pageX   : touch.pageX,
            pageY   : touch.pageY
        });
    }
    return touchArray;
}

function bubbleUpMouseEvent(e){
    send(BUBBLE_UP,{
        event : e.type,
        data  : {
            pageX : e.pageX,
            pageY : e.pageY,
            clientX : e.clientX,
            clientY : e.clientY,
            touches : touchesToJson(e.touches),
            targetTouches : touchesToJson(e.targetTouches),
            changedTouches : touchesToJson(e.changedTouches)
        }
    });
}


function onTouchStart(e){
    send(TOUCH, e.target.tagName);
}


let lastMouseMoveTime = 0;
function onMouseMove(e){
    send(BUBBLE_UP,{
        event : 'mousemove',
        data  : {
            pageX : e.pageX,
            pageY : e.pageY,
            clientX : e.clientX,
            clientY : e.clientY,
        }
    });
    let mouseMoveTime = Date.now();
    if(mouseMoveTime - lastMouseMoveTime < 100) {
        send(MOUSE_MOVE);
    }
    lastMouseMoveTime = mouseMoveTime;
}



window.addEventListener('load', () => {


    document.body.addEventListener('touchstart', onTouchStart);
    document.body.addEventListener('mousemove', onMouseMove);


    document.body.addEventListener('touchstart', bubbleUpMouseEvent);
    document.body.addEventListener('touchend', bubbleUpMouseEvent);
    document.body.addEventListener('touchmove', bubbleUpMouseEvent);

    document.body.addEventListener('mousemove', bubbleUpMouseEvent);
    document.body.addEventListener("mousedown", bubbleUpMouseEvent);
    document.body.addEventListener("mouseup", bubbleUpMouseEvent);


});
