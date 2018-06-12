import {send} from '../../utils/messenger.js';
import {GO} from '../../utils/events.js';
import {noop} from '../../utils/helpers';


function go(target, time){
    send(GO,{
        target  : target,
        time    : time
    });
}


module.exports = {
    go          : go,
    next        : noop,
    previous    : noop,
    home        : noop,
};
