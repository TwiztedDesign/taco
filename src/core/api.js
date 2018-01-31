import {send} from '../utils/messenger.js';
import {GO} from '../utils/events.js';
import {tacoData} from '../core/tacodata.js';


function noop(){}

function go(target, time){
    send(GO,{
        target  : target,
        time    : time
    });
}



module.exports = {
    go          : go,
    next        : noop(),
    previous    : noop(),
    home        : noop(),
    show        : function(template){return tacoData.show(template);},
    hide        : function(template){return tacoData.hide(template);},
    toggle      : function(template){return tacoData.toggle(template);}
};
