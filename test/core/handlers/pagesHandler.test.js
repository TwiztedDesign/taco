import {tacoData} from '../../../src/core/tacodata.js';
import {pages} from '../../../src/core/handlers/pagesHandler.js';

/******************************* global spies ********************************/

const addPages = jest.spyOn(tacoData, 'addPages');


/****************************************************************************/

describe('Pages Handler', () => {
    // beforeEach(() => {
    //     tacoData.clear();
    // });

    describe('Add project pages to taco data', () => {
        it('Should add the pages as per the data array passed', () => {
            pages([{page1: {}}, {page2: {}}]);
            expect(addPages).toBeCalled();
            // console.log(tacoData._pages);

        });

    });

});