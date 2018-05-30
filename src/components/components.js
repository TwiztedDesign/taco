import "../../scripts/custom-elements-es5-adapter.exec";
import Emoji from "./emoji.js";
import DragArea from "./drag-area";
import Telestrator from "./telestrator/telestrator-element";
import VideoStream from "./video-stream/video-stream";
import Clock from "./clocks/clock-simple";
import SystemClock from "./clocks/system-clock";
import Countdown from "./clocks/countdown";
import Stopwatch from "./clocks/stopwatch";
import BasicClock from "./clocks/basic-clock";


function define(name, element) {
    customElements.define(name, element);
}


define('drag-area', DragArea);
define('my-element', Emoji);
define('telestrator-element', Telestrator);
define('video-stream', VideoStream);
define('clock-element', Clock);
define('system-clock', SystemClock);
define('countdown-clock', Countdown);
define('stopwatch-clock', Stopwatch);
define('basic-clock', BasicClock);


// function isDefined(name) {
//     return document.createElement(name).constructor !== HTMLElement;
// }




