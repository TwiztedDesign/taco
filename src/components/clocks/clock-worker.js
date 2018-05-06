
function worker(){
    // var now = Date.now || function () { return (new Date()).getTime(); };
    var delay;
    var startedAt;
    var delayed;
    var timeoutId = null;
    var offset;
    var delta = 0;


    var now = function(){
        return Date.now() - delta;
    };


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
            offset = data.offset || 0;
            var isLive = data.offset > 100000000;
            var initial = data.initial || 0;

            delta = now() - offset;
            startedAt = isLive? new Date(offset - initial) : now() - initial;
            delayed = 0;
            timeoutId = self.setTimeout(tick, delay);

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