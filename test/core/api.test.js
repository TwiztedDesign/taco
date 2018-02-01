const sinon     = require('sinon');
const api       = require('../../src/core/api.js');
import * as messenger from '../../src/utils/messenger.js';

let send = sinon.spy(messenger, "send");

describe("api", () =>{
   describe("Go", () => {
      it("Should post a massage", () => {
          let sendFn = sinon.spy(send);
          api.go('test', 0);
          sinon.assert.calledWith(send, "taco-go", {target: 'test', time: 0});
      });
   });
});