import tacoElement from  '../../src/core/tacoElement';
const htmlObserver = require('../../src/observer/htmlAccessorObserver');

const observe = jest.spyOn(htmlObserver, 'observe');

describe('Default Expose', () => {

    describe('Create taco element', () => {

        it('Should find and construct a taco element with the given selector based on tacoElement constructor', () => {
            let headerElement = document.createElement('h1');
            headerElement.setAttribute("taco-template", 'dom-test');
            headerElement.setAttribute("taco-name", 'title');
            document.body.append(headerElement);
            let headerTacoElement = new tacoElement('[taco-template="dom-test"]');

            expect(headerTacoElement.observe()).toBeDefined();
            expect(headerTacoElement.onChange()).toBeDefined();
            expect(observe).toHaveBeenCalled();

        });

    });
});