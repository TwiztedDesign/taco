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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
    "TOUCH": "taco-touch-element",
    "MOUSE_MOVE": "taco-mouse-move"
};

/***/ }),
/* 1 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _events = __webpack_require__(0);

var _helpers = __webpack_require__(3);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _messenger = __webpack_require__(1);

var _events = __webpack_require__(0);

__webpack_require__(6);

__webpack_require__(7);

var _accessorObserver = __webpack_require__(15);

__webpack_require__(11).start();
var tacoData = __webpack_require__(2);
var api = __webpack_require__(14);


window.onload = function () {
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
};

module.exports = {
    addTemplate: tacoData.add,
    onUpdate: tacoData.onUpdate,
    go: api.go,
    next: api.next,
    previous: api.previous,
    home: api.home,
    show: api.show,
    hide: api.hide,
    toggle: api.toggle,
    observe: _accessorObserver.observe,
    observable: _accessorObserver.observable
};

/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

__webpack_require__(9);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

customElements.define('my-element', MyElement);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
        key: 'observe',
        value: function observe(cb) {
            this._result = new Proxy(this._result, {
                set: function set(target, prop, value) {
                    target[prop] = value;
                    if (cb) {
                        cb(target);
                    }
                    return true;
                }
            });
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

customElements.define('drag-area', DragArea);

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var handlers = __webpack_require__(12);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _updateHandler = __webpack_require__(13);

var events = __webpack_require__(0);


var handlers = {};
handlers[events.UPDATE] = _updateHandler.update;

module.exports = handlers;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _helpers = __webpack_require__(3);

var tacoData = __webpack_require__(2);


module.exports = {
    update: function update(data) {
        for (var template in tacoData.main) {
            var key = (0, _helpers.findKey)(data, template);
            for (var item in data[key]) {
                var mainKey = (0, _helpers.findKey)(tacoData.main, key);
                tacoData.main[mainKey][item] = data[key][item];
            }
        }
        tacoData.updateCB();
    }
};

/***/ }),
/* 14 */
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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var activeHandler = void 0;

function observe(handler) {
    activeHandler = handler;
    handler();
    activeHandler = undefined;
}

function observableProp(provider, prop) {
    var value = provider[prop];
    provider._handlers = [];
    Object.defineProperty(provider, prop, {
        get: function get() {
            if (activeHandler) {
                provider._handlers[prop] = activeHandler;
            }
            return value;
        },
        set: function set(newValue) {
            value = newValue;
            var handler = provider._handlers[prop];
            if (handler) {
                activeHandler = handler;
                handler();
                activeHandler = undefined;
            }
        }
    });
}

function observable(provider) {
    var props = Object.getOwnPropertyNames(provider);
    for (var i = 0; i < props.length; i++) {
        observableProp(provider, props[i]);
        if (_typeof(provider[props[i]]) === 'object') {
            observable(provider[props[i]]);
        }
    }
    return provider;
}

module.exports = {
    observe: observe,
    observable: observable
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=taco.js.map