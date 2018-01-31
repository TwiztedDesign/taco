import {findKey, setByPath} from '../../utils/helpers.js';
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

                updateDom(controlKey, item, data[key][item]);
            }
        }
    }
    if(isUpdateCB) {
        tacoData.updateCB();
    }
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