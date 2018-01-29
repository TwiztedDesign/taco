import {tacoData} from '../../../src/core/tacodata.js';
const sinon          = require('sinon');
const expect         = require('chai').expect;
const updateHandler  = require('../../../src/core/handlers/updateHandler.js');

describe("handlers", () => {
    before(() => {
        tacoData.add('test2', {visibility: true});
    });

    describe("Update", () => {
        it("Should update the data in a given template as passed in the data obj", () => {
            let updateCB = sinon.spy(tacoData, 'updateCB');
            updateHandler.update({'test2': {visibility: false}});
            expect(tacoData._main['test2']['visibility']).to.equal(false);
            sinon.assert.called(updateCB);
        });
    });
});