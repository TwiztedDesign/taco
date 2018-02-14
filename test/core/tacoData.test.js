import {tacoData} from '../../src/core/tacodata.js';
// const expect = require('chai').expect;
const data = {visibility: false};

describe('Taco Data', () => {
    beforeEach(() => {
        tacoData.clear();
        tacoData.addTemplate('test', data);
    });

    describe('Clear', () => {
        it('Should clear all the data', () => {
            expect(tacoData._main).toHaveProperty('test');
            expect(tacoData._proxy).toHaveProperty('test');
            tacoData.clear();
            expect(tacoData._main).not.toHaveProperty('test');
            expect(tacoData._proxy).not.toHaveProperty('test');
        });
    });


    describe('Add template', () => {
        it('Should add a template to a page', () => {
            expect(tacoData._main).toHaveProperty('test');
            expect(tacoData._proxy).toHaveProperty('test');
            expect(tacoData._main['test']).toEqual(data);
            expect(tacoData._proxy['test']).toEqual(data);
        });

        it('Should update or add the data to an already existing template', () => {
            expect(tacoData._main).toHaveProperty('test');
            expect(tacoData._proxy).toHaveProperty('test');

            // add to existing template with existing data
            expect(tacoData._main['test']['visibility']).toBe(false);
            expect(tacoData._proxy['test']['visibility']).toBe(false);
            tacoData.addTemplate('test', {visibility: true});
            expect(tacoData._main['test']['visibility']).toBe(true);
            expect(tacoData._proxy['test']['visibility']).toBe(true);

            // add to existing template with new data
            expect(tacoData._main['test']['count']).toBe(undefined);
            expect(tacoData._proxy['test']['count']).toBe(undefined);
            tacoData.addTemplate('test', {count: 2});
            expect(tacoData._main['test']['visibility']).toBe(true);
            expect(tacoData._proxy['test']['visibility']).toBe(true);
            expect(tacoData._main['test']['count']).toBe(2);
            expect(tacoData._proxy['test']['count']).toBe(2);

            // add to existing template with new data and existing data
            expect(tacoData._main['test']).toHaveProperty('count');
            expect(tacoData._proxy['test']).toHaveProperty('visibility');
            expect(tacoData._proxy['test']).not.toHaveProperty('title');
            tacoData.addTemplate('test', {count: 3, visibility: false, title: 'new title'});
            expect(tacoData._main['test']['visibility']).toBe(false);
            expect(tacoData._proxy['test']['visibility']).toBe(false);
            expect(tacoData._main['test']['count']).toBe(3);
            expect(tacoData._proxy['test']['count']).toBe(3);
            expect(tacoData._proxy['test']).toHaveProperty('title');
            expect(tacoData._main['test']['title']).toBe('new title');
            expect(tacoData._proxy['test']['title']).toBe('new title');
        });

        it('Should not affect or add to the data of an already existing template when passed empty data', () => {
            let initialData = tacoData._main['test'];
            expect(tacoData._main).toHaveProperty('test');
            expect(tacoData._proxy).toHaveProperty('test');
            tacoData.addTemplate('test', {});
            expect(tacoData._main['test']).toEqual(initialData);
            expect(tacoData._proxy['test']).toEqual(initialData);

        });

        it('Should add template with empty data when passed empty data', () => {
            expect(tacoData._main).not.toHaveProperty('myTemplate');
            expect(tacoData._proxy).not.toHaveProperty('myTemplate');
            tacoData.addTemplate('myTemplate', {});
            expect(tacoData._main).toHaveProperty('myTemplate');
            expect(tacoData._proxy).toHaveProperty('myTemplate');
            expect(tacoData._main['myTemplate']).toEqual({});
            expect(tacoData._proxy['myTemplate']).toEqual({});
        });
    });

    describe('Show', () => {
        it('Should set the visibility property value to true in the given template', () => {
            tacoData._main['test']['visibility'] = false;
            tacoData._proxy['test']['visibility'] = false;
            tacoData.show('test');
            expect(tacoData._main['test']['visibility']).toBe(true);
            expect(tacoData._proxy['test']['visibility']).toBe(true);
        });

        it('Should affect the visibility property value in the given template if visibility does not exists' , () => {
            tacoData.addTemplate('myTemplate', {});
            expect(tacoData._main).toHaveProperty('myTemplate');
            expect(tacoData._proxy).toHaveProperty('myTemplate');
            expect(tacoData._main['myTemplate']).not.toHaveProperty('visibility');
            expect(tacoData._proxy['myTemplate']).not.toHaveProperty('visibility');
            tacoData.show('myTemplate');
            expect(tacoData._main['myTemplate']).not.toHaveProperty('visibility');
            expect(tacoData._proxy['myTemplate']).not.toHaveProperty('visibility');
        });
    });

    describe('Hide', () => {
        it('Should set the visibility property value to false in the given template', () => {
            tacoData._main['test']['visibility'] = true;
            tacoData._proxy['test']['visibility'] = true;
            tacoData.hide('test');
            expect(tacoData._main['test']['visibility']).toBe(false);
            expect(tacoData._proxy['test']['visibility']).toBe(false);
        });

        it('Should affect the visibility property value in the given template if visibility doesn\'t exists' , () => {
            tacoData.addTemplate('myTemplate', {});
            expect(tacoData._main).toHaveProperty('myTemplate');
            expect(tacoData._proxy).toHaveProperty('myTemplate');
            expect(tacoData._main['myTemplate']).not.toHaveProperty('visibility');
            expect(tacoData._proxy['myTemplate']).not.toHaveProperty('visibility');
            tacoData.hide('myTemplate');
            expect(tacoData._main['myTemplate']).not.toHaveProperty('visibility');
            expect(tacoData._proxy['myTemplate']).not.toHaveProperty('visibility');
        });
    });

    describe('Toggle', () => {
        it('Should set the visibility property to the opposite of the current value in the given template', () => {
            let currentVisibility = tacoData._main['test']['visibility'];
            tacoData.toggle('test');
            expect(tacoData._main['test']['visibility']).toBe(!currentVisibility);
            expect(tacoData._proxy['test']['visibility']).toBe(!currentVisibility);
        });

        it('Should affect the visibility property value in the given template if visibility doesn\'t exists' , () => {
            tacoData.addTemplate('myTemplate', {});
            expect(tacoData._main).toHaveProperty('myTemplate');
            expect(tacoData._proxy).toHaveProperty('myTemplate');
            expect(tacoData._main['myTemplate']).not.toHaveProperty('visibility');
            expect(tacoData._proxy['myTemplate']).not.toHaveProperty('visibility');
            tacoData.toggle('myTemplate');
            expect(tacoData._main['myTemplate']).not.toHaveProperty('visibility');
            expect(tacoData._proxy['myTemplate']).not.toHaveProperty('visibility');
        });
    });

});