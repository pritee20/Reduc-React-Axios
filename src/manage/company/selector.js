/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import {createSelector} from 'reselect';

const totalCompanies = state => {
    if (state.manage && state.manage.company) {
        return state.manage.company.count;
    } else {
        return 0;
    }
};

const getNumberOfPages = (totalCompanies) => {
    return totalCompanies % 10 != 0 ? parseInt(totalCompanies / 10) + 1 : parseInt(totalCompanies / 10);
};

export default createSelector(totalCompanies, getNumberOfPages);

