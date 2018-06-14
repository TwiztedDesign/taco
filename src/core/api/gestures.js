import {send} from '../../utils/messenger';
import {TOUCH, MOUSE_MOVE, SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT, MOUSE_DRAG, BUBBLE_UP} from '../../utils/events';

const Hammer = require('hammerjs');

function onTouchStart(e){
    send(TOUCH, e.target.tagName);
}
function onTouchMove(e) {
    let mouseMoveTime = Date.now();
    if(mouseMoveTime - lastMouseMoveTime < 100) {

        direction.detect(e.touches[0].clientX, e.touches[0].clientY);
        var d = direction.getDirection();
        if(d){
            switch (d){
                case "l":
                    send(SWIPE_LEFT, e);
                    break;
                case "r":
                    send(SWIPE_RIGHT, e);
                    break;
                case "u":
                    send(SWIPE_UP, e);
                    break;
                case "d":
                    send(SWIPE_DOWN, e);
                    break;
            }
        }

    }
    lastMouseMoveTime = mouseMoveTime;
}
function onTouchEnd(){
    direction.clear();
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
        if(drag){
            send(MOUSE_DRAG);
            direction.detect(e.pageX, e.pageY);
            var d = direction.getDirection();
            if(d){
                switch (d){
                    case "l":
                        send(SWIPE_LEFT, {x : e.clientX, y : e.clientY});
                        break;
                    case "r":
                        send(SWIPE_RIGHT, {x : e.clientX, y : e.clientY});
                        break;
                    case "u":
                        send(SWIPE_UP, {x : e.clientX, y : e.clientY});
                        break;
                    case "d":
                        send(SWIPE_DOWN, {x : e.clientX, y : e.clientY});
                        break;
                }
            }
        }
    }
    lastMouseMoveTime = mouseMoveTime;
}


let drag = false;
function onMouseDown(e){
    drag = true;
    send(BUBBLE_UP,{
        event : 'mousedown',
        data  : {
            pageX : e.pageX,
            pageY : e.pageY,
            clientX : e.clientX,
            clientY : e.clientY,
        }
    });
}
function onMouseUp(e){
    drag = false;
    direction.clear();
    send(BUBBLE_UP,{
        event : 'mouseup',
        data  : {
            pageX : e.pageX,
            pageY : e.pageY,
            clientX : e.clientX,
            clientY : e.clientY,
        }
    });
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

    document.body.addEventListener('touchstart', onTouchStart);
    document.body.addEventListener('touchend', onTouchEnd);
    document.body.addEventListener('touchmove', onTouchMove);
    
    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener("mousedown", onMouseDown);
    document.body.addEventListener("mouseup", onMouseUp);

    // listen();

});


function listen(){
    if(!gesture) return;
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
    if(!gesture) return;
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

class Direction {
    constructor(){
        this.arr = [];
        this.threshold = 15;
        this.lastX = 0;
        this.lastY = 0;
    }

    add(direction){
        this.arr.unshift(direction);
        if(this.arr.length > this.threshold){
            this.arr.pop();
        }
    }

    clear() {
        this.arr = [];
        this.lastX = 0;
        this.lastY = 0;
    }

    detect(x, y){
        let deltaX = this.lastX - x,
            deltaY = this.lastY - y;

        //check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
            this.add('l');
        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
            this.add('r');
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
            this.add('u');
        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
            this.add('d');
        }
        this.lastX = x;
        this.lastY = y;

    }
    getDirection(){
        let dir = null;
        if(this.arr.length < this.threshold) return null;
        for(let i = 0 ; i < this.arr.length ; i++){
            if(dir && dir != this.arr[i]){
                dir = null;
                break;
            } else {
                dir = this.arr[i];
            }
        }
        return dir;
    }
}

const direction = new Direction();

module.exports = {
    on  : listen,
    off : stop
};
