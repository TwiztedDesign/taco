import './telestrator-element.scss';
export default class Telestrator extends HTMLElement {
    constructor() {
        super();

        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.lastStroke = 0;
    }

    connectedCallback() {
        this.innerHTML = '<canvas id="telestrator-canvas" width="1920" height="1080"></canvas>';
        this.canvas =  this.querySelector('#telestrator-canvas');
        this.context = this.canvas.getContext("2d");

        this.canvas.addEventListener('mousedown', this.mouseDown);
        this.canvas.addEventListener('touchstart', this.touchStart);
        this.canvas.addEventListener('mouseup', this.mouseUp);
        this.canvas.addEventListener('touchend', this.touchEnd);
        this.canvas.addEventListener('mousemove', this.mouseMove);
        this.canvas.addEventListener('touchmove', this.touchMove);
        this.canvas.addEventListener('mouseleave', this.mouseLeave);

    }

    disconnectedCallback() {
        this.canvas.removeEventListener('mousedown', this.mouseDown);
        this.canvas.removeEventListener('touchstart', this.touchStart);
        this.canvas.removeEventListener('mouseup', this.mouseUp);
        this.canvas.removeEventListener('touchend', this.touchEnd);
        this.canvas.removeEventListener('mousemove', this.mouseMove);
        this.canvas.removeEventListener('touchmove', this.touchMove);
        this.canvas.removeEventListener('mouseleave', this.mouseLeave);
    }

    clear(){
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.lastStroke = 0;
    }

    addClick(x, y, dragging){
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }
    redraw(){
        this.context.strokeStyle = this.color;
        this.context.lineJoin = "round";
        this.context.lineCap = "round";
        this.context.lineWidth = this.size;

        for(let i = this.lastStroke; i < this.clickX.length; i++) {
            this.context.beginPath();
            if(this.clickDrag[i] && i){
                this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
            }else{
                this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
            }
            this.context.lineTo(this.clickX[i], this.clickY[i]);
            this.context.closePath();
            this.context.stroke();
        }
        this.lastStroke = this.clickX.length;
    }

    mouseDown(e) {
        let bounds = this.getBoundingClientRect();
        let mouseX = ((e.clientX-bounds.left)/bounds.width) * this.width;
        let mouseY = ((e.clientY-bounds.top)/bounds.height) * this.height;

        this.parentElement.paint = true;
        this.parentElement.addClick(mouseX, mouseY);
        this.parentElement.redraw();
    }
    touchStart(e) {
        let bounds = this.getBoundingClientRect();
        let mouseX = ((e.originalEvent.touches[0].clientX-bounds.left)/bounds.width) * this.width;
        let mouseY = ((e.originalEvent.touches[0].clientY-bounds.top)/bounds.height) * this.height;

        this.parentElement.paint = true;
        this.parentElement.addClick(mouseX, mouseY);
        this.parentElement.redraw();
    }

    mouseUp() {
        this.parentElement.paint = false;
        this.parentElement.context.closePath();
    }
    touchEnd() {
        this.parentElement.paint = false;
        this.parentElement.context.closePath();
    }
    mouseLeave() {
        this.parentElement.paint = false;
        this.parentElement.context.closePath();
    }
    mouseMove(e) {
        if(this.parentElement.paint){
            let bounds = this.getBoundingClientRect();
            let mouseX = ((e.clientX-bounds.left)/bounds.width) * this.width;
            let mouseY = ((e.clientY-bounds.top)/bounds.height) * this.height;

            this.parentElement.addClick(mouseX, mouseY, true);
            this.parentElement.redraw();
        }
    }
    touchMove(e){
        if(this.parentElement.paint){
            let bounds = this.getBoundingClientRect();
            let mouseX = ((e.originalEvent.touches[0].clientX-bounds.left)/bounds.width) * this.width;
            let mouseY = ((e.originalEvent.touches[0].clientY-bounds.top)/bounds.height) * this.height;

            this.parentElement.addClick(mouseX, mouseY, true);
            this.parentElement.redraw();
        }
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback() {
    }

    get color() {
        return this.getAttribute("color") || 'black';
    }
    set color(value) {
        this.setAttribute('color', value);
    }
    get size() {
        return parseInt(this.getAttribute("size")) || 5;
    }
    set size(value) {
        this.setAttribute('size', value);
    }
    expose(){
        return {
            Color : "color",
            Size    : {
                path : "size"
            },
        };
    }

}