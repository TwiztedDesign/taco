const expect    = require('chai').expect;
const messenger = require('../../src/utils/messenger.js');

describe('Messenger', function () {
    describe('send', function(){
        it('should send a message to the parent window object', function (done) {
            window.parent.addEventListener('message', function(e){
                let data = JSON.parse(e.data);
                expect(data.type).to.equal('type');
                expect(data.payload).to.equal('payload');
                done();
            });
            messenger.send('type', 'payload');
        })
    });
});
