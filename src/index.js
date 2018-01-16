import {send} from './messenger.js';
import {READY} from './utils/events.js';
let tacoData = require('./tacodata.js');
let api = require('./api.js');

window.onload = function(){
    send(READY);
};

module.exports = {
    addTemplate : tacoData.add,
    onUpdate    : tacoData.onUpdate,
    go          : api.go,
    next        : api.next,
    previous    : api.previous,
    home        : api.home
};