import {tacoData} from '../../core/tacodata.js';


module.exports = {
    show        : (template) => {return tacoData.show(template);},
    hide        : (template) => {return tacoData.hide(template);},
    toggle      : (template) => {return tacoData.toggle(template);}
};
