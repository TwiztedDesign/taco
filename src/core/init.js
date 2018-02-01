import {getByPath, setByPath} from '../utils/helpers';

module.exports = {
    init : () => {
        window.addEventListener('load', function(){

            let templates = document.querySelectorAll('[taco-template]');
            for (let i = 0; i < templates.length; i++) {
                let template = templates[i];
                let templateName = template.getAttribute('taco-template');
                let controls = template.querySelectorAll('[taco-name]');
                let data = {};
                for (let j = 0; j < controls.length; j++) {
                    let control = controls[j];
                    let controlName = control.getAttribute('taco-name');
                    if(control.expose){

                        let exposed = control.expose();
                        for (let prop in exposed) {
                            if (exposed.hasOwnProperty(prop)) {
                                let path = typeof exposed[prop] === 'object'? exposed[prop].path : exposed[prop];
                                data[controlName + ' ' + prop] = getByPath(control, path);

                                Object.defineProperty(control, prop, {
                                    get (){
                                        return getByPath(this, path);
                                    },
                                    set (newVal){
                                        setByPath(this, path, newVal);
                                    },
                                    configurable : true,
                                });
                            }
                        }
                    }
                }
                window.taco.addTemplate(templateName, data);

            }
        });
    }
};
