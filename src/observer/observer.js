//Leaks memory
const observers = new WeakMap();
const queuedObservers = new Set();
let currentObserver;


function observable (obj) {
    observers.set(obj, new Map());
    return new Proxy(obj, {get, set});
}

function get (target, key, receiver) {
    const result = Reflect.get(target, key, receiver);
    if (currentObserver) {
        registerObserver(target, key, currentObserver);
        if (typeof result === 'object') {
            const observableResult = observable(result);
            Reflect.set(target, key, observableResult, receiver);
            return observableResult;
        }
    }
    return result;
}
function set (target, key, value, receiver) {
    const observersForKey = observers.get(target).get(key);
    if (observersForKey) {
        observersForKey.forEach(queueObserver);
    }
    return Reflect.set(target, key, value, receiver);
}
function registerObserver (target, key, observer) {
    let observersForKey = observers.get(target).get(key);
    if (!observersForKey) {
        observersForKey = new Set();
        observers.get(target).set(key, observersForKey);
    }
    observersForKey.add(observer);
}
/*********************************************************/
function observe (fn) {
    queueObserver(fn);
}

/* adds the observer to the queue and
 ensures that the queue will be executed soon */
function queueObserver (observer) {
    if (queuedObservers.size === 0) {
        Promise.resolve().then(runObservers);
    }
    queuedObservers.add(observer);
}

/* runs the queued observers,
 currentObserver is set to undefined in the end */
function runObservers () {
    try {
        queuedObservers.forEach(runObserver);
    } finally {
        currentObserver = undefined;
        queuedObservers.clear();
    }
}

/* sets the global currentObserver to observer,
 then executes it */
function runObserver (observer) {
    currentObserver = observer;
    observer();
}



module.exports = {
    observe : observe,
    observable : observable
};
