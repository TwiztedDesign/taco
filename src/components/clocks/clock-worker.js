
function worker(){
    var now = Date.now || function () { return (new Date()).getTime(); };
    var delay;
    var startedAt;
    var delayed;
    var timeoutId = null;


    self.onmessage = function (event) {

        var data = event.data;

        switch (data.cmd){

            case 'stop':

                clearTimeout(timeoutId);
                timeoutId = null;
                break;
            case 'pause':
                clearTimeout(timeoutId);
                timeoutId = null;
                break;
            case 'resume':
                break;
            case 'reset':
                break;
            case 'start':

            delay = data.interval;
            var offset = data.offset || 0;
            var isLive = data.offset > 100000000;

            startedAt = isLive? new Date(offset) : now();
            delayed = 0;
            timeoutId = self.setTimeout(tick, delay);

            // if (delay > 0) {
            //     startedAt = now();
            //     delayed = 0;
            //     timeoutId = self.setTimeout(tick, delay);
            // } else {
            //     if (timeoutId) {
            //         clearTimeout(timeoutId);
            //         timeoutId = null;
            //     }
            // }
            break;
        }
    };

    function tick() {
        delayed += delay;
        var tickedAt = now();
        var elapsed = tickedAt - startedAt;
        var drifted = elapsed - delayed;
        self.postMessage(elapsed);
        timeoutId = self.setTimeout(tick, delay - drifted);
    }

}


module.exports = worker;