const queryParamsHandler  = require('../../../src/core/handlers/queryParamsHandler.js');

/******************************* global spies ********************************/

const queryParams = jest.spyOn(queryParamsHandler, 'queryParams');

/****************************************************************************/

describe('Query Params Handler', () => {

    describe('Query params', () => {
        it('Should Add the passed query params object to taco data', () => {

            queryParamsHandler.queryParams({inspect: '1'});
            expect(queryParams).toHaveBeenCalledWith({inspect: '1'});

        });
    });
});