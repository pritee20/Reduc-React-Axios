/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import {createSelector} from 'reselect';

const getParkingSubLotsCount = (state)=> {
    if (state.manage && state.manage.parkingSubLot) {
        return state.manage.parkingSubLot.count
    } else {
        return 0;
    }
};

const getParkingSubLotsPageCount = (totalParkingSubLots) => {
    let parkingLotsPerPage = 10;
    return totalParkingSubLots % parkingLotsPerPage != 0 ? parseInt(totalParkingSubLots / parkingLotsPerPage) + 1 : parseInt(totalParkingSubLots / parkingLotsPerPage);
};

const parkingSubLotPages = createSelector(getParkingSubLotsCount, getParkingSubLotsPageCount);

exports.selector = {parkingSubLotPages};