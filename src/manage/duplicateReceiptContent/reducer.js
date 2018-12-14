/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionType';

const initialState = {rcParkingLots: []};

export default function (state = initialState, action) {
    switch (action.type) {

        case actionType.GET_RC_PARKING_LOTS_SUCCESS :
        {
            return Object.assign({}, state, {
                rcParkingLots: action.payload
            })
        }


        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/duplicateReceiptContent") != 0) {
                return {
                    rcParkingLots: []
                };
            } else {
                return state;
            }
        }


        default :
        {
            return state;
        }
    }
}
