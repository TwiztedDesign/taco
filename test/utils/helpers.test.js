const expect = require('chai').expect;
const helpers = require('../../src/utils/helpers.js');

let obj = {
    test: {
        a:{}
    }
};

describe('Helpers', () => {
    describe('find key', () => {
        it('Should find a key in a given object, case insensitive', () => {
            expect(helpers.findKey(obj, 'Test')).to.equal('test');
        });

        it('Should return undefined for a key in a given object if said key does not exists', () => {
            expect(helpers.findKey(obj, 'testKey')).to.equal(undefined);
        });

        it('Should return either key in a given object if two keys have the same value variation', () => {
            let obj = {test : {a : {}}, TesT : {b : {}}};
            expect(obj).to.have.own.property('TesT');
            expect(helpers.findKey(obj, 'TesT')).to.equal('test');
        });
    });

    describe('Trim', () => {
        it('Should trim the given character from the given string and return the string', () => {
            expect(helpers.trim('**the quick brown fox jumps**', '*')).to.equal('the quick brown fox jumps');
        });

        it('Should not trim the given character if it does not exist in the given string and return the string', () => {
            expect(helpers.trim('**the quick brown fox jumps**', ',')).to.equal('**the quick brown fox jumps**');
        });

        it('Should trim space if no character argument was passed and return the string', () => {
            expect(helpers.trim(' the quick brown fox jumps ')).to.equal('the quick brown fox jumps');
        });
    });
});
