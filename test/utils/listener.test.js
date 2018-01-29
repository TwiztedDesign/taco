const sinon     = require('sinon');
const listener = require('../../src/utils/listener.js');

describe("listener", () =>{
    describe("Start", () => {
        it("Should add to the window obj an event listener for 'massage'", () => {
            let addEventListener = sinon.spy(window, 'addEventListener');
            listener.start();
            sinon.assert.calledWith(addEventListener, "message");
        });
    });
});