export default class DragArea extends HTMLElement {
    constructor() {
        super();
        this._dragging = false;
        this._result = {x:0, y:0};
    }

    connectedCallback() {
        this.style.cursor = 'pointer';
        this.style.userSelect = 'none';
        this.addEventListener('mousedown', this.mouseDown);
        this.addEventListener('touchstart', this.touchStart);
        this.addEventListener('mouseup', this.mouseUp);
        this.addEventListener('touchend', this.touchEnd);
        this.addEventListener('mousemove', this.mouseMove);
        this.addEventListener('touchmove', this.touchMove);
    }

    disconnectedCallback() {
        this.removeEventListener('mousedown', this.mouseDown);
        this.removeEventListener('touchstart', this.touchStart);
        this.removeEventListener('mouseup', this.mouseUp);
        this.removeEventListener('touchend', this.touchEnd);
        this.removeEventListener('mousemove', this.mouseMove);
        this.removeEventListener('touchmove', this.touchMove);
    }

    get isDragging() {
        return this._dragging;
    }


    calc(e) {
        if(this._dragging) {
            let bounds = this.getBoundingClientRect();
            let x = 0;
            let y = 0;
            if (this.mode === "screen") {
                x = e.screenX;
                y = e.screenY;
            }
            else if (this.mode === "linear") {

                x = this.minValueX + (((e.clientX - bounds.left) / bounds.width) * (this.maxValueX - this.minValueX));
                y = this.minValueY + (((e.clientY - bounds.top) / bounds.height) * (this.maxValueY - this.minValueY));


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


    mouseDown(e) {
        this._dragging = true;
        this.calc(e);
    }
    touchStart(e) {
        this._dragging = true;
        this.calc(e.originalEvent.touches[0]);
    }

    mouseUp() {
        this._dragging = false;
    }
    touchEnd() {
        this._dragging = false;
    }
    mouseMove(e) {
        this.calc(e);
    }
    touchMove(e){
        this.calc(e.originalEvent.touches[0]);
    }

    static get observedAttributes() {
        return ['result','mode', 'minValueX', 'minValueY', 'maxValueX', 'maxValueY', 'precision'];
    }

    attributeChangedCallback() {
    }

    get result() {
        return this._result;
    }
    get mode() {
        return this.getAttribute("mode");
    }
    get minValueX() {
        return parseInt(this.getAttribute("min-value-x"));
    }
    get minValueY() {
        return parseInt(this.getAttribute("min-value-y"));
    }
    get maxValueX() {
        return parseInt(this.getAttribute("max-value-x"));
    }
    get maxValueY() {
        return parseInt(this.getAttribute("max-value-y"));
    }
    get precision() {
        return this.getAttribute("precision");
    }
    expose(){
        return {
            xValue : {
                path : 'result.x',
            },
            yValue : 'result.y'
        };
    }

}