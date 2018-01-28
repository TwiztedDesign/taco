const expect = require('chai').expect;
const tacoData = require('../src/core/tacodata.js');

describe('Taco', () => {
    describe('first test', () => {
        it('should pass', () => {
            expect(true).to.be.true;
        })
    });

    describe("Taco data", function(){
        it("should work", function(){
            tacoData.add("name", {});
        })
    })

});
