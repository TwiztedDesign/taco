const expect = require('chai').expect;
const helpers = require('../../src/utils/helpers.js');

let obj = {
    test: {
        a:{}
    }
};

describe('Helpers', function () {
    describe('find key', function(){
        it('Should find a key in a given object, case insensitive', function () {
            expect(helpers.findKey(obj, 'Test')).to.equal('test');
        });

        it('Should return undefined for a key in a given object if said key does not exists', function () {
            expect(helpers.findKey(obj, 'testKey')).to.equal(undefined);
        });

        it('Should return either key in a given object if two keys have the same value variation', function () {
            let obj = {test : {a : {}}, TesT : {b : {}}};
            expect(obj).to.have.own.property('TesT');
            expect(helpers.findKey(obj, 'TesT')).to.equal('test');
        });
    });
});
