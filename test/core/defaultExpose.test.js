import '../../src/core/defaultExpose';

describe('Default Expose', () => {

    describe('Expose header element', () => {

        it('Should expose text and color for header element', () => {
            var headerElement = document.createElement('h1');
            expect(headerElement.expose()).toEqual({text : 'innerText', color : {path : 'style.color', ui : 'color'}});
        });

    });

    describe('Expose span element', () => {

        it('Should expose text for span element', () => {
            var spanElement = document.createElement('span');
            expect(spanElement.expose()).toEqual({text : 'innerText'});
        });

    });

    describe('Expose paragraph element', () => {

        it('Should expose text for paragraph element', () => {
            var paragraphElement = document.createElement('p');
            expect(paragraphElement.expose()).toEqual({text : 'innerText'});
        });

    });

    describe('Expose image element', () => {

        it('Should expose src for image element', () => {
            var imageElement = document.createElement('img');
            expect(imageElement.expose()).toEqual({source : 'src'});
        });

    });
});