import {tacoData} from '../tacodata.js';

function queryParams(data) {
    tacoData.addQueryParams(data);
}

module.exports = {
    queryParams : queryParams
};

