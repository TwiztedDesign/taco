import {send} from './utils/messenger.js';
import {READY} from './utils/events.js';
import {MOUSE_OUT} from './utils/events.js';
import {MOUSE_IN} from './utils/events.js';
require('./utils/listener').start();
let tacoData = require('./core/tacodata.js');
let api = require('./core/api.js');


window.onload = function(){
    send(READY);
    let children = document.body.children;
    for (let i = 0; i < children.length; i++) {
        children[i].addEventListener('mouseleave', function(){
            send(MOUSE_OUT);
        });
        children[i].addEventListener('mouseenter', function(){
            send(MOUSE_IN);
        });

    }
};



class MyElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.style.cursor = 'pointer';
        this.style.userSelect = 'none';
        this.render();

        this.addEventListener('click', this.onClick);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.onClick);
    }

    /**
     * Render the content. Will render a
     * happy face if the `happy` attribute
     * is set, sad otherwise.
     */
    render() {
        this.innerHTML = this.happy ? '&#x1f603;' : '&#x1f620;';
    }

    /**
     * Click handler. Toggles the `happy`
     * property.
     */
    onClick() {
        this.happy = !this.happy;
    }

    static get observedAttributes() {
        return ['happy'];
    }

    attributeChangedCallback() {
        this.render();
    }

    get happy() {
        return this.hasAttribute('happy');
    }

    set happy(value) {
        if (value) {
            this.setAttribute('happy', '');
        } else {
            this.removeAttribute('happy');
        }
    }
}
customElements.define('my-element', MyElement);

module.exports = {
    addTemplate : tacoData.add,
    onUpdate    : tacoData.onUpdate,
    go          : api.go,
    next        : api.next,
    previous    : api.previous,
    home        : api.home,
    show        : api.show,
    hide        : api.hide,
    toggle      : api.toggle,
};