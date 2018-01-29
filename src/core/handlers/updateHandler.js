import {findKey} from '../../utils/helpers.js';
import {tacoData} from '../tacodata.js';

function update(data){
    for(let template in tacoData._main) {
        let key = findKey(data, template);
        for(let item in data[key]){
            let mainKey = findKey(tacoData._main, key);
            tacoData._main[mainKey][item] = data[key][item];
        }
    }
    tacoData.updateCB();
}

module.exports = {
    update : update
};