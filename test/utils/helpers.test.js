let expect = require('chai').expect;
var helpers = require('../../src/utils/helpers.js');

describe('Helpers', function () {
    describe('find key', function(){
        it('Should find a key in a given object, case insensitive', function () {
            var obj = {
                test: {
                    a:{}
                }
            };
            var key = helpers.findKey(obj, 'Test');
            expect(key).to.equal('test');
        });
    });
});
