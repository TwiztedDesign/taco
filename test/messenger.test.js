let messenger = require('../src/utils/messenger.js');
//
// describe('Messenger', function () {
//     describe('send', function(){
//         it('should send a message to the parent window object', function (done) {
//             window.parent.addEventListener('message', function(e){
//                 let data = JSON.parse(e.data);
//                 expect(data.type).to.equal('type');
//                 expect(data.payload).to.equal('payload');
//                 done();
//             });
//             messenger.send('type', 'payload');
//
//         })
//     });
//
// });



test("send", (done) => {
    window.parent.addEventListener('message', function(e){
        let data = JSON.parse(e.data);
        expect(data.type).toBe('type');
        expect(data.payload).toBe('payload');
        done()

    });
    messenger.send('type', 'payload');
});




test('dummy test', () => {
    expect(true).toBe(true);
});