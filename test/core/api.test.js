const sinon     = require('sinon');
const api       = require('../../src/core/api.js');
const messenger = require('../../src/utils/messenger.js');

describe("api", () =>{
   describe("Go", () => {
      it("Should post a massage", () => {
          let send = sinon.spy(messenger, 'send');
          api.go('test', 0);
          sinon.assert.calledWith(send, "taco-go", {target: 'test', time: 0});
      });
   });
});