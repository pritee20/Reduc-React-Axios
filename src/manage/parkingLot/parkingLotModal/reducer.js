/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


import actionType from './actionType';

const initialEditParkingLotModalState = {
    id: "",
    name: "",
    avgParkingWeekday: "",
    avgParkingWeekend: "",
    closeTime: "",
    collectionAt: "",
    createdAt: "",
    deleted: "",
    extraNotes: "",
    frontPhoto: "",
    geoLocation: "",
    leftPhoto: "",
    openTime: "",
    parkingId: "",
    parkingOwner: "",
    parkingType: "",
    rightPhoto: "",
    ticketingSystem: "",
    parkingAreaType: "",
    updatedAt: "",
    showEditParkingLotModal: false
};

export default function (state = initialEditParkingLotModalState, action) {
    switch (action.type) {
        case actionType.SET_EDIT_PARKING_LOT_MODAL:
        {
            return (
                Object.assign({}, state, {
                    id: action.payload.id,
                    name: action.payload.name,
                    avgParkingWeekday: action.payload.avgParkingWeekday,
                    avgParkingWeekend: action.payload.avgParkingWeekend,
                    closeTime: action.payload.closeTime,
                    collectionAt: action.payload.collectionAt,
                    createdAt: action.payload.createdAt,
                    deleted: action.payload.deleted,
                    extraNotes: action.payload.extraNotes,
                    frontPhoto: action.payload.frontPhoto,
                    geoLocation: action.payload.geoLocation,
                    leftPhoto: action.payload.leftPhoto,
                    openTime: action.payload.openTime,
                    parkingId: action.payload.parkingId,
                    parkingOwner: action.payload.parkingOwner,
                    parkingType: action.payload.parkingType,
                    rightPhoto: action.payload.rightPhoto,
                    ticketingSystem: action.payload.ticketingSystem,
                    parkingAreaType: action.payload.parkingAreaType,
                    updatedAt: action.payload.updatedAt,
                    showEditParkingLotModal: true
                })
            );
        }
        case actionType.UPDATE_PARKING_LOT_MODAL:
        {
            var key = action.payload.key;
            var assigningValue = {};
            assigningValue[key] = action.payload.value;
            return (
                Object.assign({}, state, assigningValue)
            );
        }
        case actionType.UPDATE_PARKING_LOT_INFORMATION:
        {
            return (
                Object.assign({}, state, initialEditParkingLotModalState)
            );
        }

        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/parkingLot") != 0) {
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

