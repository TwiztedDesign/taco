const expect = require('chai').expect;
import {tacoData} from '../../src/core/tacodata.js';
const data = {visibility: false};

describe('Taco Data', () => {
    before(function(){
        tacoData.add('test', data);
    });

    describe('Add template', () => {
        it('Should add a gfx template to a page', () => {
            console.log(tacoData._main);
            expect(tacoData._main).to.have.own.property('test');
            expect(tacoData._proxy['test']).to.deep.equal(data);
        });
    });

    describe('Show', () => {
        it("Should set the visibility property value to true in the given template", () => {
            tacoData.show('test');
            expect(tacoData._main['test']['visibility']).to.equal(true);
            expect(tacoData._proxy['test']['visibility']).to.equal(true);
        });
    });
    //
    // describe('Hide', () => {
    //     it("Should set the visibility property value to false in the given template", () => {
    //         tacoData.hide('test');
    //         expect(tacoData._main['test']['visibility']).to.equal(false);
    //         expect(tacoData._proxy['test']['visibility']).to.equal(false);
    //     });
    // });
    //
    // describe('Toggle', () => {
    //     it("Should set the visibility property to the opposite of the current value in the given template", () => {
    //         let currentVisibility = tacoData.main['test']['visibility'];
    //         tacoData.toggle('test');
    //         expect(tacoData._main['test']['visibility']).to.equal(!currentVisibility);
    //         expect(tacoData._proxy['test']['visibility']).to.equal(!currentVisibility);
    //     });
    // });
});