import {findKey} from '../../utils/helpers.js';
const tacoData = require('../tacodata.js');

function update(data){
    for(let template in tacoData.main) {
        let key = findKey(data, template);
        for(let item in data[key]){
            let mainKey = findKey(tacoData.main, key);
            tacoData.main[mainKey][item] = data[key][item];
        }
    }
    tacoData.updateCB();
}

module.exports = {
    update : update
};