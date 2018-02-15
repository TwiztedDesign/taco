import {findKey, setByPath} from '../../utils/helpers.js';
import {tacoData} from '../tacodata.js';
import {EXPOSE_DELIMITER} from '../consts';

function update(data){
    let isDataChanged = false;
    for(let template in tacoData._main) {
        let key = findKey(data, template);
        for(let item in data[key]){
            let controlKey = findKey(tacoData._main[template], item);

            tacoData._main[template][controlKey || item] = data[key][item];
            isDataChanged = true;

            updateDom(template, controlKey || item, data[key][item]);

        }
    }
    if(isDataChanged) {
        tacoData.updateCB();
    }
}


function updateDom(template, control, value){
    let templateSelector = '[taco-template="' + template + '" i]';
    let controlSelector = '[taco-name="' + control.split(EXPOSE_DELIMITER)[0] + '" i]';
    let selector = templateSelector + ' ' + controlSelector + ',' + templateSelector + controlSelector;
    let dom = document.querySelector(selector);
    if(dom){
        setByPath(dom, control.split(EXPOSE_DELIMITER)[1], value);
    }
}

module.exports = {
    update : update
};


/** to update angular *****

    let $body = angular.element(document.body);
    let $rootScope =  $body.injector().get('$rootScope');
    $rootScope.$appy();

 ************************/