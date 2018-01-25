let tacoData = require('../tacodata.js');
import {findKey} from '../../utils/helpers.js';


module.exports = {
    update : function(data){
        for(const template in tacoData.main) {
            let key = findKey(data, template);
            for(let item in data[key]){
                let mainKey = findKey(tacoData.main, key);
                tacoData.main[mainKey][item] = data[key][item];
            }
        }
        tacoData.updateCB();
    }
};