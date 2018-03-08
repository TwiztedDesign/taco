import {init} from  '../../src/core/init';
import '../../src/core/defaultExpose';

describe('Default Expose', () => {

    describe('Expose header element', () => {

        it('Should expose text and color for header element', () => {
            let headerElement = document.createElement('h1');
            headerElement.setAttribute("taco-template", 'dom-test');
            headerElement.setAttribute("taco-name", 'title');
            document.body.append(headerElement);

            init();
            global.dispatchEvent(new Event('load'));

        });

    });

});