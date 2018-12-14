/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';
import modalActionType from './parkingModal/actionType';

const initialManageParkingsState = {
    parkingData: [],
    parkingCategories: [],
    parkingBookingStates: [],
    showProgress: false,
    showAddParkingModal: false,
    showEditParkingModal: false,
    parkingSearchSuggestions: []
};


export default function (state = initialManageParkingsState, action) {
    switch (action.type) {

        case actionType.GET_PARKINGS_SUCCESS:
        {
            return Object.assign({}, state, {
                parkingData: action.payload
            });
        }

        case actionType.PARKING_SUGGESTIONS_FETCH_SUCCESS:
        {
            return Object.assign({}, state, {
                parkingSearchSuggestions: action.payload.searchSuggestions
            });
        }

        case actionType.PARKING_SUGGESTIONS_CLEAR:
        {
            return Object.assign({}, state, {
                parkingSearchSuggestions: []
            });
        }

        case actionType.NEW_PARKING_ADDED:
        {
            let newState = JSON.parse(JSON.stringify(state));
            newState.count = newState.count + 1;
            if (newState.parkingData.length < 10) {
                newState.parkingData.push(action.payload.newParking);
            }
            return newState;
        }

        case actionType.SHOW_ADD_PARKING_MODAL:
        {
            return (Object.assign({}, state, {
                showAddParkingModal: true
            }));
        }

        case actionType.HIDE_ADD_PARKING_MODAL:
        {
            return (Object.assign({}, state, {
                showAddParkingModal: false
            }));
        }
        case actionType.SET_TOTAL_PARKING_COUNT:
        {
            let newState = Object.assign({}, state, {
                count: action.payload.count
            });
            console.log('new state with count is ', newState);
            return newState;
        }

        case actionType.SHOW_EDIT_PARKING_MODAL:
        {
            return (
                Object.assign({}, state, {
                    showEditParkingModal: true
                })
            );
        }
        case actionType.HIDE_EDIT_PARKING_MODAL:
        {
            return (
                Object.assign({}, state, {
                    showEditParkingModal: false
                })
            );
        }
        case actionType.SET_PARKING_BOOKING_STATES:
        {
            return (Object.assign({}, state, {
                parkingBookingStates: action.data
            }))
        }
        case actionType.SET_PARKING_CATEGORIES:
        {
            return (Object.assign({}, state, {
                parkingCategories: action.data
            }))
        }
        case modalActionType.UPDATE_PARKING_INFORMATION:
        {
            let newState = JSON.parse(JSON.stringify(state));
            let data = action.payload;
            for (let i = newState.parkingData.length - 1; i >= 0; i--) {
                if (data.id == newState.parkingData[i].id) {
                    newState.parkingData[i] = data;
                    break;
                }
            }
            return newState;
        }

        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/parking") != 0) {
                return JSON.parse(JSON.stringify(initialManageParkingsState));
            } else {
                return state;
            }
        }

        default:
            return state;
    }
}
