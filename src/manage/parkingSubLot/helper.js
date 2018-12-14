/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import {push} from 'react-router-redux';
import store from '../../store';
import {getAllCollectionModel} from './parkingSubLotModal/actions';

export function getParkingSubLotsFilter(limit, skip, parkingLotId, searchText) {
    let filter = {limit, skip};

    if (searchText != undefined && searchText.length > 0 && parkingLotId != undefined) {
        filter["where"] = {
            "parkingLotId": parkingLotId,
            "name": {
                "like": searchText + '%'
            }
        };
    } else if (parkingLotId != undefined) {
        filter["where"] = {
            "parkingLotId": parkingLotId
        };
    } else if (searchText != undefined && searchText.length > 0) {
        filter["where"] = {
            "name": {
                "like": searchText + '%'
            }
        };
    }


    return filter;
}

export function getParkingSublotCountFilter(parkingLotId) {
    return {"parkingLotId": parkingLotId};
}

export function getParkingSubLotsOptionArray(subLots) {
    let options = [];
    for (let i = 0; i < subLots.length; i++) {
        options.push({"value": subLots[i], "text": subLots[i]});
    }
    return options;
}
