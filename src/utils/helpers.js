

function findKey(data, keyToFind) {
    var keys = Object.keys(data);
    for(var i = 0 ; i < keys.length ; i++){
        if(keys[i].toLowerCase() === keyToFind.toLowerCase()){
            return keys[i];
        }
    }
}



module.exports = {
    findKey : findKey
};