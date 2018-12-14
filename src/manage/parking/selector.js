/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import {createSelector} from 'reselect';

const getParkingsCount = (state)=> {
    if (state.manage && state.manage.parking) {
        return state.manage.parking.count
    } else {
        return 0;
    }
};

const getParkingsPageCount = (totalParkings) => {
    console.log('total parkings are ', totalParkings);
    let parkingsPerPage = 10;
    return totalParkings % parkingsPerPage != 0 ? parseInt(totalParkings / parkingsPerPage) + 1 : parseInt(totalParkings / parkingsPerPage);
};

const parkingPages = createSelector(getParkingsCount, getParkingsPageCount);

exports.selector = {parkingPages};