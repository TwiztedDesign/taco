let expect = require('chai').expect;
let messenger = require('../src/utils/messenger.js');

import jsdom from 'jsdom';

describe('Messenger', function () {
    describe('send', function(){
        it('should send a message to the parent window object', function (done) {
            jsdom.env(
                "<html></html>",
                function(err, window) {
                    global.window = window;
                    window.parent.addEventListener('message', function(e){
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
