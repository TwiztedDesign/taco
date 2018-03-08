import {tacoData} from '../../src/core/tacodata.js';
const api       = require('../../src/core/api.js');
const messenger = require('../../src/utils/messenger.js');

describe("api", () =>{
    beforeEach(() => {
        tacoData.clear();
    });

   describe("Go", () => {
      it("Should post a massage", () => {
          const send = jest.spyOn(messenger, 'send');
          api.go('test', 0);
          expect(send).toHaveBeenCalledTimes(1);
          expect(send).toHaveBeenCalledWith('taco-go', {target: 'test', time: 0});

      });
   });

    describe("Show", () => {
        it("Should change the visibility value of the passed template to true", () => {
            tacoData.addTemplate('test', {visibility: false});
            const show = jest.spyOn(tacoData, 'show');
            api.show('test');

            expect(show).toHaveBeenCalledTimes(1);
            expect(show).toHaveBeenCalledWith('test');
            expect(tacoData._main['test']['visibility']).toEqual(true);
            expect(tacoData._proxy['test']['visibility']).toEqual(true);

        });
    });

    describe("Hide", () => {
        it("Should change the visibility value of the passed template to false", () => {
            tacoData.addTemplate('test', {visibility: true});
            const hide = jest.spyOn(tacoData, 'hide');
            api.hide('test');

            expect(hide).toHaveBeenCalledTimes(1);
            expect(hide).toHaveBeenCalledWith('test');
            expect(tacoData._main['test']['visibility']).toEqual(false);
            expect(tacoData._proxy['test']['visibility']).toEqual(false);

        });
    });

    describe("Toggle", () => {
        it("Should change the visibility value of the passed template to opposite of the current value", () => {
            tacoData.addTemplate('test', {visibility: true});
            const toggle = jest.spyOn(tacoData, 'toggle');

            api.toggle('test');

            expect(tacoData._main['test']['visibility']).toEqual(false);
            expect(tacoData._proxy['test']['visibility']).toEqual(false);

            api.toggle('test');

            expect(tacoData._main['test']['visibility']).toEqual(true);
            expect(tacoData._proxy['test']['visibility']).toEqual(true);

            expect(toggle).toHaveBeenCalledWith('test');
            expect(toggle).toHaveBeenCalledTimes(2);

        });
    });

});
