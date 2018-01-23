const expect = require('chai').expect;
const messenger = require('../src/utils/messenger.js');

import jsdom from 'jsdom';

describe('Messenger', () =>{
    describe('send', () =>{
        it('should send a messege to the parent window object',  (done) =>{
            jsdom.env(
                "<html></html>",
                function(err, window) {
                    global.window = window;
                    window.parent.addEventListener('message', (e) =>{
                        var data = JSON.parse(e.data);
                        expect(data.type).to.equal('type');
                        expect(data.payload).to.equal('payload');
                        done();
                    });
                    messenger.send('type', 'payload');
                }
            );
        })
    });

});
