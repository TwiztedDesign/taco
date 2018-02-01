const expect    = require('chai').expect;
const helpers   = require('../../src/utils/helpers.js');

let obj, setByPath;

describe('Helpers', () => {
    before(() => {
        obj = {
            test:{}
        };
    });

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
            expect(helpers.trim('.the quick brown fox jumps.', '.')).to.equal('the quick brown fox jumps');
            expect(helpers.trim('the quick. brown fox jumps', '.')).to.equal('the quick. brown fox jumps');
        });

        it('Should not trim the given character if it does not exist in the given string and return the string', () => {
            expect(helpers.trim('**the quick brown fox jumps**', ',')).to.equal('**the quick brown fox jumps**');
            expect(helpers.trim('the quick. brown fox jumps', ',')).to.equal('the quick. brown fox jumps');
        });

        it('Should trim space if no character argument was passed and return the string', () => {
            expect(helpers.trim(' the quick brown fox jumps ')).to.equal('the quick brown fox jumps');
        });
    });

    describe('Get by path', () => {
        beforeEach(() => {
            obj = {
                a:{
                    b:{
                        c: 2
                    }
                }
            };

        });

        it('Should return the data in the given object based on the given path separated by dots', () => {
            expect(helpers.getByPath(obj, 'a.b.c')).to.equal(2);
            expect(helpers.getByPath(obj, 'a.b')).to.eql({c: 2});
            expect(helpers.getByPath(obj, 'a')).to.eql({b:{c: 2}});
        });

        it('Should return the data in the given object based on the given partial/missing path separated by dots', () => {
            expect(helpers.getByPath(obj, 'a.b.')).to.eql({c: 2});
            expect(helpers.getByPath(obj, '.a.')).to.eql({b:{c: 2}});
            expect(helpers.getByPath(obj, '.a.b.c.')).to.equal(2);
        });

        it('Should return the undefined if incorrect path was given', () => {
            expect(helpers.getByPath(obj, 'c.b.a')).to.equal(undefined);
            expect(helpers.getByPath(obj, 'a.c.d')).to.equal(undefined);
        });

        it('Should return the undefined if no path was given', () => {
            expect(helpers.getByPath(obj)).to.equal(undefined);
        });
    });

    describe('Set by path', () => {
        beforeEach(() => {
            obj = {
                a:{
                    b:{
                        c: 3
                    }
                }
            };

        });

        it('Should set the given value in the given object based on the given path separated by dots', () => {
            helpers.setByPath(obj, 'a.b.c', 2);
            expect(obj.a.b.c).to.equal(2);
            helpers.setByPath(obj, 'a.b', 4);
            expect(obj.a.b).to.equal(4);
            helpers.setByPath(obj, 'a', 1);
            expect(obj.a).to.equal(1);
        });

        it('Should set the given value in the given object based on the given partial/missing path separated by dots', () => {
            helpers.setByPath(obj, 'a.b.c.', 2);
            expect(obj.a.b.c).to.equal(2);
            helpers.setByPath(obj, '.a.b.', 4);
            expect(obj.a.b).to.equal(4);
            helpers.setByPath(obj, '.a.', 1);
            expect(obj.a).to.equal(1);
        });

        it('Should leave the object as is if incorrect path was given', () => {
            helpers.setByPath(obj, 'a..c.', 2);
            expect(obj).to.deep.equal(obj);
            helpers.setByPath(obj, 'c.a.b', 2);
            expect(obj).to.deep.equal(obj);
        });

        it('Should throw an Error "Missing Arguments" if all 3 arguments of the function were not passed', () => {
            expect(helpers.setByPath).to.throw(Error, 'Missing Arguments!');
        });
    });
});
