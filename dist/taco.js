(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["taco"] = factory();
	else
		root["taco"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    "READY": "taco-ready",
    "GO": "taco-go",
    "NEXT": "taco-next",
    "PREV": "taco-previous",
    "ADD": "taco-addtemplate",
    "UPDATE": "taco-update",
    "PAGES": "taco-pages",
    "USER_UPDATE": "taco-user-update",
    "TOUCH": "taco-touch-element",
    "MOUSE_MOVE": "taco-mouse-move"
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.tacoData = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(0);

var _helpers = __webpack_require__(2);

var _messenger = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TacoData = function () {
    function TacoData() {
        _classCallCheck(this, TacoData);

        this._main = {};
        this._proxy = {};
        this._pages = [];
        var self = this;
        this._onChange = {
            set: function set(target, prop, value) {
                target[prop] = value;
                (0, _messenger.send)(_events.USER_UPDATE, self._main);
                return true;
            }
        };
    }

    _createClass(TacoData, [{
        key: "updateCB",
        value: function updateCB() {
            if (this._updateCB) {
                this._updateCB();
            }
            if (window.angular) {
                var $body = window.angular.element(document.body);
                var $rootScope = $body.injector().get('$rootScope');
                $rootScope.$apply();
            }
        }
    }, {
        key: "onUpdate",
        value: function onUpdate(cb) {
            this._updateCB = cb;
        }
    }, {
        key: "_setValue",
        value: function _setValue(template, control, value) {
            template = (0, _helpers.findKey)(this._main, template);
            if (template) {
                control = (0, _helpers.findKey)(this._main[template], control);
            }
            if (template && control) {
                this._main[template][control] = value;
                this._proxy[template][control] = value;
            }
        }
    }, {
        key: "_getValue",
        value: function _getValue(template, control) {
            template = (0, _helpers.findKey)(this._main, template);
            if (template) {
                return this._main[template][(0, _helpers.findKey)(this._main[template], control)];
            }
        }
    }, {
        key: "addTemplate",
        value: function addTemplate(name, data) {
            data = data || {};
            if (this._main[name]) {
                Object.assign(this._main[name], data);
                // Object.assign(this._proxy[name], data);
            } else {
                this._main[name] = data;
                this._proxy[name] = new Proxy(data, this._onChange);
            }

            (0, _messenger.send)(_events.ADD, {
                channel: name,
                data: data
            });

            return this._proxy[name];
        }
    }, {
        key: "show",
        value: function show(template) {
            this._setValue(template, "visibility", true);
        }
    }, {
        key: "hide",
        value: function hide(template) {
            this._setValue(template, "visibility", false);
        }
    }, {
        key: "toggle",
        value: function toggle(template) {
            var visibility = this._getValue(template, 'visibility');
            if (visibility !== undefined) {
                this._setValue(template, 'visibility', !visibility);
            }
        }
    }, {
        key: "clear",
        value: function clear() {
            this._main = {};
            this._proxy = {};
        }
    }, {
        key: "addPages",
        value: function addPages(pages) {
            if (pages && pages.length) {
                while (this._pages.length) {
                    this._pages.pop();
                }
                this._pages = this._pages.concat(pages);
                // var self = this;
                // pages.forEach(function (pages) {
                //     self._pages.add(pages);
                // });
                this.updateCB();
            }
        }
    }, {
        key: "getPages",
        value: function getPages() {
            return this._pages;
            // return Array.from(this._pages);
        }
    }]);

    return TacoData;
}();

var tacoData = exports.tacoData = new TacoData();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function findKey(data, keyToFind) {
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i].toLowerCase() === keyToFind.toLowerCase()) {
            return keys[i];
        }
    }
}
function trim(str, charList) {
    if (charList === undefined) {
        charList = "\\s";
    }
    return str.replace(new RegExp("^[" + charList + "]+"), "").replace(new RegExp("[" + charList + "]+$"), "");
}

function getByPath(obj, path) {
    path = path ? trim(path, '.').split('.') : [""];

    var result = obj;
    for (var i = 0; i < path.length; i++) {
        result = result[path[i]];
        if (result === undefined) {
            return result;
        }
    }

    return result;
}
function setByPath(obj, path, value) {
    if (arguments.length !== 3) {
        throw new Error('Missing Arguments!');
    }
    path = path ? trim(path, '.').split('.') : [""];
    var result = obj;
    for (var i = 0; i < path.length; i++) {
        if (i === path.length - 1) {
            result[path[i]] = value;
        } else {
            if (result[path[i]] !== undefined) {
                result = result[path[i]];
            } else {
                return;
            }
        }
    }
}

function camelize(str) {
    return str.replace(/(.*)/, function ($1) {
        return $1.toLowerCase();
    }).replace(/\s(.)/g, function ($1) {
        return $1.toUpperCase();
    }).replace(/\s/g, '');
    // .replace(/^(.)/, function($1) { return $1.toLowerCase(); })
    // return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    //     return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    // }).replace(/\s+/g, '');
}
function decamelize(str) {
    return str.replace(/([A-Z])/g, function ($1) {
        return ' ' + $1.toLowerCase();
    });
}

function stringifyPath(path) {
    var str = '';
    for (var i = 0; i < path.length; i++) {
        // str += (trim(path[i],"_") + '.');
        var trimmedChar = trim(path[i], "_");
        str += trimmedChar + (trimmedChar !== '' ? '.' : '');
    }
    return trim(str, '.');
}

module.exports = {
    findKey: findKey,
    trim: trim,
    getByPath: getByPath,
    setByPath: setByPath,
    camelize: camelize,
    decamelize: decamelize,
    stringifyPath: stringifyPath
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var window = window || global.window;

function sendMessage(type, payload) {
    var w = window || global.window;
    if (w && w.parent) {
        w.parent.postMessage(JSON.stringify({ type: type, payload: payload }), '*');
    }
}

module.exports = {
    send: sendMessage
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    "EXPOSE_DELIMITER": " "
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _messenger = __webpack_require__(3);

var _events = __webpack_require__(0);

var _tacodata = __webpack_require__(1);

var _api = __webpack_require__(7);

var api = _interopRequireWildcard(_api);

var _listener = __webpack_require__(8);

var _init = __webpack_require__(12);

var _tacoElement = __webpack_require__(13);

var _tacoElement2 = _interopRequireDefault(_tacoElement);

__webpack_require__(15);

__webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(0, _listener.start)();
(0, _init.init)();

window.addEventListener('load', function () {
    (0, _messenger.send)(_events.READY);

    function onTouch(e) {
        (0, _messenger.send)(_events.TOUCH, e.target.tagName);
    }
    var lastMouseMoveTime = 0;
    function onMouseMove() {
        var mouseMoveTime = Date.now();
        if (mouseMoveTime - lastMouseMoveTime < 100) {
            (0, _messenger.send)(_events.MOUSE_MOVE);
        }
        lastMouseMoveTime = mouseMoveTime;
    }
    document.body.addEventListener('touchstart', onTouch);
    document.body.addEventListener('mousemove', onMouseMove);
});

var taco = function taco(selector) {
    return new _tacoElement2.default(selector);
};

taco.addTemplate = function (name, data) {
    return _tacodata.tacoData.addTemplate(name, data);
};
taco.onUpdate = function (cb) {
    return _tacodata.tacoData.onUpdate(cb);
};
taco.go = api.go;
taco.next = api.next;
taco.previous = api.previous;
taco.home = api.home;
taco.show = api.show;
taco.hide = api.hide;
taco.toggle = api.toggle;
taco.getPages = function () {
    return _tacodata.tacoData.getPages();
};

module.exports = taco;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _messenger = __webpack_require__(3);

var _events = __webpack_require__(0);

var _tacodata = __webpack_require__(1);

function noop() {}

function go(target, time) {
    (0, _messenger.send)(_events.GO, {
        target: target,
        time: time
    });
}

module.exports = {
    go: go,
    next: noop(),
    previous: noop(),
    home: noop(),
    show: function show(template) {
        return _tacodata.tacoData.show(template);
    },
    hide: function hide(template) {
        return _tacodata.tacoData.hide(template);
    },
    toggle: function toggle(template) {
        return _tacodata.tacoData.toggle(template);
    }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _handlers = __webpack_require__(9);

var handlers = _interopRequireWildcard(_handlers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function messageHandler(message) {
    var messageData = JSON.parse(message.data);
    var type = messageData.type;
    var handler = handlers[type];
    if (handler) {
        handler(messageData.payload);
    }
}

module.exports = {
    start: function start() {
        if (window && window.addEventListener) {
            window.addEventListener('message', messageHandler);
        }
    }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _updateHandler = __webpack_require__(10);

var _pagesHandler = __webpack_require__(11);

var events = __webpack_require__(0);


var handlers = {};
handlers[events.UPDATE] = _updateHandler.update;
handlers[events.PAGES] = _pagesHandler.pages;

module.exports = handlers;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _helpers = __webpack_require__(2);

var _tacodata = __webpack_require__(1);

var _consts = __webpack_require__(4);

function update(data) {
    var isDataChanged = false;
    for (var template in _tacodata.tacoData._main) {
        var key = (0, _helpers.findKey)(data, template);
        for (var item in data[key]) {
            var controlKey = (0, _helpers.findKey)(_tacodata.tacoData._main[template], item);

            _tacodata.tacoData._main[template][controlKey || item] = data[key][item];
            isDataChanged = true;

            updateDom(template, controlKey || item, data[key][item]);
        }
    }
    if (isDataChanged) {
        _tacodata.tacoData.updateCB();
    }
}

function updateDom(template, control, value) {
    var templateSelector = '[taco-template="' + template + '" i]';
    var controlSelector = '[taco-name="' + control.split(_consts.EXPOSE_DELIMITER)[0] + '" i]';
    var selector = templateSelector + ' ' + controlSelector + ',' + templateSelector + controlSelector;
    var dom = document.querySelector(selector);
    if (dom) {
        (0, _helpers.setByPath)(dom, control.split(_consts.EXPOSE_DELIMITER)[0], value); //control.split(EXPOSE_DELIMITER)[1] was returning undefined
        // console.log('after set by path', dom.title);
    }
}

module.exports = {
    update: update
};

/** to update angular *****

    let $body = angular.element(document.body);
    let $rootScope =  $body.injector().get('$rootScope');
    $rootScope.$appy();

 ************************/

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tacodata = __webpack_require__(1);

function pages(data) {
    _tacodata.tacoData.addPages(data);
}

module.exports = {
    pages: pages
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _helpers = __webpack_require__(2);

var _consts = __webpack_require__(4);

function _init() {
    var controls = document.querySelectorAll('[taco-name]');
    controls.forEach(function (control) {
        if (control.expose) {
            // console.log('init', control.closest);
            var template = control.closest('[taco-template]');
            var templateName = template ? template.getAttribute('taco-template') : 'Untitled Template';
            // templateName = templateName.toLowerCase();
            var controlName = control.getAttribute('taco-name');
            var exposed = control.expose();

            var data = {};
            for (var prop in exposed) {
                if (exposed.hasOwnProperty(prop)) {
                    (function () {
                        var path = _typeof(exposed[prop]) === 'object' ? exposed[prop].path : exposed[prop];
                        data[controlName + _consts.EXPOSE_DELIMITER + prop] = (0, _helpers.getByPath)(control, path);

                        Object.defineProperty(control, prop, {
                            get: function get() {
                                return (0, _helpers.getByPath)(this, path);
                            },
                            set: function set(newVal) {
                                (0, _helpers.setByPath)(this, path, newVal);
                            },

                            configurable: true
                        });
                    })();
                }
            }

            window.taco.addTemplate(templateName, data);
        }
    });
}

// function init_dep(){
//     let templates = document.querySelectorAll('[taco-template]');
//     for (let i = 0; i < templates.length; i++) {
//         let template = templates[i];
//         let templateName = template.getAttribute('taco-template');
//         let controls = template.querySelectorAll('[taco-name]');
//         let data = {};
//         for (let j = 0; j < controls.length; j++) {
//             let control = controls[j];
//             let controlName = control.getAttribute('taco-name');
//             if(control.expose){
//
//                 let exposed = control.expose();
//                 for (let prop in exposed) {
//                     if (exposed.hasOwnProperty(prop)) {
//                         let path = typeof exposed[prop] === 'object'? exposed[prop].path : exposed[prop];
//                         data[controlName + ' ' + prop] = getByPath(control, path);
//
//                         Object.defineProperty(control, prop, {
//                             get (){
//                                 return getByPath(this, path);
//                             },
//                             set (newVal){
//                                 setByPath(this, path, newVal);
//                             },
//                             configurable : true,
//                         });
//                     }
//                 }
//             }
//         }
//         window.taco.addTemplate(templateName, data);
//
//     }
// }


module.exports = {
    init: function init() {
        window.addEventListener('load', function () {
            _init();
        });
    }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _htmlAccessorObserver = __webpack_require__(14);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TacoElement = function () {
    function TacoElement(selector) {
        _classCallCheck(this, TacoElement);

        this.selector = selector;
        this.element = null;
        this.init();
        this.observe();
    }

    _createClass(TacoElement, [{
        key: 'init',
        value: function init() {
            switch (this.selector[0]) {
                case '<':
                    {
                        //create element
                        var matches = this.selector.match(/<([\w-]*)>/);
                        if (matches === null || matches === undefined) {
                            throw 'Invalid Selector / Node';
                        }
                        var nodeName = matches[0].replace('<', '').replace('>', '');
                        this.element = document.createElement(nodeName);
                        break;
                    }
                default:
                    {
                        this.element = document.querySelector(this.selector);
                    }
            }
        }
    }, {
        key: 'onChange',
        value: function onChange() {
            var prop = arguments.length > 1 ? arguments[0] : null;
            var cb = arguments.length > 1 ? arguments[1] : arguments[0];
            var event = prop ? "taco-change-" + prop : 'taco-change';
            var listener = function listener(e) {
                if (prop) {
                    cb(e.detail.value);
                } else {
                    cb(e.detail.property, e.detail.value, e.detail.path);
                }
            };
            this.element.addEventListener(event, listener, false);
            var self = this;
            return function () {
                self.element.removeEventListener(event, listener, false);
            };
        }
    }, {
        key: 'observe',
        value: function observe() {
            var self = this;
            (0, _htmlAccessorObserver.observe)(this.element, null, function (event, data) {
                self.element.dispatchEvent(new CustomEvent(event, data));
            });
            return this;
        }
    }]);

    return TacoElement;
}();

exports.default = TacoElement;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _helpers = __webpack_require__(2);

function getExposed(provider, prop) {
    if (provider.expose) {
        return _typeof(provider.expose()[prop]) === 'object' ? provider.expose()[prop].path : provider.expose()[prop];
    }
}

function observePrimitive(provider, prop, path, dispatcher) {
    var value = provider[prop];
    var pathString = (0, _helpers.stringifyPath)(path);
    var exposedPath = getExposed(provider, prop);
    Object.defineProperty(provider, prop, {
        get: function get() {
            if (exposedPath) {
                return (0, _helpers.getByPath)(provider, exposedPath);
            }
            return value;
        },
        set: function set(newValue) {
            if (newValue !== provider[prop]) {
                if (dispatcher) {
                    var event = 'taco-change-' + pathString + (0, _helpers.trim)(prop, "_");
                    dispatcher(event, { detail: { value: newValue } });
                    dispatcher('taco-change', { detail: { value: newValue, property: prop, path: path } });
                }
                if (exposedPath) {
                    (0, _helpers.setByPath)(provider, exposedPath, newValue);
                } else {
                    value = newValue;
                }
            }
        }
    });
}

function observeObject(provider, path, dispatcher) {
    path = path || [];
    var props = Object.getOwnPropertyNames(provider);
    for (var i = 0; i < props.length; i++) {

        if (_typeof(provider[props[i]]) === 'object') {
            path.push(props[i]);
            observeObject(provider[props[i]], path.slice(), dispatcher);
        } else {
            observePrimitive(provider, props[i], path.slice(), dispatcher);
        }
    }
}

module.exports = {
    observe: observeObject
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


HTMLHeadingElement.prototype.expose = function () {
    return { text: 'innerText', color: { path: 'style.color', ui: 'color' } };
};
HTMLSpanElement.prototype.expose = function () {
    return { text: 'innerText' };
};
HTMLParagraphElement.prototype.expose = function () {
    return { text: 'innerText' };
};
HTMLImageElement.prototype.expose = function () {
    return { source: 'src' };
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(17);

var _emoji = __webpack_require__(18);

var _emoji2 = _interopRequireDefault(_emoji);

var _dragArea = __webpack_require__(19);

var _dragArea2 = _interopRequireDefault(_dragArea);

var _telestratorElement = __webpack_require__(20);

var _telestratorElement2 = _interopRequireDefault(_telestratorElement);

var _videoStream = __webpack_require__(26);

var _videoStream2 = _interopRequireDefault(_videoStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function define(name, element) {
    customElements.define(name, element);
}

define('drag-area', _dragArea2.default);
define('my-element', _emoji2.default);
define('telestrator-element', _telestratorElement2.default);
define('video-stream', _videoStream2.default);

// function isDefined(name) {
//     return document.createElement(name).constructor !== HTMLElement;
// }

/***/ }),
/* 17 */
/***/ (function(module, exports) {

/* eslint-disable */
(function () {
'use strict';

(()=>{'use strict';if(!window.customElements)return;const a=window.HTMLElement,b=window.customElements.define,c=window.customElements.get,d=new Map,e=new Map;let f=!1,g=!1;window.HTMLElement=function(){if(!f){const a=d.get(this.constructor),b=c.call(window.customElements,a);g=!0;const e=new b;return e}f=!1;},window.HTMLElement.prototype=a.prototype;Object.defineProperty(window,'customElements',{value:window.customElements,configurable:!0,writable:!0}),Object.defineProperty(window.customElements,'define',{value:(c,h)=>{const i=h.prototype,j=class extends a{constructor(){super(),Object.setPrototypeOf(this,i),g||(f=!0,h.call(this)),g=!1;}},k=j.prototype;j.observedAttributes=h.observedAttributes,k.connectedCallback=i.connectedCallback,k.disconnectedCallback=i.disconnectedCallback,k.attributeChangedCallback=i.attributeChangedCallback,k.adoptedCallback=i.adoptedCallback,d.set(h,c),e.set(c,h),b.call(window.customElements,c,j);},configurable:!0,writable:!0}),Object.defineProperty(window.customElements,'get',{value:(a)=>e.get(a),configurable:!0,writable:!0});})();

/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

}());

/* eslint-enable */

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyElement = function (_HTMLElement) {
    _inherits(MyElement, _HTMLElement);

    function MyElement() {
        _classCallCheck(this, MyElement);

        return _possibleConstructorReturn(this, (MyElement.__proto__ || Object.getPrototypeOf(MyElement)).call(this));
    }

    _createClass(MyElement, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.style.cursor = 'pointer';
            this.style.userSelect = 'none';
            this.render();

            this.addEventListener('click', this.onClick);
        }
    }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {
            this.removeEventListener('click', this.onClick);
        }

        /**
         * Render the content. Will render a
         * happy face if the `happy` attribute
         * is set, sad otherwise.
         */

    }, {
        key: 'render',
        value: function render() {
            this.innerHTML = this.happy ? '&#x1f603;' : '&#x1f620;';
        }

        /**
         * Click handler. Toggles the `happy`
         * property.
         */

    }, {
        key: 'onClick',
        value: function onClick() {
            this.happy = !this.happy;
        }
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback() {
            this.render();
        }
    }, {
        key: 'happy',
        get: function get() {
            return this.hasAttribute('happy');
        },
        set: function set(value) {
            if (value) {
                this.setAttribute('happy', '');
            } else {
                this.removeAttribute('happy');
            }
        }
    }], [{
        key: 'observedAttributes',
        get: function get() {
            return ['happy'];
        }
    }]);

    return MyElement;
}(HTMLElement);

exports.default = MyElement;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DragArea = function (_HTMLElement) {
    _inherits(DragArea, _HTMLElement);

    function DragArea() {
        _classCallCheck(this, DragArea);

        var _this = _possibleConstructorReturn(this, (DragArea.__proto__ || Object.getPrototypeOf(DragArea)).call(this));

        _this._dragging = false;
        _this._result = { x: 0, y: 0 };
        return _this;
    }

    _createClass(DragArea, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.style.cursor = 'pointer';
            this.style.userSelect = 'none';
            this.addEventListener('mousedown', this.mouseDown);
            this.addEventListener('touchstart', this.touchStart);
            this.addEventListener('mouseup', this.mouseUp);
            this.addEventListener('touchend', this.touchEnd);
            this.addEventListener('mousemove', this.mouseMove);
            this.addEventListener('touchmove', this.touchMove);
        }
    }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {
            this.removeEventListener('mousedown', this.mouseDown);
            this.removeEventListener('touchstart', this.touchStart);
            this.removeEventListener('mouseup', this.mouseUp);
            this.removeEventListener('touchend', this.touchEnd);
            this.removeEventListener('mousemove', this.mouseMove);
            this.removeEventListener('touchmove', this.touchMove);
        }
    }, {
        key: 'calc',
        value: function calc(e) {
            if (this._dragging) {
                var bounds = this.getBoundingClientRect();
                var x = 0;
                var y = 0;
                if (this.mode === "screen") {
                    x = e.screenX;
                    y = e.screenY;
                } else if (this.mode === "linear") {

                    x = this.minValueX + (e.clientX - bounds.left) / bounds.width * (this.maxValueX - this.minValueX);
                    y = this.minValueY + (e.clientY - bounds.top) / bounds.height * (this.maxValueY - this.minValueY);
                } else {
                    x = e.clientX - bounds.left;
                    y = e.clientY - bounds.top;
                }

                if (this.precision === "int") {
                    x = Math.floor(x);
                    y = Math.floor(y);
                }

                this._result.x = x;
                this._result.y = y;

                // console.log(x + " : " + y);
            }
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown(e) {
            this._dragging = true;
            this.calc(e);
        }
    }, {
        key: 'touchStart',
        value: function touchStart(e) {
            this._dragging = true;
            this.calc(e.originalEvent.touches[0]);
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp() {
            this._dragging = false;
        }
    }, {
        key: 'touchEnd',
        value: function touchEnd() {
            this._dragging = false;
        }
    }, {
        key: 'mouseMove',
        value: function mouseMove(e) {
            this.calc(e);
        }
    }, {
        key: 'touchMove',
        value: function touchMove(e) {
            this.calc(e.originalEvent.touches[0]);
        }
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback() {}
    }, {
        key: 'expose',
        value: function expose() {
            return {
                xValue: {
                    path: 'result.x'
                },
                yValue: 'result.y'
            };
        }
    }, {
        key: 'isDragging',
        get: function get() {
            return this._dragging;
        }
    }, {
        key: 'result',
        get: function get() {
            return this._result;
        }
    }, {
        key: 'mode',
        get: function get() {
            return this.getAttribute("mode");
        }
    }, {
        key: 'minValueX',
        get: function get() {
            return parseInt(this.getAttribute("min-value-x"));
        }
    }, {
        key: 'minValueY',
        get: function get() {
            return parseInt(this.getAttribute("min-value-y"));
        }
    }, {
        key: 'maxValueX',
        get: function get() {
            return parseInt(this.getAttribute("max-value-x"));
        }
    }, {
        key: 'maxValueY',
        get: function get() {
            return parseInt(this.getAttribute("max-value-y"));
        }
    }, {
        key: 'precision',
        get: function get() {
            return this.getAttribute("precision");
        }
    }], [{
        key: 'observedAttributes',
        get: function get() {
            return ['result', 'mode', 'minValueX', 'minValueY', 'maxValueX', 'maxValueY', 'precision'];
        }
    }]);

    return DragArea;
}(HTMLElement);

exports.default = DragArea;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(21);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Telestrator = function (_HTMLElement) {
    _inherits(Telestrator, _HTMLElement);

    function Telestrator() {
        _classCallCheck(this, Telestrator);

        var _this = _possibleConstructorReturn(this, (Telestrator.__proto__ || Object.getPrototypeOf(Telestrator)).call(this));

        _this.clickX = [];
        _this.clickY = [];
        _this.clickDrag = [];
        _this.lastStroke = 0;
        return _this;
    }

    _createClass(Telestrator, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.innerHTML = '<canvas id="telestrator-canvas" width="1920" height="1080"></canvas>';
            this.canvas = this.querySelector('#telestrator-canvas');
            this.context = this.canvas.getContext("2d");

            this.canvas.addEventListener('mousedown', this.mouseDown);
            this.canvas.addEventListener('touchstart', this.touchStart);
            this.canvas.addEventListener('mouseup', this.mouseUp);
            this.canvas.addEventListener('touchend', this.touchEnd);
            this.canvas.addEventListener('mousemove', this.mouseMove);
            this.canvas.addEventListener('touchmove', this.touchMove);
            this.canvas.addEventListener('mouseleave', this.mouseLeave);
        }
    }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {
            this.canvas.removeEventListener('mousedown', this.mouseDown);
            this.canvas.removeEventListener('touchstart', this.touchStart);
            this.canvas.removeEventListener('mouseup', this.mouseUp);
            this.canvas.removeEventListener('touchend', this.touchEnd);
            this.canvas.removeEventListener('mousemove', this.mouseMove);
            this.canvas.removeEventListener('touchmove', this.touchMove);
            this.canvas.removeEventListener('mouseleave', this.mouseLeave);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.clickX = [];
            this.clickY = [];
            this.clickDrag = [];
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            this.lastStroke = 0;
        }
    }, {
        key: 'addClick',
        value: function addClick(x, y, dragging) {
            this.clickX.push(x);
            this.clickY.push(y);
            this.clickDrag.push(dragging);
        }
    }, {
        key: 'redraw',
        value: function redraw() {
            this.context.strokeStyle = this.color;
            this.context.lineJoin = "round";
            this.context.lineCap = "round";
            this.context.lineWidth = this.size;

            for (var i = this.lastStroke; i < this.clickX.length; i++) {
                this.context.beginPath();
                if (this.clickDrag[i] && i) {
                    this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
                } else {
                    this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
                }
                this.context.lineTo(this.clickX[i], this.clickY[i]);
                this.context.closePath();
                this.context.stroke();
            }
            this.lastStroke = this.clickX.length;
        }
    }, {
        key: 'mouseDown',
        value: function mouseDown(e) {
            var bounds = this.getBoundingClientRect();
            var mouseX = (e.clientX - bounds.left) / bounds.width * this.width;
            var mouseY = (e.clientY - bounds.top) / bounds.height * this.height;

            this.parentElement.paint = true;
            this.parentElement.addClick(mouseX, mouseY);
            this.parentElement.redraw();
        }
    }, {
        key: 'touchStart',
        value: function touchStart(e) {
            var bounds = this.getBoundingClientRect();
            var mouseX = (e.originalEvent.touches[0].clientX - bounds.left) / bounds.width * this.width;
            var mouseY = (e.originalEvent.touches[0].clientY - bounds.top) / bounds.height * this.height;

            this.parentElement.paint = true;
            this.parentElement.addClick(mouseX, mouseY);
            this.parentElement.redraw();
        }
    }, {
        key: 'mouseUp',
        value: function mouseUp() {
            this.parentElement.paint = false;
            this.parentElement.context.closePath();
        }
    }, {
        key: 'touchEnd',
        value: function touchEnd() {
            this.parentElement.paint = false;
            this.parentElement.context.closePath();
        }
    }, {
        key: 'mouseLeave',
        value: function mouseLeave() {
            this.parentElement.paint = false;
            this.parentElement.context.closePath();
        }
    }, {
        key: 'mouseMove',
        value: function mouseMove(e) {
            if (this.parentElement.paint) {
                var bounds = this.getBoundingClientRect();
                var mouseX = (e.clientX - bounds.left) / bounds.width * this.width;
                var mouseY = (e.clientY - bounds.top) / bounds.height * this.height;

                this.parentElement.addClick(mouseX, mouseY, true);
                this.parentElement.redraw();
            }
        }
    }, {
        key: 'touchMove',
        value: function touchMove(e) {
            if (this.parentElement.paint) {
                var bounds = this.getBoundingClientRect();
                var mouseX = (e.originalEvent.touches[0].clientX - bounds.left) / bounds.width * this.width;
                var mouseY = (e.originalEvent.touches[0].clientY - bounds.top) / bounds.height * this.height;

                this.parentElement.addClick(mouseX, mouseY, true);
                this.parentElement.redraw();
            }
        }
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback() {}
    }, {
        key: 'expose',
        value: function expose() {
            return {
                Color: "color",
                Size: {
                    path: "size"
                }
            };
        }
    }, {
        key: 'color',
        get: function get() {
            return this.getAttribute("color") || 'black';
        },
        set: function set(value) {
            this.setAttribute('color', value);
        }
    }, {
        key: 'size',
        get: function get() {
            return parseInt(this.getAttribute("size")) || 5;
        },
        set: function set(value) {
            this.setAttribute('size', value);
        }
    }], [{
        key: 'observedAttributes',
        get: function get() {
            return [];
        }
    }]);

    return Telestrator;
}(HTMLElement);

exports.default = Telestrator;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(22);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(24)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./telestrator-element.scss", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./telestrator-element.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)(false);
// imports


// module
exports.push([module.i, "telestrator-element #telestrator-canvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n", ""]);

// exports


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(25);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoStream = function (_HTMLElement) {
    _inherits(VideoStream, _HTMLElement);

    function VideoStream() {
        _classCallCheck(this, VideoStream);

        return _possibleConstructorReturn(this, (VideoStream.__proto__ || Object.getPrototypeOf(VideoStream)).call(this));
    }

    _createClass(VideoStream, [{
        key: 'connectedCallback',
        value: function connectedCallback() {
            this.innerHTML = '<video></video>';
        }
    }, {
        key: 'disconnectedCallback',
        value: function disconnectedCallback() {}
    }, {
        key: 'attributeChangedCallback',
        value: function attributeChangedCallback() {}
    }, {
        key: 'expose',
        value: function expose() {
            return {
                group: 'groupId',
                stream: 'streamId'
            };
        }
    }, {
        key: 'group',
        get: function get() {
            return this.getAttribute("group");
        }
    }, {
        key: 'stream',
        get: function get() {
            return this._streamId;
        }
    }], [{
        key: 'observedAttributes',
        get: function get() {
            return ['result', 'mode', 'minValueX', 'minValueY', 'maxValueX', 'maxValueY', 'precision'];
        }
    }]);

    return VideoStream;
}(HTMLElement);

exports.default = VideoStream;

/***/ })
/******/ ]);
});
//# sourceMappingURL=taco.js.map