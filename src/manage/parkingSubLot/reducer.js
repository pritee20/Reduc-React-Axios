/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';
import modalActionTyoe from './parkingSubLotModal/actionType';

const initialManageParkingSubLotsState = {
    showAddParkingSubLotModal: false,
    subLotTypes: [],
    collectionModels: [],
    plateNumberTypes: [],
    parkingSubLotData: [],
    showProgress: false,
    showAddUserModal: false,
    showEditParkingSubLotModal: false
};


export default function (state = initialManageParkingSubLotsState, action) {
    switch (action.type) {
        case actionType.SHOW_ADD_PARKINGSUBLOT_MODAL:
        {
            return (Object.assign({}, state, {showAddParkingSubLotModal: true}));
        }


        case actionType.SHOW_EDIT_PARKING_SUBLOT_MODAL:
        {
            return (Object.assign({}, state, {showEditParkingSubLotModal: true}));
        }
        case actionType.GET_PARKING_SUBLOT_COUNT_SUCCESS:
        {
            return (Object.assign({}, state, {
                count: action.payload.count
            }));
        }

        case modalActionTyoe.UPDATE_PARKING_SUB_LOT_INFORMATION:
        {
            let newState = JSON.parse(JSON.stringify(state));
            let length = newState.parkingSubLotData.length;
            let data = action.payload;
            for (let index = 0; index < length; index++) {
                if (newState.parkingSubLotData[index].id == data.id) {
                    newState.parkingSubLotData[index] = data;
                    break;
                }
            }
            return newState;
        }

        case actionType.GET_PARKING_SUB_LOTS_SUCCESS:
        {
            return (Object.assign({}, state, {
                parkingSubLotData: action.payload.subLots
            }))
        }


        case actionType.HIDE_EDIT_PARKING_SUBLOT_MODAL:
        {
            return (Object.assign({}, state, {showEditParkingSubLotModal: false}));
        }

        case actionType.HIDE_ADD_PARKINGSUBLOT_MODAL:
        {
            return (Object.assign({}, state, {showAddParkingSubLotModal: false}));
        }


        case actionType.NEW_PARKING_SUBLOT_CREATED:
        {
            let newState = JSON.parse(JSON.stringify(state));
            newState.count = newState.count + 1;
            if (newState.parkingSubLotData.length < 10) {
                newState.parkingSubLotData.push(action.payload.subLot);
            }
            return newState;
        }
        case actionType.SET_PARKINGSUBLOT_TYPES:
        {
            return (Object.assign({}, state, {subLotTypes: action.payload.subLotTypes}));
        }
        case actionType.SET_COLLECTION_MODELS:
        {
            console.log('action object in SET_COLLECTION_MODELS is ', action);

            return (Object.assign({}, state, {collectionModels: action.payload.collectionModels}));
        }
        case actionType.SET_PLATE_NUMBER_TYPES:
        {
            return (Object.assign({}, state, {plateNumberTypes: action.payload.plateNumberTypes}));
        }

        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/parkingSubLot") != 0) {
                return JSON.parse(JSON.stringify(initialManageParkingSubLotsState));
            } else {
                return state;
            }
        }


        default:
            return state;
    }
}

