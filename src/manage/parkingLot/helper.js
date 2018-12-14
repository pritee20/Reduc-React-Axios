/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export function getParkingLotsFilter(limit, skip, parkingId, searchText) {
    let filter = {
        limit, skip, "include": ["parkings"]
    };

    if (searchText != undefined && searchText.length > 0 && parkingId != undefined) {
        filter["where"] = {
            "parkingId": parkingId,
            "or" : [{
                "id": {
                    "like": '%' + searchText + '%'
                }
            },{
                "name": {
                    "like": '%' + searchText + '%'
                }
            }]

        };
    } else if (parkingId != undefined) {
        filter["where"] = {
            "parkingId": parkingId
        };
    } else if (searchText != undefined && searchText.length > 0) {
        filter["where"] = {
            "or" : [{
                "id": {
                    "like": '%' + searchText + '%'
                }
            },{
                "name": {
                    "like": '%' + searchText + '%'
                }
            }]
        };
    }

    return JSON.stringify(filter);
}

export function getParkingLotCountFilter(parkingId) {
    return JSON.stringify({"parkingId": parkingId});
}