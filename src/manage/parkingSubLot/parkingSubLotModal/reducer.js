    /**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionType';
    
const initialEditParkingSubLotModalState = {
    id: "",
    autoCheckoutCost: "",
    autoCheckoutTime: "",
    bookingNotes: "",
    bookingSecurity: "",
    capacity: "",
    collectionModel: "",
    convenienceFee: "",
    insidePhoto: "",
    lastCheckinUpdateTime: "",
    lostTicketFee: "",
    mobileRequired: "",
    parkingLotId: "",
    plateNumberType: "",
    taxiTime: "",
    type: "",
    valetName: "",
    showEditParkingSubLotModal: false,
    challanCost: 0
};

export default function (state = initialEditParkingSubLotModalState, action) {
    switch (action.type) {
        case actionType.SET_EDIT_PARKING_SUB_LOT_MODAL:
        {
            return (
                Object.assign({}, state, {
                    id: action.payload.id,
                    autoCheckoutCost: action.payload.autoCheckoutCost,
                    autoCheckoutTime: action.payload.autoCheckoutTime,
                    bookingNotes: action.payload.bookingNotes,
                    bookingSecurity: action.payload.bookingSecurity,
                    capacity: action.payload.capacity,
                    collectionModel: action.payload.collectionModel,
                    convenienceFee: action.payload.convenienceFee,
                    insidePhoto: action.payload.insidePhoto,
                    lastCheckinUpdateTime: action.payload.lastCheckinUpdateTime,
                    lostTicketFee: action.payload.lostTicketFee,
                    mobileRequired: action.payload.mobileRequired,
                    parkingLotId: action.payload.parkingLotId,
                    plateNumberType: action.payload.plateNumberType,
                    taxiTime: action.payload.taxiTime,
                    type: action.payload.type,
                    valetName: action.payload.valetName,
                    showEditParkingSubLotModal: true,
                    challanCost: action.payload.challanCost
                })
            );
        }
        case actionType.UPDATE_PARKING_SUB_LOT_MODAL:
        {
            var key = action.payload.key;
            var assigningValue = {};
            assigningValue[key] = action.payload.value;
            return (
                Object.assign({}, state, assigningValue)
            );
        }
        case actionType.UPDATE_PARKING_SUB_LOT_INFORMATION:
        {
            return (
                Object.assign({}, state, initialEditParkingSubLotModalState)
            );
        }

        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/parkingSubLot") != 0) {
                return {};
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
