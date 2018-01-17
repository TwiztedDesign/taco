import {USER_UPDATE} from "../utils/events";
import {ADD} from "../utils/events";
import {findKey} from '../utils/helpers.js';
let send = require('../utils/messenger.js').send;


let main = {}, proxy = {};
let updateCB;

var onChange = {
    set : function(target, prop, value){
        target[prop] = value;
        send(USER_UPDATE, main);
        return true;
    }
};

function addTemplate(name, data){
    main[name] = data;
    proxy[name] = new Proxy(data, onChange);
    send(ADD,{
        channel : name,
        data    : data
    });
    return proxy[name];
}

function setValue(template, control, value){
    template = findKey(main, template);
    if(template){
        control = findKey(main[template], control);
    }
    if(template && control){
        main[template][control] = value;
        proxy[template][control] = value;
    }
}
function getValue(template, control){
    template = findKey(main, template);
    if(template){
        return main[template][findKey(main[template], control)];
    }
}

function show(template){
    setValue(template, "visibility", true);
}
function hide(template){
    setValue(template, "visibility", false);
}
function toggle(template){
    var visibility = getValue(template, 'visibility');
    if(visibility !== undefined){
        setValue(template, 'visibility', !visibility);
    }
}





module.exports = {
    main        : main,
    proxy       : proxy,
    onUpdate    : function(cb){ updateCB = cb; },
    updateCB    : function(){if(updateCB){ updateCB(); }},
    add         : addTemplate,
    show        : show,
    hide        : hide,
    toggle      : toggle

};
