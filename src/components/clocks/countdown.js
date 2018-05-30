import BasicClock from "./basic-clock";


export default class Countdown extends BasicClock {
    constructor() {
        super();

    }
    connectedCallback() {
        super.connectedCallback();
    }

    init(){
        return 15000;
    }

    onInterval(i){
        if(this.get() - i > 0){
            this.set(this.get() - i);
        } else {
            this.set(0);
            this.stop();
        }
    }
}