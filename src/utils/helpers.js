

function findKey(data, keyToFind) {
    let keys = Object.keys(data);
    for(let i = 0 ; i < keys.length ; i++){
        if(keys[i].toLowerCase() === keyToFind.toLowerCase()){
            return keys[i];
        }
    }
}
function trim(str, charList) {
    if (charList === undefined) {
        charList = "\\s";
    }
    return str
        .replace(new RegExp("^[" + charList + "]+"), "")
        .replace(new RegExp("[" + charList + "]+$"), "");
}

function getByPath(obj, path){
    path = path? trim(path, '.').split('.') : [""];

    let result = obj;
    for (let i = 0; i < path.length; i++) {
        result = result[path[i]];
        if(result === undefined){
            return result;
        }
    }

    return result;
}
function setByPath(obj, path, value){
    if(arguments.length !== 3){
        throw new Error('Missing Arguments!');
    }
    path = path? trim(path, '.').split('.') : [""];
    let result = obj;
    for (let i = 0; i < path.length; i++) {
        if(i === path.length -1){
            result[path[i]] = value;
        } else {
            if(result[path[i]] !== undefined){
                result = result[path[i]];
            }else {
                return;
            }
        }
    }
}

function camelize(str) {
    return str
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
    // return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    //     return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    // }).replace(/\s+/g, '');
}
function decamelize(str) {
    return str.replace(/([A-Z])/g, ' $1');
}

module.exports = {
    findKey     : findKey,
    trim        : trim,
    getByPath   : getByPath,
    setByPath   : setByPath,
    camelize    : camelize,
    decamelize  : decamelize
};