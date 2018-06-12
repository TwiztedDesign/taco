const playerApi       = require('../../../src/core/api/player');
const messenger = require('../../../src/utils/messenger.js');

describe("Player Api", () =>{
   describe("Go", () => {
      it("Should post a massage", () => {
          const send = jest.spyOn(messenger, 'send');
          playerApi.go('test', 0);
          expect(send).toHaveBeenCalledTimes(1);
          expect(send).toHaveBeenCalledWith('taco-go', {target: 'test', time: 0});

      });
   });
});