import TacoElement from '../../src/core/tacoElement';

describe('Taco Element', () => {

    describe('New Element', () => {

        it('Should initialize the taco element', () => {

            let headerElement = document.createElement('h1');
            headerElement.setAttribute("taco-template", 'new template');
            headerElement.setAttribute("taco-name", 'title');
            document.body.appendChild(headerElement);

            let tacoElementCreated = new TacoElement('h1');
            expect(tacoElementCreated.element).toEqual(headerElement);
            // let tacoElementCreated = new TacoElement('<h1>');
            // expect(tacoElementCreated.element).toEqual(headerElement);
        });

        it('Should throw error, Invalid Node', () => {
            expect(() =>{new TacoElement('<h1');}).toThrow();
        });
    });

});