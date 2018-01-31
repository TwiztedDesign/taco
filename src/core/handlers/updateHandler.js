import {findKey, setByPath} from '../../utils/helpers.js';
import {tacoData} from '../tacodata.js';

function update(data){
    for(let template in tacoData._main) {
        let key = findKey(data, template);
        for(let item in data[key]){
            let mainKey = findKey(tacoData._main, key);
            tacoData._main[mainKey][item] = data[key][item];

            updateDom(mainKey, item, data[key][item]);
        }
    }
    tacoData.updateCB();
}


function updateDom(template, control, value){
    var dom = document.querySelector('[taco-template="' + template + '"] [taco-name="' + control.split(' ')[0] + '"]');
    if(dom){
        setByPath(dom, control.split(' ')[1], value);
    }
}

module.exports = {
    update : update
};