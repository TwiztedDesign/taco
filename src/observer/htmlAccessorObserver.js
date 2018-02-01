import {trim} from '../utils/helpers';
import {getByPath, setByPath} from '../utils/helpers';

function getExposed(provider, prop){
    if(provider.expose){
        return typeof provider.expose()[prop] === 'object'? provider.expose()[prop].path : provider.expose()[prop];
    }
}

function stringifyPath(path){
    let str = '';
    for (let i = 0; i < path.length; i++) {
        str += (trim(path[i],"_") + '.');
    }
    return str;
}

function observePrimitive(provider, prop, path, dispatcher){
    let value = provider[prop];
    let pathString = stringifyPath(path);
    let exposedPath = getExposed(provider, prop);
    Object.defineProperty(provider, prop, {
        get () {
            if(exposedPath){
              return getByPath(provider,exposedPath);
            }
            return value;
        },
        set (newValue) {
            if(newValue !== provider[prop]){
                if(dispatcher){
                    let event = 'taco-change-' + pathString + trim(prop, "_");
                    dispatcher(event, { detail: {value : newValue}});
                    dispatcher('taco-change', { detail: {value : newValue, property : prop, path : path}});
                }
                if(exposedPath){
                    setByPath(provider, exposedPath, newValue);
                } else {
                    value = newValue;
                }
            }
        }
    });
}

function observeObject(provider, path, dispatcher){
    path = path || [];
    let props = Object.getOwnPropertyNames(provider);
    for (let i = 0; i < props.length; i++) {

        if (typeof provider[props[i]] === 'object') {
            path.push(props[i]);
            observeObject(provider[props[i]], path.slice(), dispatcher);
        } else {
            observePrimitive(provider, props[i], path.slice(), dispatcher);
        }
    }
}

module.exports = {
    observe : observeObject,
};