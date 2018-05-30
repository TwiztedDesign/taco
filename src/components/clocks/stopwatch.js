import BasicClock from "./basic-clock";

export default class Stopwatch extends BasicClock {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    _pad(num) {
        return ('0' + num).slice(-2);
    }

    format(timecode){
        var seconds         = parseInt((timecode / 1000) % 60),
            minutes         = parseInt((timecode / (1000 * 60)));

        return this._pad(minutes) + ":" + this._pad(seconds);
    }

    expose(){
        var exposed = super.expose();
        exposed.inharit = "inharit";
        return exposed;
    }


}
