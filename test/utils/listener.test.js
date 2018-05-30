
const listener = require('../../src/utils/listener.js');

describe("listener", () =>{
    describe("Start", () => {
        it("Should add to the window obj an event listener for 'massage'", () => {
            const spy = jest.spyOn(window, 'addEventListener');
            listener.start();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith('message', expect.any(Function), false);


        });
    });
});


test('dummy test', () => {
    expect(true).toBe(true);
});