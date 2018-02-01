export default class MyElement extends HTMLElement {
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