const expect = require('chai').expect;
const should = require('chai').should;
const api = require('../../src/core/api.js');
const messenger = require('../../src/utils/messenger.js');

describe("api", () =>{
   describe.skip("Go", () => {
      it("Should post a massage", () => {
          api.go('test', 0);
          messenger.send.should.have.been.called;
      });
   });
});