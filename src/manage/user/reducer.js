/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';
import companyActionType from '../company/actionTypes';

const initialManageUserState = {
    searchSuggestions: [],
    selectedParkingSubLots: [],
    selectedUserAccesses: [],
    showAddParkingSubLotAccessProgress: false,
    showAddUserAccessProgress: false,
    userB2BData: [],
    userB2BDataFetchProgress: false,
    userB2BSearchSuggestions: []
};

export default function (state = initialManageUserState, action) {
    switch (action.type) {

        case actionType.GET_USER_B2B_COUNT_SUCCESS:
        {
            return (Object.assign({}, state, {
                count: action.payload.count
            }));
        }

        case actionType.CLEAR_SEACH_SUGGESTIONS:
        {
            return (Object.assign({}, state, {
                userB2BSearchSuggestions: []
            }));
        }

        case actionType.FETCH_SEARCH_SUGGESTION_SUCCESS:
        {
            return (Object.assign({}, state, {
                userB2BSearchSuggestions: action.payload.searchSuggestions
            }));
        }

        case actionType.GET_USER_B2B_DATA:
        {
            return (Object.assign({}, state, {
                userB2BData: action.payload.userB2BData
            }));
        }

        case actionType.NEW_USER_CREATED:
        {
            let newState = JSON.parse(JSON.stringify(state));
            if (newState.count) {
                newState.count = newState.count + 1;
                if (newState.userB2BData.length < 10) {

                    newState.userB2BData.push(action.payload.userData);
                }
            }
            return newState;
        }

        case actionType.SHOW_USER_B2B_DATA_FETCH_PROGRESS:
        {
            return (Object.assign({}, state, {
                userB2BDataFetchProgress: true
            }));
        }

        case actionType.HIDE_USER_B2B_DATA_FETCH_PROGRESS:
        {
            return (Object.assign({}, state, {
                userB2BDataFetchProgress: false
            }));
        }


        case actionType.GET_USERS_SUCCESS:
        {
            return (Object.assign({}, state, {
                userB2b: action.payload.userB2b
            }));
        }

        case actionType.GET_USER_PARKING_SUBLOT_ACCESS_SUCCESS:

        {
            return (Object.assign({}, state, {userB2bParkingSubLotAccess: action.payload.parkingSubLotAccess.parkingSubLotUserAccesses}));
        }

        case actionType.GET_USERS_ACCESS_SUCCESS:
        {
            return (Object.assign({}, state, {
                userB2bAccesses: action.payload.userAccess.userAccesses,
                selectedUserAccesses: action.payload.userAccess.userAccesses
            }));
        }

        case actionType.GET_ALL_USER_PERMISSION_SUCCESS:
        {
            return (Object.assign({}, state, {
                allPermissions: action.payload.allPermissions
            }));
        }

        case companyActionType.GET_SEARCH_SUGGESTIONS_SUCCESS:
        {
            return (Object.assign({}, state, {
                searchSuggestions: action.payload.data
            }));
        }

        case companyActionType.CLEAR_SEARCH_SUGGESTIONS:
        {
            return (Object.assign({}, state, {
                searchSuggestions: []
            }));
        }

        case actionType.COMPANY_SELECTED_FROM_DROPDOWN:
        {
            return (Object.assign({}, state, {
                selectedCompany: action.payload.company
            }));
        }

        case actionType.PARKING_SELECTED_FROM_DROPDOWN:
        {
            return (Object.assign({}, state, {
                selectedParkingId: action.payload.parkingId
            }));
        }

        case actionType.PARKING_LOT_SELECTED_FROM_DROPDOWN:
        {
            return (Object.assign({}, state, {
                selectedParkingLotId: action.payload.parkingLotId
            }));
        }

        case actionType.PARKING_SUBLOT_CHECKBOX_TOGGLED:
        {
            let newState = JSON.parse(JSON.stringify(state));
            let index = -1;
            for (let count = 0; count < newState.selectedParkingSubLots.length; count++) {
                if (newState.selectedParkingSubLots[count].id == action.payload.parkingSubLot.id) {
                    index = count;
                    break;
                }
            }
            if (index == -1) {
                newState.selectedParkingSubLots.push(action.payload.parkingSubLot);
            } else {
                newState.selectedParkingSubLots.splice(index, 1);
            }
            return newState;
        }

        case actionType.USER_ACCESS_CHECKBOX_TOGGLED:
        {
            let newState = JSON.parse(JSON.stringify(state));
            let index = -1;
            for (let count = 0; count < newState.selectedUserAccesses.length; count++) {
                if (newState.selectedUserAccesses[count].accessTitle == action.payload.userAccess.accessTitle) {
                    index = count;
                    break;
                }
            }
            if (index == -1) {
                newState.selectedUserAccesses.push(action.payload.userAccess);
            } else {
                newState.selectedUserAccesses.splice(index, 1);
            }
            return newState;
        }

        case actionType.CLEAR_SELECTED_PARKING_SUBLOTS:
        {
            return (Object.assign({}, state, {
                selectedParkingSubLots: []
            }));
        }

        case actionType.SHOW_ADD_PARKING_SUBLOT_ACCESS_PROGRESS:
        {
            return (Object.assign({}, state, {
                showAddParkingSubLotAccessProgress: true
            }));
        }
        case actionType.HIDE_ADD_PARKING_SUBLOT_ACCESS_PROGRESS:
        {
            return (Object.assign({}, state, {
                showAddParkingSubLotAccessProgress: false
            }));
        }

        case actionType.SHOW_USER_ACCESS_SUCCESS_PROGRESS:
        {
            return (Object.assign({}, state, {
                showAddUserAccessProgress: true
            }));
        }

        case actionType.HIDE_USER_ACCESS_SUCCESS_PROGRESS:
        {
            return (Object.assign({}, state, {
                showAddUserAccessProgress: false
            }));
        }

        case actionType.PARKING_SUBLOT_ACCESSES_ADDED:
        {
            let newState = JSON.parse(JSON.stringify(state));
            for (let count = 0; count < action.payload.newParkingSubLotAccesses.length; count++) {
                newState.userB2bParkingSubLotAccess.push(action.payload.newParkingSubLotAccesses[count]);
            }
            return newState;
        }

        case actionType.USER_ACCESS_LIST_UPDATED:
        {
            return (Object.assign({}, state, {
                userB2bAccesses: action.payload.data
            }));
        }

        case actionType.PARKING_SUBLOTS_ACCESSES_DELETED:
        {
            let parkingSubLotAccesses = [];
            for (let count = 0; count < state.userB2bParkingSubLotAccess.length; count++) {
                if (state.userB2bParkingSubLotAccess[count].parkingLotId != action.payload.data.parkingLot.id) {
                    parkingSubLotAccesses.push(state.userB2bParkingSubLotAccess[count]);
                }
            }

            return Object.assign({}, state, {
                userB2bParkingSubLotAccess: parkingSubLotAccesses
            });
        }

        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP")
                && (action.payload.pathname.indexOf("/user") != 0 || action.payload.pathname.indexOf("/manage") != 0)) {
                return JSON.parse(JSON.stringify(initialManageUserState));
            } else {
                return state;
            }
        }

        default:
            return state;
    }
}

