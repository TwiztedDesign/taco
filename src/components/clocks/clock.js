//<clock format=“mm:ss” init=“0” start={{sata.clockState}} reset={{data.clockReset}} class=“myDesign”></clock>
//
// window.setCorrectingInterval = ( function( func, delay ) {
//     var instance = { };
//
//     function tick( func, delay ) {
//         if ( ! instance.started ) {
//             instance.func = func;
//             instance.delay = delay;
//             instance.startTime = new Date().valueOf();
//             instance.target = delay;
//             instance.started = true;
//
//             setTimeout( tick, delay );
//         } else {
//             var elapsed = new Date().valueOf() - instance.startTime,
//                 adjust = instance.target - elapsed;
//
//             instance.func();
//             instance.target += instance.delay;
//
//             setTimeout( tick, instance.delay + adjust );
//         }
//     }
//
//     return tick( func, delay );
//
// } );



function intervalFuncs() {
    // Track running intervals
    var numIntervals = 0,
        intervals = {};

    // Polyfill Date.now
    var now = Date.now || function() {
            return new Date().valueOf();
        };

    var setCorrectingInterval = function(func, delay) {
        var id = numIntervals++,
            planned = now() + delay;

        // Normalize func as function
        switch (typeof func) {
            case 'function':
                break;
            case 'string':
                var sFunc = func;
                func = function() {
                    eval(sFunc);
                };
                break;
            default:
                func = function() { };
        }

        function tick() {
            func();

            // Only re-register if clearCorrectingInterval was not called during function
            if (intervals[id]) {
                planned += delay;
                intervals[id] = setTimeout(tick, planned - now());
            }
        }

        intervals[id] = setTimeout(tick, delay);
        return id;
    };

    var clearCorrectingInterval = function(id) {
        clearTimeout(intervals[id]);
        delete intervals[id];
    };

    window.setCorrectingInterval = setCorrectingInterval;
    window.clearCorrectingInterval = clearCorrectingInterval;
    return {
        setCorrectingInterval: setCorrectingInterval,
        clearCorrectingInterval: clearCorrectingInterval
    };
}

intervalFuncs();



// Build a worker from an anonymous function body
var blobURL = URL.createObjectURL( new Blob([ '(',

        function(){

            onmessage = function(e) {
                // console.log('Message received from main script');
                var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
                // console.log('Posting message back to main script');
                postMessage(workerResult);
            };


            //Long-running work here
        }.toString(),

        ')()' ], { type: 'application/javascript' } )
    );

var worker = new Worker( blobURL );

worker.onmessage = function() {
    // result.textContent = e.data;
    // console.log('Message received from worker');
};
setTimeout(function(){
    worker.postMessage({'cmd': 'start', 'msg': 'Hi'});
}, 7000);


// Won't be needing this anymore
URL.revokeObjectURL( blobURL );


export default class Clock1 extends HTMLElement {
    constructor() {
        super();
        this._startTime = Date.now();
        this._time = 0;
        this._internalTime = 0;
        this.running = false;

    }

    connectedCallback() {
        this.innerHTML = '<div class="clock"></div>';
        if(this.running){
            this.start();
        }

    }

    disconnectedCallback() {
        this.running = false;
    }

    pad(num) {
        return ('0' + num).slice(-2);
    }

    tick(){
        var self = this;
        if(this.running){
            this.update();
            this._time += this.interval;
        }
        this._internalTime += this.interval;
        var diff = (new Date().getTime() - this._startTime) - this._internalTime;

        window.setTimeout(function(){
            self.tick();
        }, (this.interval - diff));
    }
    tick2(){
        if(this.running){
            this.update();
            this._time += this.interval;
        }
        this._internalTime += this.interval;
    }

    formatTime(){
        return this._time;
    }

    update(){
        this.querySelector('.clock').innerHTML = this.formatTime();
    }

    reset(){
        this._time = 0;
    }
    pause(){
        this.running = false;
    }
    start(){
        var self = this;
        this.running = true;
        this._clearInterval = window.setCorrectingInterval(function(){self.tick2();}, this.interval);
        // var start = Date.now();
        // window.setCorrectingInterval(function(){console.log(Date.now() - start);}, this.interval);
        // this.tick();
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
        this.running = value;
        if(this.running){
            // this.start();
        }
    }
    get initial(){
        return this.getAttribute("initial") || 0;
    }
    set initial(value){
        this.setAttribute('initial', value);
    }
    get limit(){
        return this.getAttribute("initial");
    }
    set limit(value){
        this.setAttribute('limit', value);
    }


    expose(){
        return {
            Run : 'run',
            Limit: 'limit'
        };
    }

}