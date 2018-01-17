import {send} from '../utils/messenger.js';
import {GO} from '../utils/events.js';
let tacoData = require('./tacodata.js');


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
    home        : noop(),
    show        : tacoData.show,
    hide        : tacoData.hide,
    toggle      : tacoData.toogle
};
