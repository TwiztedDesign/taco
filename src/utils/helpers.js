

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
    path = path.split('.');
    let result = obj;
    for (let i = 0; i < path.length; i++) {
        result =  result[path[i]];
    }
    return result;
}
function setByPath(obj, path, value){
    path = path.split('.');
    let result = obj;
    for (let i = 0; i < path.length; i++) {
        if(i === path.length -1){
            result[path[i]] = value;
        } else {
            result =  result[path[i]];
        }

    }
}



module.exports = {
    findKey : findKey,
    trim    : trim,
    getByPath : getByPath,
    setByPath : setByPath
};