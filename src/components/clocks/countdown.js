import Clock from "./clock";

export default class Countdown extends Clock {
    constructor() {
        super();
    }

    connectedCallback() {
        this.type = 'countdown';
        super.connectedCallback();
    }

    formatTime(){
        return Math.max(this.countFrom - this._time, 0);
    }

}