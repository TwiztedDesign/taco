let events = require("../utils/events.js");
import {update} from "./handlers/updateHandler.js";


let handlers = {};
handlers[events.UPDATE] = update;


module.exports = handlers;