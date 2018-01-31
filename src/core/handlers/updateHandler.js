import {findKey} from '../../utils/helpers.js';
import {tacoData} from '../tacodata.js';

function update(data){
    var isUpdateCB = false;
    for(let template in tacoData._main) {
        let key = findKey(data, template);
        for(let item in data[key]){
            var controlKey = findKey(tacoData._main[key], item);
            if(controlKey) {
                tacoData._main[key][item] = data[key][item];
                isUpdateCB = true;
            }
        }
    }
    if(isUpdateCB) {
        tacoData.updateCB();
    }
}

module.exports = {
    update : update
};