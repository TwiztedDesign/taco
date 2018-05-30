import BasicClock from "./basic-clock";

export default class Countdown extends BasicClock {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }


    init(){
        return Date.now();
    }
    onInterval(){
        this.set(Date.now());
    }

    _pad(num) {
        return ('0' + num).slice(-2);
    }

    format(timestamp){
        var seconds         = parseInt((timestamp / 1000) % 60),
            minutes         = parseInt((timestamp / (1000 * 60)) % 60),
            hours           = parseInt((timestamp / (1000 * 60 * 60)) % 24),
            milliseconds    = parseInt((timestamp % 1000) / 100);

        return this._pad(hours) + ":" + this._pad(minutes) + ":" + this._pad(seconds) + '.' + milliseconds;
    }

}