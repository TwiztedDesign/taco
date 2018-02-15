const api       = require('../../src/core/api.js');
const messenger = require('../../src/utils/messenger.js');

describe("api", () =>{
   describe("Go", () => {
      it("Should post a massage", () => {
          const send = jest.spyOn(messenger, 'send');
          api.go('test', 0);
          expect(send).toHaveBeenCalledTimes(1);
          expect(send).toHaveBeenCalledWith('taco-go', {target: 'test', time: 0});

      });
   });
});
