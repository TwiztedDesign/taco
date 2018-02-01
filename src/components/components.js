import "../../scripts/custom-elements-es5-adapter.exec";
import Emoji from "./emoji.js";
import DragArea from "./drag-area";


customElements.define('drag-area', DragArea);
customElements.define('my-element', Emoji);