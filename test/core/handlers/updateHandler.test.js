import {tacoData} from '../../../src/core/tacodata.js';
const updateHandler  = require('../../../src/core/handlers/updateHandler.js');

/******************************* global spies ********************************/

let updateCB = jest.spyOn(tacoData, 'updateCB');


/****************************************************************************/

describe('Update Handler', () => {
    beforeEach(() => {
        tacoData.clear();
        tacoData.addTemplate('test', {visibility: true});
    });

    xdescribe('Update incorrect data', () => {
        it('Should not update the template data and/or add the incorrect data or template', () => {
            let initialData = tacoData._main;
            // updating with non-existing control data
            updateHandler.update({'test': {count: 2}});
            expect(tacoData._main['test']['visibility']).toBe(true);
            expect(tacoData._main['test']['count']).toBe(undefined);

            // updating with empty data
            updateHandler.update({'test': {}});
            expect(tacoData._main).toEqual(initialData);

            // updating a non-existing template
            updateHandler.update({'redBox': {count: 2}});
            expect(tacoData._main['redBox']).toBe(undefined);
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
        });

        it('should add non existing controls to existing templates', () => {
            expect(tacoData._main['test']['testControl']).toBeUndefined();
            updateHandler.update({'test': {testControl: "hi"}});
            expect(tacoData._main['test']['testControl']).toBe('hi');
        })
    });

});