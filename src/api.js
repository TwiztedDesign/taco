import {send} from './messenger.js';
import {GO} from './utils/events.js';


function noop(){}

function go(target, time){
    send(GO,{
        target : target,
        time : time
    });
}

module.exports = {
    go          : go,
    next        : noop(),
    previous    : noop(),
    home        : noop()
};
