const messenger = require('../../src/utils/messenger.js');

describe('Messenger', () => {
    describe('send', () => {
        it('Should send a message to the parent window object', (done) => {

            function messageHandler(e){
                let data = JSON.parse(e.data);
                expect(data.type).to.equal('type');
                expect(data.payload).to.equal('payload');
                window.parent.removeEventListener('message', messageHandler);
                done();
            }

            window.parent.addEventListener('message', messageHandler);
            send('type', 'payload');

        })
    });
});
