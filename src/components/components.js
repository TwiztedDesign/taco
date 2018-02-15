import "../../scripts/custom-elements-es5-adapter.exec";
import Emoji from "./emoji.js";
import DragArea from "./drag-area";
import Telestrator from "./telestrator/telestrator-element";


function define(name, element) {
    customElements.define(name, element);
}


define('drag-area', DragArea);
define('my-element', Emoji);
define('telestrator-element', Telestrator);


// function isDefined(name) {
//     return document.createElement(name).constructor !== HTMLElement;
// }




