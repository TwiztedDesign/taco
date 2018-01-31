import {observe} from '../observer/htmlAccessorObserver';


let tacoElement = function (selector){
    this.selector = selector;
    this.element = null;
    this.init();
    this.observe();
};

tacoElement.prototype.init = function(){
    switch(this.selector[0]){
        case '<' : {
            //create element
            let matches = this.selector.match(/<([\w-]*)>/);
            if (matches === null || matches === undefined) {
                throw 'Invalid Selector / Node';
            }
            let nodeName = matches[0].replace('<', '').replace('>', '');
            this.element = document.createElement(nodeName);
            break;
        }
        default : {
            this.element = document.querySelector(this.selector);
        }
    }
};


tacoElement.prototype.onChange = function(){
    let prop = arguments.length > 1? arguments[0] : null;
    let cb   = arguments.length > 1? arguments[1] : arguments[0];
    let event = prop? "taco-change-" + prop : 'taco-change';
    let listener = function(e){
        if(prop){
            cb(e.detail.value);
        } else {
            cb(e.detail.property, e.detail.value, e.detail.path);
        }
    };
    this.element.addEventListener(event, listener, false);
    let self = this;
    return function(){
        self.element.removeEventListener(event, listener, false);
    };
};

tacoElement.prototype.observe = function(){
    let self = this;
    observe(this.element, null, function(event, data){
        self.element.dispatchEvent(new CustomEvent(event, data));
    });
    return this;
};

export default tacoElement;