var fs = require('fs-extra');
var config = require("./build.config.json");

var filename = "taco.js";
var source = './dist/' + filename;

function copyCB(dest){
    return function(){
        console.log('Copied to ' + dest);
    }
}

if(config && config.destinations){
    for(var i = 0 ; i < config.destinations.length ; i++) {
        var dest = config.destinations[i].endsWith("/")? config.destinations[i] : (config.destinations[i] + "/");
        fs.copy(source, dest + filename, copyCB(config.destinations[i]));
    }
}