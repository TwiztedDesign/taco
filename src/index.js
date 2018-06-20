import {send, request} from './utils/messenger.js';
import {READY} from './utils/events.js';
import {tacoData} from './core/tacodata.js';
import {start as startListener} from './utils/listener';
import {init as initTacoDom} from './core/init';
import tacoElement from './core/tacoElement';
import './core/defaultExpose';
import "./components/components.js";
import {isMobile, isController, extend} from './utils/helpers';
import * as eventsApi from './core/api/events';
import * as playerApi from './core/api/player';
import * as visibilityApi from './core/api/visibility';
require('./core/interactionEvents');

startListener();
initTacoDom();

window.addEventListener('load', () => {
    send(READY);
});


let taco = (selector) => {
    return new tacoElement(selector);
};

taco.addTemplate    = (name, data) => {return tacoData.addTemplate(name, data);};
taco.onUpdate       = (cb) => {return tacoData.onUpdate(cb);};
taco.getPages       = () => {return tacoData.getPages();};
taco.getQueryParams = () => {return tacoData.getQueryParams();};
taco.send           = (type, payload) => { send(type, payload); };
taco.request        = (type, payload, cb) => { request(type, payload, cb); };
taco.isMobile       = isMobile;
taco.isController   = isController;
taco.extend         = (name, extension) => { taco[name] = extension; };
taco.define         = (name, element) => { customElements.define(name, element); };

extend(taco, playerApi);
extend(taco, visibilityApi);
extend(taco, eventsApi);


module.exports = taco;