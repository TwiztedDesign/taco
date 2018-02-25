let events = require("../utils/events.js");
import {update} from "./handlers/updateHandler.js";
import {pages} from "./handlers/pagesHandler.js";


let handlers = {};
handlers[events.UPDATE] = update;
handlers[events.PAGES] = pages;



module.exports = handlers;