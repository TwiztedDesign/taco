import {USER_UPDATE} from "../utils/events";
import {ADD} from "../utils/events";
import {findKey} from '../utils/helpers.js';
import {send} from '../utils/messenger';

class TacoData {
    constructor(){
        this._main = {};
        this._proxy = {};
        this._pages = [];
        let self = this;

        this._onChangeFunc = function(templateName){
            return {
                set: function (target, prop, value) {
                    target[prop] = value;
                    var payload = {};
                    payload[templateName] = {};
                    payload[templateName][prop] = value;
                    send(USER_UPDATE, payload);
                    return true;
                }
            };

        };

        this._onChange = {
            set: function (target, prop, value) {
                target[prop] = value;
                send(USER_UPDATE, self._main);
                return true;
            }
        };
    }

    updateCB(){
        if(this._updateCB) {
            this._updateCB();
        }
        if(window.angular){
            let $body = window.angular.element(document.body);
            let $rootScope =  $body.injector().get('$rootScope');
            $rootScope.$apply();
        }
    }

    onUpdate(cb){
        this._updateCB = cb;
    }

    _setValue(template, control, value){
        template = findKey(this._main, template);
        if(template){
            control = findKey(this._main[template], control);
        }
        if(template && control){
            this._main[template][control] = value;
            this._proxy[template][control] = value;
        }
    }

    _getValue(template, control){
        template = findKey(this._main, template);
        if(template){
            return this._main[template][findKey(this._main[template], control)];
        }
    }

    addTemplate(name, data){
        data = data || {};
        if(this._main[name]){
            Object.assign(this._main[name], data);
            // Object.assign(this._proxy[name], data);
        }else{
            this._main[name] = data;
            this._proxy[name] = new Proxy(data, this._onChangeFunc(name));
        }

        send(ADD,{
            channel : name,
            data    : data
        });

        return this._proxy[name];
    }

    show(template){
        this._setValue(template, "visibility", true);
    }
    hide(template){
        this._setValue(template, "visibility", false);
    }
    toggle(template){
        let visibility = this._getValue(template, 'visibility');
        if(visibility !== undefined){
            this._setValue(template, 'visibility', !visibility);
        }
    }
    clear(){
        this._main = {};
        this._proxy = {};
    }
    addPages(pages){
        if(pages && pages.length){
            while (this._pages.length) { this._pages.pop(); }
            this._pages = this._pages.concat(pages);
            // var self = this;
            // pages.forEach(function (pages) {
            //     self._pages.add(pages);
            // });
            this.updateCB();

      }
    }
    getPages(){
        return this._pages;
        // return Array.from(this._pages);
    }
    addQueryParams(params){
        this._queryParams = params;
        this.updateCB();
    }
    getQueryParams(){
        return this._queryParams;
    }
}

export let tacoData = new TacoData();