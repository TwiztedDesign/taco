let activeHandler;

function observe(handler) {
    activeHandler = handler;
    handler();
    activeHandler = undefined;
}

function observableProp (provider, prop) {
    let value = provider[prop];
    provider._handlers = [];
    Object.defineProperty(provider, prop, {
        get () {
            if (activeHandler) {
                provider._handlers[prop] = activeHandler;
            }
            return value;
        },
        set (newValue) {
            value = newValue;
            const handler = provider._handlers[prop];
            if (handler) {
                activeHandler = handler;
                handler();
                activeHandler = undefined;
            }
        }
    });
}

function observable (provider) {
    var props = Object.getOwnPropertyNames(provider);
    for (let i = 0; i < props.length; i++) {
        observableProp(provider, props[i]);
        if (typeof provider[props[i]] === 'object') {
            observable(provider[props[i]]);
        }
    }
    return provider;
}

module.exports = {
    observe : observe,
    observable : observable
};