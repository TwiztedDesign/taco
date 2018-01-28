const expect = require('chai').expect;
const helpers = require('../../src/utils/helpers.js');

describe('Helpers', function () {
    describe('find key', function(){
        it('Should find a key in a given object, case insensitive', function () {
            let obj = {
                test: {
                    a:{}
                }
            };
            let key = helpers.findKey(obj, 'Test');
            expect(key).to.equal('test');
        });
    });
});
