import {tacoData} from '../../src/core/tacodata.js';
const messenger = require('../../src/utils/messenger.js');
// import  from '../../src/utils/messenger.js';

let data = {visibility: false};
let send = jest.spyOn(messenger, 'send');

describe('Taco Data', () => {
    beforeEach(() => {
        tacoData.clear();
    });

    describe('Clear', () => {
        it('Should clear all the data', () => {
            tacoData.addTemplate('test', data);
            expect(tacoData._main).toHaveProperty('test');
            expect(tacoData._proxy).toHaveProperty('test');
            tacoData.clear();
            expect(tacoData._main).toEqual({});
            expect(tacoData._proxy).toEqual({});
        });
    });


    describe('Add template', () => {
        it('Should add a template to a page', () => {
            tacoData.addTemplate('test', data);
            expect(tacoData._main).toHaveProperty('test');
            expect(tacoData._proxy).toHaveProperty('test');
            expect(tacoData._main['test']).toEqual(data);
            expect(tacoData._proxy['test']).toEqual(data);

            expect(send).toHaveBeenCalledTimes(1);


        });

        it('Should update or add the data to an already existing template', () => {
            tacoData.addTemplate('test', data);
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

            expect(send).toHaveBeenCalledTimes(3);
        });

        it('Should add and update data in an existing template', () => {
            tacoData.addTemplate('myTest', {count: 2, visibility: true});

            expect(tacoData._main['myTest']).toHaveProperty('count');
            expect(tacoData._proxy['myTest']).toHaveProperty('visibility');
            expect(tacoData._proxy['myTest']).not.toHaveProperty('title');
            tacoData.addTemplate('myTest', {count: 3, visibility: false, title: 'new title'});
            expect(tacoData._main['myTest']['visibility']).toBe(false);
            expect(tacoData._proxy['myTest']['visibility']).toBe(false);
            expect(tacoData._main['myTest']['count']).toBe(3);
            expect(tacoData._proxy['myTest']['count']).toBe(3);
            expect(tacoData._proxy['myTest']).toHaveProperty('title');
            expect(tacoData._main['myTest']['title']).toBe('new title');
            expect(tacoData._proxy['myTest']['title']).toBe('new title');

            expect(send).toHaveBeenCalledTimes(2);

        });

        it('Should not affect or add to the data of an already existing template when passed empty data', () => {
            tacoData.addTemplate('test', data);
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

            expect(send).toHaveBeenCalled();
        });
    });

    describe('Show', () => {
        it('Should set the visibility property value to true in the given template', () => {
            tacoData.addTemplate('test', data);
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
            tacoData.addTemplate('test', data);
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
            tacoData.addTemplate('test', data);
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