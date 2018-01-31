import {findKey, setByPath} from '../../utils/helpers.js';
import {tacoData} from '../tacodata.js';

function update(data){
    var isDataChanged = false;
    for(let template in tacoData._main) {
        let key = findKey(data, template);
        for(let item in data[key]){
            let controlKey = findKey(tacoData._main[template], item);
            if(controlKey) {
                tacoData._main[template][controlKey] = data[key][item];
                isDataChanged = true;

                updateDom(template, controlKey, data[key][item]);
            }
        }
    }
    if(isDataChanged) {
        tacoData.updateCB();
    }
}


function updateDom(template, control, value){
    let dom = document.querySelector('[taco-template="' + template + '"] [taco-name="' + control.split(' ')[0] + '"]');
    if(dom){
        setByPath(dom, control.split(' ')[1], value);
    }
}

module.exports = {
    update : update
};