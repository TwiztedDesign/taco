import "../../scripts/custom-elements-es5-adapter.exec";
import Emoji from "./emoji.js";
import DragArea from "./drag-area";
import Telestrator from "./telestrator/telestrator-element";


customElements.define('drag-area', DragArea);
customElements.define('my-element', Emoji);
customElements.define('telestrator-element', Telestrator);