import {tacoData} from '../../../src/core/tacodata.js';
const sinon          = require('sinon');
const expect         = require('chai').expect;
const assert         = require('chai').assert;
const updateHandler  = require('../../../src/core/handlers/updateHandler.js');

/******************************* global spies ********************************/

let updateCB = sinon.spy(tacoData, 'updateCB');

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
            expect(tacoData._main['test33']).to.equal(undefined);
            expect(tacoData._main['test']['count']).to.equal(undefined);

            expect(tacoData._main).to.deep.equal(initialData);

            assert(updateCB.notCalled, 'updateCB function was called where it should not');
        });

        it('Should not update an existing template data if the data passed is empty', () => {
            let initialData = JSON.parse(JSON.stringify(tacoData._main));
            updateHandler.update({'test': {}});
            expect(tacoData._main).to.deep.equal(initialData);

            assert(updateCB.notCalled, 'updateCB function was called where it should not');
        });
    });

    describe('Update', () => {
        it('Should update the data in a given template as passed in the data obj', () => {
            expect(tacoData._main['test']['visibility']).to.equal(true);
            updateHandler.update({'test': {visibility: false}});
            expect(tacoData._main['test']['visibility']).to.equal(false);
            // assert(updateCB.calledOnce, 'function was called more than once');

            // updating an existing template with incorrect template name, case insensitive
            updateHandler.update({'TesT': {visibility: true}});
            expect(tacoData._main['test']['visibility']).to.equal(true);

            // assert(updateCB.calledOnce, 'function was called more than once');
        });

        // it('should add non existing controls to existing templates', () => {
        //     expect(tacoData._main['test']['testControl']).to.equal(undefined);
        //     updateHandler.update({'test': {testControl: "hi"}});
        //     expect(tacoData._main['test']['testControl']).to.equal('hi');
        // });
    });

});