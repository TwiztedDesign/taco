import {getByPath, setByPath} from '../utils/helpers';

HTMLHeadingElement.prototype.expose = function(){
    return [{text : 'innerText'}];
};
HTMLSpanElement.prototype.expose = function(){
    return [{text : 'innerText'}];
};
HTMLParagraphElement.prototype.expose = function(){
    return [{text : 'innerText'}];
};
HTMLImageElement.prototype.expose = function(){
    return [{source : 'src'}];
};


module.exports = {
    init : function(){
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
                        control.expose().forEach(function(prop){
                            let propName = Object.keys(prop)[0];
                            let path = prop[propName];
                            data[controlName + ' ' + propName] = getByPath(control, path);

                            Object.defineProperty(control, propName, {
                                get (){
                                    return getByPath(this, path);
                                },
                                set (newVal){
                                    setByPath(this, path, newVal);
                                },
                                configurable : true,
                            });
                        });
                    }
                }
                window.taco.addTemplate(templateName, data);

            }
        });
    }
};

