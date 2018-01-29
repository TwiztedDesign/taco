const expect = require('chai').expect;
import {tacoData} from '../../src/core/tacodata.js';
const data = {visibility: false};

describe('Taco Data', () => {
    before(() => {
        tacoData.add('test', data);
    });

    describe('Add template', () => {
        it('Should add a gfx template to a page', () => {
            expect(tacoData._main).to.have.own.property('test');
            expect(tacoData._proxy).to.have.own.property('test');
            expect(tacoData.proxy['test']).to.deep.equal(data);
        });
    });

    describe('Show', () => {
        it("Should set the visibility property value to true in the given template", () => {
            tacoData.main['test']['visibility'] = false;
            tacoData.proxy['test']['visibility'] = false;
            tacoData.show('test');
            expect(tacoData.main['test']['visibility']).to.equal(true);
            expect(tacoData.proxy['test']['visibility']).to.equal(true);
        });
    });

    describe('Hide', () => {
        it("Should set the visibility property value to false in the given template", () => {
            tacoData.main['test']['visibility'] = true;
            tacoData.proxy['test']['visibility'] = true;
            tacoData.hide('test');
            expect(tacoData.main['test']['visibility']).to.equal(false);
            expect(tacoData.proxy['test']['visibility']).to.equal(false);
        });
    });

    describe('Toggle', () => {
        it("Should set the visibility property to the opposite of the current value in the given template", () => {
            let currentVisibility = tacoData.main['test']['visibility'];
            tacoData.toggle('test');
            expect(tacoData.main['test']['visibility']).to.equal(!currentVisibility);
            expect(tacoData.proxy['test']['visibility']).to.equal(!currentVisibility);
        });
    });
});