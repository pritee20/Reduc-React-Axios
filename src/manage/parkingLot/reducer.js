/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';
import modalActionType from './parkingLotModal/actionType';

const initialManageParkingLotsState = {
    parkingLotSearchSuggestions: [],
    parkingLotData: [],
    showAddParkingLotModal: false,
    showEditParkingLotModal: false,
    parkingTypes: [],
    ticketingSystems: [],
    parkingAreaTypes: [],
    showProgress: false
};


export default function (state = initialManageParkingLotsState, action) {
    switch (action.type) {
        case actionType.SET_PARKING_TYPES:
        {
            return (Object.assign({}, state, {
                parkingTypes: action.payload.parkingTypes
            }))
        }

        case actionType.NEW_PARKING_LOT_SEACH_SUGGESTIONS:
        {
            return (Object.assign({}, state, {
                parkingLotSearchSuggestions: action.payload.searchSuggestions
            }));
        }


        case actionType.CLEAR_PARKING_LOT_SEARCH_SUGGESTIONS:
        {
            return (Object.assign({}, state, {
                parkingLotSearchSuggestions: []
            }));
        }
        case modalActionType.UPDATE_PARKING_LOT_INFORMATION:
        {
            let newState = JSON.parse(JSON.stringify(state));
            let data = action.payload;
            for (let i = newState.parkingLotData.length - 1; i >= 0; i--) {
                if (data.id == newState.parkingLotData[i].id) {
                    newState.parkingLotData[i] = data;
                    break;
                }
            }

            return newState;
        }
        case actionType.SET_TICKETING_SYSTEMS:
        {
            return (Object.assign({}, state, {
                ticketingSystems: action.payload.ticketingSystems
            }))
        }
        case actionType.SET_PARKING_AREA_TYPES:
        {
            return (Object.assign({}, state, {
                parkingAreaTypes: action.payload.parkingAreaTypes
            }))
        }

        case actionType.NEW_PARKING_LOT_ADDED:
        {
            let newState = JSON.parse(JSON.stringify(state));
            newState.count = newState.count + 1;
            if (newState.parkingLotData.length < 10) {
                newState.parkingLotData.push(action.payload.newParkingLot);
            }
            return newState;

        }

        case actionType.SHOW_PROGRESS_PARKING_LOTS:
        {
            return (Object.assign({}, state, {
                showProgress: true
            }));
        }

        case actionType.HIDE_PROGRESS_PARKING_LOTS:
        {
            return (Object.assign({}, state, {
                showProgress: false
            }));
        }
        case actionType.SHOW_ADD_PARKINGLOT_MODAL:
        {
            return (Object.assign({}, state, {showAddParkingLotModal: true}));
        }
        case actionType.HIDE_ADD_PARKINGLOT_MODAL:
        {
            return (Object.assign({}, state, {showAddParkingLotModal: false}));
        }
        case actionType.SHOW_EDIT_PARKINGLOT_MODAL:
        {
            return (Object.assign({}, state, {showEditParkingLotModal: true}));
        }
        case actionType.HIDE_EDIT_PARKINGLOT_MODAL:
        {
            return (Object.assign({}, state, {showEditParkingLotModal: false}));
        }
        case actionType.SET_PARKING_LOT_COUNT:
        {
            return (Object.assign({}, state, {
                count: action.payload.count
            }));
        }


        case actionType.GET_PARKING_LOTS_SUCCESS:
        {

            return (Object.assign({}, state, {
                parkingLotData: action.payload.parkingLotData
            }));
        }

        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/parkingLot") != 0) {
                return JSON.parse(JSON.stringify(initialManageParkingLotsState));
            } else {
                return state;
            }
        }

        default:
            return state;
    }
}

