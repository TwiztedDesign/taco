let events = require("../utils/events.js");
import {update} from "./handlers/updateHandler.js";
import {pages} from "./handlers/pagesHandler.js";
import {queryParams} from "./handlers/queryParamsHandler.js";


let handlers = {};
handlers[events.UPDATE] = update;
handlers[events.PAGES] = pages;
handlers[events.QUERY_PARAMS] = queryParams;



module.exports = handlers;