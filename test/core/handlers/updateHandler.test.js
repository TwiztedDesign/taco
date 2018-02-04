import {tacoData} from '../../../src/core/tacodata.js';
const sinon          = require('sinon');
const expect         = require('chai').expect;
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
        it('Should not update the template data and/or add the incorrect data and template', () => {
            let initialData = tacoData._main;
            // updating with non-existing control data
            updateHandler.update({'test': {count: 2}});
            expect(tacoData._main['test']['visibility']).to.equal(true);
            expect(tacoData._main['test']['count']).to.equal(undefined);

            // updating with empty data
            updateHandler.update({'test': {}});
            expect(tacoData._main).to.deep.equal(initialData);

            // updating a non-existing template
            updateHandler.update({'redbox': {count: 2}});
            expect(tacoData._main['redBox']).to.equal(undefined);
            expect(tacoData._main).to.deep.equal(initialData);

            sinon.assert.notCalled(updateCB);
        });
    });

    describe('Update', () => {
        it('Should update the data in a given template as passed in the data obj', () => {
            expect(tacoData._main['test']['visibility']).to.equal(true);
            updateHandler.update({'test': {visibility: false}});
            expect(tacoData._main['test']['visibility']).to.equal(false);
            sinon.assert.called(updateCB);

            // updating an existing template with incorrect template name, case insensitive
            updateHandler.update({'TesT': {visibility: true}});
            expect(tacoData._main['test']['visibility']).to.equal(true);

            sinon.assert.called(updateCB);
        });

        it('should add non existing controls to existing templates', () => {
            expect(tacoData._main['test']['testControl']).to.be.undefined;
            updateHandler.update({'test': {testControl: "hi"}});
            expect(tacoData._main['test']['testControl']).to.equal('hi');
        })
    });

});