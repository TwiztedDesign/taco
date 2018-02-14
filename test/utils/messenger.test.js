const messenger = require('../../src/utils/messenger.js');

describe('Messenger', function () {
    describe('send', function(){
        it('should send a message to the parent window object', function (done) {
            window.parent.addEventListener('message', function(e){
                let data = JSON.parse(e.data);
                expect(data.type).toBe('type');
                expect(data.payload).toBe('payload');
                done();
            });
            messenger.send('type', 'payload');
        })
    });
});