const sinon     = require('sinon');
const assert    = require('chai').assert;
const expect    = require('chai').expect;
const api       = require('../../src/core/api.js');
const messenger = require('../../src/utils/messenger.js');

describe("api", () =>{
   describe("Go", () => {
      it("Should post a massage", () => {
          let send = sinon.spy(messenger, 'send');
          api.go('test', 0);
          assert(send.called);
      });
   });
});