const expect = require('chai').expect;
const tacoData = require('../../src/core/tacoData.js');

describe('Taco Data', () => {
    describe.skip('Add template', () => {
        it('Should add a gfx template to a page', () => {
            let data = {visibility: false};
            // tacoData.add('test', data);
            // expect(tacoData.main).to.have.own.property('test');
            // expect(tacoData.proxy['test']).to.deep.equal(data);
        });
    });

    describe.skip('Show', () => {
        it("Should set the visibility property value to true in the given template", () =>{
            tacoData.show('test');
            expect(tacoData.main['test']).to.equal(true);
        });
    });

    describe.skip('Hide', () => {
        it("Should set the visibility property value to false in the given template", () =>{
            tacoData.hide('test');
            expect(tacoData.main['test']).to.equal(false);
        });
    });
});