/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import {createSelector} from 'reselect';

const getParkingLotsCount = (state)=> {
    if (state.manage && state.manage.parkingLot) {
        return state.manage.parkingLot.count
    } else {
        return 0;
    }
};

const getParkingLotsPageCount = (totalParkingLots) => {
    let parkingLotsPerPage = 10;
    return totalParkingLots % parkingLotsPerPage != 0 ? parseInt(totalParkingLots / parkingLotsPerPage) + 1 : parseInt(totalParkingLots / parkingLotsPerPage);
};

const parkingLotPages = createSelector(getParkingLotsCount, getParkingLotsPageCount);

exports.selector = {parkingLotPages};