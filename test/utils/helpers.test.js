const helpers = require('../../src/utils/helpers.js');

let obj = {
    test: {
        a:{}
    }
};

describe('Helpers', function () {
    describe('find key', function(){
        it('Should find a key in a given object, case insensitive', function () {
            expect(helpers.findKey(obj, 'Test')).toBe('test');
        });

        it('Should return undefined for a key in a given object if said key does not exists', function () {
            expect(helpers.findKey(obj, 'testKey')).toBe(undefined);
        });

        it('Should return either key in a given object if two keys have the same value variation', function () {
            let obj = {test : {a : {}}, TesT : {b : {}}};
            expect(obj).toHaveProperty('TesT');
            expect(helpers.findKey(obj, 'TesT')).toBe('test');
        });
    });
});


test('dummy test', () => {
    expect(true).toBe(true);
});