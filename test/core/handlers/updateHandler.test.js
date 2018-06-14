import {tacoData} from '../../../src/core/tacodata.js';
const updateHandler  = require('../../../src/core/handlers/updateHandler.js');
const helpers = require('../../../src/utils/helpers.js');

/******************************* global spies ********************************/

const updateCB = jest.spyOn(tacoData, 'updateCB');
const setByPath = jest.spyOn(helpers, 'setByPath');


/****************************************************************************/

describe('Update Handler', () => {
    beforeEach(() => {
        tacoData.clear();
        tacoData.addTemplate('test', {visibility: true});
    });

    describe('Update incorrect data', () => {
        it('Should not update a non-existing template data and/or add the incorrect data or template', () => {
            let initialData = JSON.parse(JSON.stringify(tacoData._main));

            updateHandler.update({'test33': {count: 2}});
            expect(tacoData._main['test33']).toBe(undefined);
            expect(tacoData._main['test']['count']).toBe(undefined);

            expect(tacoData._main).toEqual(initialData);


            expect(updateCB).not.toHaveBeenCalled();


        });

        it('Should not update an existing template data if the data passed is empty', () => {
            let initialData = JSON.parse(JSON.stringify(tacoData._main));
            updateHandler.update({'test': {}});
            expect(tacoData._main).toEqual(initialData);

            expect(updateCB).not.toHaveBeenCalled();
        });
    });

    describe('Update', () => {
        it('Should update the data in a given template as passed in the data obj', () => {
            expect(tacoData._main['test']['visibility']).toBe(true);
            updateHandler.update({'test': {visibility: false}});
            expect(tacoData._main['test']['visibility']).toBe(false);
            expect(updateCB).toHaveBeenCalledTimes(1);

            // updating an existing template with incorrect template name, case insensitive
            updateHandler.update({'TesT': {visibility: true}});
            expect(tacoData._main['test']['visibility']).toBe(true);
        });

        it('Should add the passed property with value to the DOM element object', () => {
            let headerElement = document.createElement('h1');
            headerElement.setAttribute("taco-template", 'dom-test');
            headerElement.setAttribute("taco-name", 'taco-title');
            document.body.appendChild(headerElement);

            tacoData.addTemplate('dom-test', {'taco-title': 'title'});
            let testElement = document.querySelector('[taco-template="dom-test" i] [taco-name="taco-title" i], [taco-template="dom-test" i][taco-name="taco-title" i]');
            updateHandler.update({'dom-test': {'taco-title title': 'test title'}});
            expect(setByPath).toHaveBeenCalledWith(testElement, 'title', 'test title');
            // console.log('text', testElement.innerText);
            // expect(testElement.innerHTML).toBe('test title');

            // let date = Date.now();
            // updateHandler.update({'dom-test': {'__timecode__': date}});
            // expect(setByPath).toHaveBeenCalledWith(testElement, '__timecode__', date);

        });

        // it('should add non existing controls to existing templates', () => {
        //     expect(tacoData._main['test']['testControl']).toBe(undefined);
        //     updateHandler.update({'test': {testControl: "hi"}});
        //     expect(tacoData._main['test']['testControl']).toBe('hi');
        // });
    });

});