import {tacoData} from '../../src/core/tacodata.js';
const expect = require('chai').expect;
const data = {visibility: false};

describe('Taco Data', () => {
    beforeEach(() => {
        tacoData.clear();
        tacoData.addTemplate('test', data);
    });


    describe('Clear', () => {
        it('Should clear all the data', () => {
            expect(tacoData._main).to.have.own.property('test');
            expect(tacoData._proxy).to.have.own.property('test');
            tacoData.clear();
            expect(tacoData._main).to.not.have.own.property('test');
            expect(tacoData._proxy).to.not.have.own.property('test');
        });
    });


    describe('Add template', () => {
        it('Should add a gfx template to a page', () => {
            expect(tacoData._main).to.have.own.property('test');
            expect(tacoData._proxy).to.have.own.property('test');
            expect(tacoData._proxy['test']).to.deep.equal(data);
        });
    });

    describe('Show', () => {
        it("Should set the visibility property value to true in the given template", () => {
            tacoData._main['test']['visibility'] = false;
            tacoData._proxy['test']['visibility'] = false;
            tacoData.show('test');
            expect(tacoData._main['test']['visibility']).to.equal(true);
            expect(tacoData._proxy['test']['visibility']).to.equal(true);
        });
    });

    describe('Hide', () => {
        it("Should set the visibility property value to false in the given template", () => {
            tacoData._main['test']['visibility'] = true;
            tacoData._proxy['test']['visibility'] = true;
            tacoData.hide('test');
            expect(tacoData._main['test']['visibility']).to.equal(false);
            expect(tacoData._proxy['test']['visibility']).to.equal(false);
        });
    });

    describe('Toggle', () => {
        it("Should set the visibility property to the opposite of the current value in the given template", () => {
            let currentVisibility = tacoData._main['test']['visibility'];
            tacoData.toggle('test');
            expect(tacoData._main['test']['visibility']).to.equal(!currentVisibility);
            expect(tacoData._proxy['test']['visibility']).to.equal(!currentVisibility);
        });
    });
});