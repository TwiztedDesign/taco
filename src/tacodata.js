import {USER_UPDATE} from "./utils/events";
import {ADD} from "./utils/events";
let send = require('./messenger.js').send;


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


module.exports = {
    onUpdate : function(cb){ updateCB = cb; },
    updateCB : updateCB,
    add      : addTemplate,
    main     : main,
    proxy    : proxy,

};
