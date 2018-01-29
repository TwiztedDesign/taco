import {tacoData} from '../../../src/core/tacodata.js';
const sinon          = require('sinon');
const expect         = require('chai').expect;
const updateHandler  = require('../../../src/core/handlers/updateHandler.js');

describe("handlers", () => {
    before(() => {
        tacoData.clear();
        tacoData.addTemplate('test', {visibility: true});
    });

    describe("Update", () => {
        it("Should update the data in a given template as passed in the data obj", () => {
            let updateCB = sinon.spy(tacoData, 'updateCB');
            updateHandler.update({'test': {visibility: false}});
            expect(tacoData._main['test']['visibility']).to.equal(false);
            sinon.assert.calledOnce(updateCB);
        });
    });
});