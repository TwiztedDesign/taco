const expect    = require('chai').expect;
const messenger = require('../../src/utils/messenger.js');

function messageHandler(e){
    let data = JSON.parse(e.data);
    expect(data.type).to.equal('type');
    expect(data.payload).to.equal('payload');
}

describe('Messenger', () => {
    describe('send', () => {
        it('Should send a message to the parent window object', (done) => {
            window.parent.addEventListener('message', messageHandler);
            window.parent.removeEventListener('message', messageHandler);
            messenger.send('type', 'payload');
            done();
        })
    });
});
