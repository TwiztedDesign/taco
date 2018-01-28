const sinon          = require('sinon');
const expect         = require('chai').expect;
const tacoData       = require('../../../src/core/tacoData.js');
const updateHandler  = require('../../../src/core/handlers/updateHandler.js');

describe("handlers", () => {
    before(() => {
        tacoData.add('test', {visibility: true});
        console.log(tacoData.updateCB);
    });

    describe("Update", () => {
        it("Should update the data in a given template as passed in the data obj", () => {
            let updateCB = sinon.spy(tacoData, 'updateCB');
            updateHandler.update({test: {visibility: false}});
            // expect(tacoData.main.test.visibility).to.equal(false);
            sinon.assert.called(updateCB);
        });
    });
});