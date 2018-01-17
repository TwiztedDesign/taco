import {send} from './utils/messenger.js';
import {READY} from './utils/events.js';
require('./utils/listener').start();
let tacoData = require('./core/tacodata.js');
let api = require('./core/api.js');

window.onload = function(){
    send(READY);
};

module.exports = {
    addTemplate : tacoData.add,
    onUpdate    : tacoData.onUpdate,
    go          : api.go,
    next        : api.next,
    previous    : api.previous,
    home        : api.home,
    show        : api.show,
    hide        : api.hide,
    toggle      : api.toggle,
};