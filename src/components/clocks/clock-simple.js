var work = require('./clock-worker');

function createWorker(){
    var blobURL = URL.createObjectURL( new Blob([ '(', work.toString(),')()' ], { type: 'application/javascript' } ) );
    var worker = new Worker( blobURL );
    URL.revokeObjectURL( blobURL );
    return worker;
}


export default class Clock extends HTMLElement {
    constructor() {
        super();

        var self = this;
        this._worker = createWorker();
        this._time = 0 + this.initial;
        this._memo = this._time;
        this._worker.onmessage = function(e){

            if(!self.running){
                return;
            }

            if(self.limit >= 0 && e.data - self.interval > self.limit){
                self.pause();
                self._time = self.limit;
                self.update();
                var event = new Event('limit-reached');
                self.dispatchEvent(event);
            } else {
                self._time = e.data;
                self.update();
            }
        };
        this.running = false;
    }

    connectedCallback() {
        this.innerHTML = '<div class="clock"></div>';
        this.update();
    }

    disconnectedCallback() {
        this.running = false;
    }

    pad(num) {
        return ('0' + num).slice(-2);
    }

    limitReached(){
        return this.limit >= 0 && this._time >= this.limit;
    }

    formatTime(){
        return this._time;
    }

    update(){
        this.querySelector('.clock').innerHTML = this.formatTime();
    }
    pause(){
        this._worker.postMessage({cmd: 'pause'});
        this.running = false;
    }
    stop(){
        this._worker.postMessage({cmd: 'stop'});
        this._time = this.initial;
        this.running = false;
        this.update();
    }
    start(){
        this.initial = this._time || this.initial;
        this._memo = this._time || this.initial;
        this._time = 0;
        this.running = true;
        this._worker.postMessage({cmd: 'start', interval : this.interval, offset : (this.__timecode__ || 0), initial : this._memo});
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback() {
    }

    get type(){
        return this.getAttribute("type") || 'system';
    }
    set type(value){
        this.setAttribute('type', value);
    }

    get format(){
        return this.getAttribute("format") || 'hh:mm:ss';
    }
    set format(value){
        this.setAttribute('format', value);
    }

    get countFrom(){
        return this.getAttribute("count-from") || 60000;
    }
    set countFrom(value){
        this.setAttribute('count-from', value);
    }
    get interval(){
        return parseInt(this.getAttribute("interval")) || 100;
    }
    set interval(value){
        this.setAttribute('interval', value);
    }

    get run(){
        return this.running;
    }
    set run(value){
        if(this.running !== value){
            this.running = value;
            this.running? this.start() : this.pause();
        }
    }

    get reset(){
        return false;
    }
    set reset(value){
        if(value){
            var wasRunning = this.running;
            this.stop();
            if(wasRunning){
                this.start();
            }
        }
    }

    get initial(){
        return parseInt(this.getAttribute("initial")) || 0;
    }
    set initial(value){
        if(this.initial !== value){
            this.setAttribute('initial', value);
            this._time = value;
            this.update();
        }
    }
    get limit(){
        var limit = parseInt(this.getAttribute("limit"));
        return Number.isInteger(limit)? limit : -1;

    }
    set limit(value){
        this.setAttribute('limit', value);
    }

    get show(){
        var vis = this.getAttribute("show");
        if(vis !== null){
            return vis === 'true';
        } else {
            return true;
        }
    }
    set show(value){
        if(value){
            this.style.visibility = 'visible';
        } else {
            this.style.visibility = 'hidden';
        }
        this.setAttribute('show', value);
    }

    expose(){
        return {
            Run : 'run',
            Reset : 'reset',
            Initial : 'initial',
            Limit: 'limit',
            Show: 'show'
        };
    }

}