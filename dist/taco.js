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
    "USER_UPDATE": "taco-user-update",
    "MOUSE_IN": "taco-mouse-in",
    "MOUSE_OUT": "taco-mouse-out"
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var window = window || global.window;

function sendMessage(type, payload) {
    (window || global.window).parent.postMessage(JSON.stringify({ type: type, payload: payload }), '*');
}

module.exports = {
    send: sendMessage
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _events = __webpack_require__(0);

var _helpers = __webpack_require__(4);

var send = __webpack_require__(1).send;

var main = {},
    proxy = {};
var _updateCB = void 0;

var onChange = {
    set: function set(target, prop, value) {
        target[prop] = value;
        send(_events.USER_UPDATE, main);
        return true;
    }
};

function addTemplate(name, data) {
    main[name] = data;
    proxy[name] = new Proxy(data, onChange);
    send(_events.ADD, {
        channel: name,
        data: data
    });
    return proxy[name];
}

function setValue(template, control, value) {
    template = (0, _helpers.findKey)(main, template);
    if (template) {
        control = (0, _helpers.findKey)(main[template], control);
    }
    if (template && control) {
        main[template][control] = value;
        proxy[template][control] = value;
    }
}
function getValue(template, control) {
    template = (0, _helpers.findKey)(main, template);
    if (template) {
        return main[template][(0, _helpers.findKey)(main[template], control)];
    }
}

function show(template) {
    setValue(template, "visibility", true);
}
function hide(template) {
    setValue(template, "visibility", false);
}
function toggle(template) {
    var visibility = getValue(template, 'visibility');
    if (visibility !== undefined) {
        setValue(template, 'visibility', !visibility);
    }
}

module.exports = {
    main: main,
    proxy: proxy,
    onUpdate: function onUpdate(cb) {
        _updateCB = cb;
    },
    updateCB: function updateCB() {
        if (_updateCB) {
            _updateCB();
        }
    },
    add: addTemplate,
    show: show,
    hide: hide,
    toggle: toggle

};

/***/ }),
/* 3 */
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
/* 4 */
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

module.exports = {
    findKey: findKey
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messenger = __webpack_require__(1);

var _events = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(6).start();
var tacoData = __webpack_require__(2);
var api = __webpack_require__(7);

window.onload = function () {
    (0, _messenger.send)(_events.READY);
    var children = document.body.children;
    for (var i = 0; i < children.length; i++) {
        children[i].addEventListener('mouseleave', function () {
            (0, _messenger.send)(_events.MOUSE_OUT);
        });
        children[i].addEventListener('mouseenter', function () {
            (0, _messenger.send)(_events.MOUSE_IN);
        });
    }
};

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

customElements.define('my-element', MyElement);

module.exports = {
    addTemplate: tacoData.add,
    onUpdate: tacoData.onUpdate,
    go: api.go,
    next: api.next,
    previous: api.previous,
    home: api.home,
    show: api.show,
    hide: api.hide,
    toggle: api.toggle
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _events = __webpack_require__(0);

var _helpers = __webpack_require__(4);

var tacoData = __webpack_require__(2);

var window = window || global.window;

function update(data) {
    for (var template in tacoData.main) {
        var key = (0, _helpers.findKey)(data, template);
        for (var item in data[key]) {
            var mainKey = (0, _helpers.findKey)(tacoData.main, key);
            tacoData.main[mainKey][item] = data[key][item];
        }
    }
    tacoData.updateCB();
}

var handlers = {};
handlers[_events.UPDATE] = update;

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _messenger = __webpack_require__(1);

var _events = __webpack_require__(0);

var tacoData = __webpack_require__(2);

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
    show: tacoData.show,
    hide: tacoData.hide,
    toggle: tacoData.toggle
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=taco.js.map