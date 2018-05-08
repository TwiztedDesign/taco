import Clock from "./clock-simple";

export default class Stopwatch extends Clock {
    constructor() {
        super();
    }

    connectedCallback() {
        this.type = 'stopwatch';
        super.connectedCallback();
    }

    formatTime(){
        var seconds         = parseInt((this._time / 1000) % 60),
            minutes         = parseInt((this._time / (1000 * 60)));
            // hours           = parseInt((this._time / (1000 * 60 * 60)) % 24),
            // milliseconds    = parseInt((this._time % 1000) / 100);

        return this.pad(minutes) + ":" + this.pad(seconds);

    }

}
