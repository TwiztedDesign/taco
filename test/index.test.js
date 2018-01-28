let expect = require('chai').expect;
import {tacoData} from '../src/core/tacodata.js';

describe('Taco', function () {
    describe('first test', function(){
        it('should pass', function () {
            expect(true).to.be.true;
        })
    });

    describe("Taco data", function(){
        it("should work", function(){
            tacoData.add("name", {visibility: false});
        })
    })

});
