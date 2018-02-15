import {tacoData} from '../../src/core/tacodata.js';
// const expect = require('chai').expect;
const data = {visibility: false};
import * as messenger from '../../src/utils/messenger.js';

const sinon         = require('sinon');
const expect        = require('chai').expect;
const assert        = require('chai').assert;

let data = {visibility: false};
let send = sinon.spy(messenger, 'send');

describe('Taco Data', () => {
    beforeEach(() => {
        tacoData.clear();
        tacoData.addTemplate('test', data);
    });

    describe('Clear', () => {
        it('Should clear all the data', () => {
            expect(tacoData._main).to.have.own.property('test');
            expect(tacoData._proxy).to.have.own.property('test');
            tacoData.clear();
            expect(tacoData._main).to.be.empty;
            expect(tacoData._proxy).to.be.empty;
        });
    });


    describe('Add template', () => {
        it('Should add a template to a page', () => {
            expect(tacoData._main).to.have.own.property('test');
            expect(tacoData._proxy).to.have.own.property('test');
            expect(tacoData._main['test']).to.deep.equal(data);
            expect(tacoData._proxy['test']).to.deep.equal(data);

            assert(send.called);
        });

        it('Should update or add the data to an already existing template', () => {
            expect(tacoData._main).to.have.own.property('test');
            expect(tacoData._proxy).to.have.own.property('test');

            // add to existing template with existing data
            expect(tacoData._main['test']['visibility']).to.equal(false);
            expect(tacoData._proxy['test']['visibility']).to.equal(false);
            tacoData.addTemplate('test', {visibility: true});
            expect(tacoData._main['test']['visibility']).to.equal(true);
            expect(tacoData._proxy['test']['visibility']).to.equal(true);

            // add to existing template with new data
            expect(tacoData._main['test']['count']).to.equal(undefined);
            expect(tacoData._proxy['test']['count']).to.equal(undefined);
            tacoData.addTemplate('test', {count: 2});
            expect(tacoData._main['test']['visibility']).to.equal(true);
            expect(tacoData._proxy['test']['visibility']).to.equal(true);
            expect(tacoData._main['test']['count']).to.equal(2);
            expect(tacoData._proxy['test']['count']).to.equal(2);

            assert(send.called);
        });

        it('Should add and update data in an existing template', () => {
            tacoData.addTemplate('myTest', {count: 2, visibility: true});

            expect(tacoData._main['myTest']).to.have.own.property('count');
            expect(tacoData._proxy['myTest']).to.have.own.property('visibility');
            expect(tacoData._proxy['myTest']).to.not.have.own.property('title');
            tacoData.addTemplate('myTest', {count: 3, visibility: false, title: 'new title'});
            expect(tacoData._main['myTest']['visibility']).to.equal(false);
            expect(tacoData._proxy['myTest']['visibility']).to.equal(false);
            expect(tacoData._main['myTest']['count']).to.equal(3);
            expect(tacoData._proxy['myTest']['count']).to.equal(3);
            expect(tacoData._proxy['myTest']).to.have.own.property('title');
            expect(tacoData._main['myTest']['title']).to.equal('new title');
            expect(tacoData._proxy['myTest']['title']).to.equal('new title');

            assert(send.called);

        });

        it('Should not affect or add to the data of an already existing template when passed empty data', () => {
            let initialData = tacoData._main['test'];
            expect(tacoData._main).to.have.own.property('test');
            expect(tacoData._proxy).to.have.own.property('test');
            tacoData.addTemplate('test', {});
            expect(tacoData._main['test']).to.deep.equal(initialData);
            expect(tacoData._proxy['test']).to.deep.equal(initialData);
        });

        it('Should add template with empty data when passed empty data', () => {
            expect(tacoData._main).to.not.have.own.property('myTemplate');
            expect(tacoData._proxy).to.not.have.own.property('myTemplate');
            tacoData.addTemplate('myTemplate', {});
            expect(tacoData._main).to.have.own.property('myTemplate');
            expect(tacoData._proxy).to.have.own.property('myTemplate');
            expect(tacoData._main['myTemplate']).to.be.empty;
            expect(tacoData._proxy['myTemplate']).to.be.empty;

            assert(send.called);
        });
    });

    describe('Show', () => {
        it('Should set the visibility property value to true in the given template', () => {
            tacoData._main['test']['visibility'] = false;
            tacoData._proxy['test']['visibility'] = false;
            tacoData.show('test');
            expect(tacoData._main['test']['visibility']).to.equal(true);
            expect(tacoData._proxy['test']['visibility']).to.equal(true);
        });

        it('Should affect the visibility property value in the given template if visibility does not exists' , () => {
            tacoData.addTemplate('myTemplate', {});
            expect(tacoData._main).to.have.own.property('myTemplate');
            expect(tacoData._proxy).to.have.own.property('myTemplate');
            expect(tacoData._main['myTemplate']).to.not.have.own.property('visibility');
            expect(tacoData._proxy['myTemplate']).to.not.have.own.property('visibility');
            tacoData.show('myTemplate');
            expect(tacoData._main['myTemplate']).to.not.have.own.property('visibility');
            expect(tacoData._proxy['myTemplate']).to.not.have.own.property('visibility');
        });
    });

    describe('Hide', () => {
        it('Should set the visibility property value to false in the given template', () => {
            tacoData._main['test']['visibility'] = true;
            tacoData._proxy['test']['visibility'] = true;
            tacoData.hide('test');
            expect(tacoData._main['test']['visibility']).to.equal(false);
            expect(tacoData._proxy['test']['visibility']).to.equal(false);
        });

        it('Should affect the visibility property value in the given template if visibility doesn\'t exists' , () => {
            tacoData.addTemplate('myTemplate', {});
            expect(tacoData._main).to.have.own.property('myTemplate');
            expect(tacoData._proxy).to.have.own.property('myTemplate');
            expect(tacoData._main['myTemplate']).to.not.have.own.property('visibility');
            expect(tacoData._proxy['myTemplate']).to.not.have.own.property('visibility');
            tacoData.hide('myTemplate');
            expect(tacoData._main['myTemplate']).to.not.have.own.property('visibility');
            expect(tacoData._proxy['myTemplate']).to.not.have.own.property('visibility');
        });
    });

    describe('Toggle', () => {
        it('Should set the visibility property to the opposite of the current value in the given template', () => {
            let currentVisibility = tacoData._main['test']['visibility'];
            tacoData.toggle('test');
            expect(tacoData._main['test']['visibility']).to.equal(!currentVisibility);
            expect(tacoData._proxy['test']['visibility']).to.equal(!currentVisibility);
        });

        it('Should affect the visibility property value in the given template if visibility doesn\'t exists' , () => {
            tacoData.addTemplate('myTemplate', {});
            expect(tacoData._main).to.have.own.property('myTemplate');
            expect(tacoData._proxy).to.have.own.property('myTemplate');
            expect(tacoData._main['myTemplate']).to.not.have.own.property('visibility');
            expect(tacoData._proxy['myTemplate']).to.not.have.own.property('visibility');
            tacoData.toggle('myTemplate');
            expect(tacoData._main['myTemplate']).to.not.have.own.property('visibility');
            expect(tacoData._proxy['myTemplate']).to.not.have.own.property('visibility');
        });
    });

});