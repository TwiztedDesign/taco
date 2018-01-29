import {USER_UPDATE} from "../utils/events";
import {ADD} from "../utils/events";
import {findKey} from '../utils/helpers.js';

const send = require('../utils/messenger.js').send;

class TacoData {
    constructor(){
        this._main = {};
        this._proxy = {};
        this._onChange = {
            set: function (target, prop, value) {
                target[prop] = value;
                send(USER_UPDATE, this._main);
                return true;
            }
        };
    }

    updateCB(){
        if(this._updateCB) {
            this._updateCB();
        }
    }

    onUpdate(cb){
        this._updateCB = cb;
    }

    _setValue(template, control, value){
        template = findKey(this._main, template);
        if(template){
            control = findKey(this._main[template], control);
        }
        if(template && control){
            this._main[template][control] = value;
            this._proxy[template][control] = value;
        }
    }

    _getValue(template, control){
        template = findKey(this._main, template);
        if(template){
            return this._main[template][findKey(this._main[template], control)];
        }
    }

    add(name, data){
        this._main[name] = data;
        this._proxy[name] = new Proxy(data, this._onChange);
        send(ADD,{
            channel : name,
            data    : data
        });
        return this._proxy[name];
    }

    show(template){
        this._setValue(template, "visibility", true);
    }
    hide(template){
        this._setValue(template, "visibility", false);
    }
    toggle(template){
        let visibility = this._getValue(template, 'visibility');
        if(visibility !== undefined){
            this._setValue(template, 'visibility', !visibility);
        }
    }
    clear(){
        this._main = {};
        this._proxy = {};
    }
}

export let tacoData = new TacoData();