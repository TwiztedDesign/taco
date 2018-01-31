

function findKey(data, keyToFind) {
    let keys = Object.keys(data);
    for(let i = 0 ; i < keys.length ; i++){
        if(keys[i].toLowerCase() === keyToFind.toLowerCase()){
            return keys[i];
        }
    }
}



module.exports = {
    findKey : findKey
};