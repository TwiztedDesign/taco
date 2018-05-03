import Clock from "./clock";

export default class SystemClock extends Clock {
    constructor() {
        super();
    }

    connectedCallback() {
        this.type = 'system';
        super.connectedCallback();
    }

    formatTime(){
        var dateObj = new Date(this._startTime + this._time);
        return this.pad(dateObj.getHours()) + ':' + this.pad(dateObj.getMinutes()) + ':' + this.pad(dateObj.getSeconds());
    }

}