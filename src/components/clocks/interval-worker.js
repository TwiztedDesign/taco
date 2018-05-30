function work() {

    var now = Date.now || function () {
            return (new Date()).getTime();
        };
    var interval, delayed, startedAt;
    var timeoutId = null;

    self.onmessage = function (event) {
        var data = event.data;

        switch (data.cmd) {

            case 'stop':
                clearTimeout(timeoutId);
                timeoutId = null;
                break;
            case 'start':
                if(!timeoutId) {
                    interval = data.interval || 30;
                    startedAt = now();
                    delayed = 0;
                    timeoutId = self.setTimeout(tick, interval);
                }
                break;
        }
    };

    function tick() {
        delayed += interval;
        var tickedAt = now();
        var elapsed = tickedAt - startedAt;
        var drifted = elapsed - delayed;
        self.postMessage(interval);
        timeoutId = self.setTimeout(tick, interval - drifted);
    }
}


function createWorker(){
    var blobURL = URL.createObjectURL( new Blob([ '(', work.toString(),')()' ], { type: 'application/javascript' } ) );
    var worker = new Worker( blobURL );
    URL.revokeObjectURL( blobURL );
    return worker;
}


class Interval {
    constructor(cb, options){
        this._options = options || {};
        this._worker = createWorker();
        this._worker.onmessage = function(e){
            cb(e.data);
        };
    }
    start(){
        this._worker.postMessage({cmd: 'start', interval : this._options.interval});
    }
    stop(){
        this._worker.postMessage({cmd: 'stop', interval : this._options.interval});
    }

}



module.exports = Interval;