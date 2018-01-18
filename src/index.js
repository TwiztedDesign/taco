import {send} from './utils/messenger.js';
import {READY} from './utils/events.js';
require('./utils/listener').start();
let tacoData = require('./core/tacodata.js');
let api = require('./core/api.js');

window.onload = function(){
    send(READY);
};

class XProduct extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Create a standard img element and set its attributes.
        var img = document.createElement('img');
        img.alt = this.getAttribute('data-name');
        img.src = this.getAttribute('data-img');
        img.width = '150';
        img.height = '150';
        img.className = 'product-img';

        // Add the image to the custom element.
        this.appendChild(img);

        // Add an event listener to the image.
        img.addEventListener('click', () => {
            window.location = this.getAttribute('data-url');
        });

        // Create a link to the product.
        var link = document.createElement('a');
        link.innerText = this.getAttribute('data-name');
        link.href = this.getAttribute('data-url');
        link.className = 'product-name';

        // Add the link to the custom element.
        this.appendChild(link);
    }
}

// Define the new element
customElements.define('x-product', XProduct);




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