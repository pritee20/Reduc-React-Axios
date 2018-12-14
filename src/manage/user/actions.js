/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../config/project.config.js';
import actionType from './actionTypes';
import {hideAddUserModal} from './userModal/action';
import {updateDataTableWithNewEntity} from '../helper';
import {
    getUserB2BFilter,
    getUserB2bApiFilter,
    getUserB2bObjectFromResponse,
    getUserB2bParkingSubLotAccessFromResponse,
    getUserB2bAccessesFromResponse,
    getArrayOfIds,
    addParkingSubLotObjectToParkingSubLotAccessResponse
} from './helper';


export function showProgressUserB2BTable() {
    return {
        type: actionType.SHOW_USER_B2B_DATA_FETCH_PROGRESS
    };
}

export function hideProgressUserB2BTable() {
    return {
        type: actionType.HIDE_USER_B2B_DATA_FETCH_PROGRESS
    };
}

export function getUserCount() {
    return function (dispatch, getState) {
        let url = `${Path.API_end}UserB2bs/count`;
        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(userB2BCountFetchSuccess(response.count));
                dispatch(getUsers(10, 0));
            })
            .catch(error => {
                console.log(error.message);
            });

    };

}


export function getUsers(limit, skip, searchText) {
    return function (dispatch, getState) {
        let url = `${Path.API_end}UserB2bs?filter=` + encodeURIComponent(getUserB2BFilter(limit, skip, searchText));
        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                if (searchText == undefined) {
                    dispatch(userB2BDataFetchSuccess(response));
                    dispatch(hideProgressUserB2BTable());
                } else {
                    dispatch(fetchSearchSuggestionsSuccess(response));
                }
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}

export function fetchSearchSuggestionsSuccess(response) {
    return {
        type: actionType.FETCH_SEARCH_SUGGESTION_SUCCESS,
        payload: {
            searchSuggestions: response
        }
    };
}

export function clearUserSearchSuggestions() {
    return {
        type: actionType.CLEAR_SEARCH_SUGGESTIONS
    };
}

export function userB2BCountFetchSuccess(count) {
    return {
        type: actionType.GET_USER_B2B_COUNT_SUCCESS,
        payload: {
            count
        }
    };
}

export function userB2BDataFetchSuccess(response) {
    return {
        type: actionType.GET_USER_B2B_DATA,
        payload: {
            userB2BData: response
        }
    };
}

export function getUser(id, includeAccesses) {
    let url = includeAccesses ? `${Path.API_end}UserB2bs/${id}?filter=` + encodeURIComponent(getUserB2bApiFilter()) : `${Path.API_end}UserB2bs/${id}`;
    return function (dispatch, getState) {
        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(getUserSuccess(getUserB2bObjectFromResponse(response)));
                dispatch(getParkingSubLotUserAccessSuccess(getUserB2bParkingSubLotAccessFromResponse(response)));
                dispatch(getUserAccessSuccess(getUserB2bAccessesFromResponse(response)));
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}


export function getAllUserPermissions() {

    return function (dispatch, getState) {
        let url = `${Path.API_end}AccessMasters`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(getAllUserPermissionsSuccess(response));
            })
            .catch(error => {
                console.log(error.message);
            });


    };
}


export function updateUser(user, hideModalCallback) {
    return function (dispatch, getState) {
        let completeUrl = `${Path.API_end}UserB2bs/${user.username}`;

        let data = {
            username: user.username,
            name: user.name,
            contactNumber: user.contactNumber,
            expectedVersion: user.expectedVersion == null ? 1 : user.expectedVersion
        };

        return fetch(completeUrl, {
            method: 'PUT',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(getUserSuccess(response));
                hideModalCallback();
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}

export function addNewUser(user) {
    return function (dispatch, getState) {

        let userB2bToAdd = {
            username: user.username,
            name: user.name,
            contactNumber: user.contactNumber,
            expectedVersion: user.expectedVersion == null ? 1 : user.expectedVersion,
            password: user.password
        };

        let url = `${Path.API_end}UserB2bs/createOperator`;

        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(userB2bToAdd)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(newUserCreated(userB2bToAdd));
                dispatch(hideAddUserModal());
            })
            .catch(error => {
                console.log(error.message);
            });


    };
}

export function newUserCreated(response) {
    return {
        type: actionType.NEW_USER_CREATED,
        payload: {
            userData: response
        }
    };
}


export function updateUserPermission(userData) {
    return function (dispatch, getState) {
        dispatch(showAddUserAccessProgress());

        let url = `${Path.API_end}UserAccesses/bulkEditAccesses?username=${userData.username}`;
        let data = {
            oldAccesses: userData.oldAccesses,
            newAccesses: userData.newAccesses
        };
        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {

                dispatch(hideAddUserAccessProgress());
                dispatch(userAccessListUpdated(getState().manage.user.selectedUserAccesses));
                swal("Success!", "Permissions Updated", "success");
            })
            .catch(error => {
                console.log(error);
            });


    };
}

export function setFirstParkingLotOfSelectedParking(parkingId) {
    return function (dispatch, getState) {
        let company = getState().manage.user.selectedCompany;
        for (let count = 0; count < company.parkings.length; count++) {
            if (company.parkings[count].id == parkingId) {
                if (company.parkings[count].parkingLots && company.parkings[count].parkingLots.length > 0) {
                    dispatch(parkingLotSelected(company.parkings[count].parkingLots[0].id));
                }
                break;
            }
        }
    }
}

export function getUserSuccess(data) {

    return {
        type: actionType.GET_USERS_SUCCESS,
        payload: {userB2b: data}
    };
}

export function getAllUserPermissionsSuccess(data) {
    return {
        type: actionType.GET_ALL_USER_PERMISSION_SUCCESS,
        payload: {
            allPermissions: data
        }
    }
}

export function getUserAccessSuccess(data) {
    return {
        type: actionType.GET_USERS_ACCESS_SUCCESS,
        payload: {
            userAccess: data
        }
    };
}

export function getParkingSubLotUserAccessSuccess(data) {
    return {
        type: actionType.GET_USER_PARKING_SUBLOT_ACCESS_SUCCESS,
        payload: {parkingSubLotAccess: data}
    };
}

export function companySelected(company) {
    return {
        type: actionType.COMPANY_SELECTED_FROM_DROPDOWN,
        payload: {
            company
        }
    };
}

export function parkingSelected(parkingId) {
    return {
        type: actionType.PARKING_SELECTED_FROM_DROPDOWN,
        payload: {
            parkingId
        }
    };
}

export function parkingLotSelected(parkingLotId) {
    return {
        type: actionType.PARKING_LOT_SELECTED_FROM_DROPDOWN,
        payload: {
            parkingLotId
        }
    };
}

export function parkingSubLotToggled(parkingSubLot) {
    return {
        type: actionType.PARKING_SUBLOT_CHECKBOX_TOGGLED,
        payload: {
            parkingSubLot
        }
    };
}

export function userAccessToggled(userAccess) {
    return {
        type: actionType.USER_ACCESS_CHECKBOX_TOGGLED,
        payload: {
            userAccess
        }
    };
}

export function clearSelectedParkingSubLots() {
    return {
        type: actionType.CLEAR_SELECTED_PARKING_SUBLOTS
    };
}

export function showAddParkingSubLotAccessProgress() {
    return {
        type: actionType.SHOW_ADD_PARKING_SUBLOT_ACCESS_PROGRESS
    };
}

export function showAddUserAccessProgress() {
    return {
        type: actionType.SHOW_USER_ACCESS_SUCCESS_PROGRESS
    };
}

export function hideAddParkingSubLotAccessProgress() {
    return {
        type: actionType.HIDE_ADD_PARKING_SUBLOT_ACCESS_PROGRESS
    };
}

export function hideAddUserAccessProgress() {
    return {
        type: actionType.HIDE_USER_ACCESS_SUCCESS_PROGRESS
    };
}

export function addNewSubLotAccesses(username) {
    console.log('username is ', username);
    return function (dispatch, getState) {
        dispatch(showAddParkingSubLotAccessProgress());
        let url = `${Path.API_end}UserB2bs/${username}/parkingSubLotUserAccesses`;
        let data = [];
        let parkingSubLots = getState().manage.user.selectedParkingSubLots;
        let company = {
            id: getState().manage.user.selectedCompany.id,
            name: getState().manage.user.selectedCompany.name
        };
        let parkingId = getState().manage.user.selectedParkingId;
        let parkingLotId = getState().manage.user.selectedParkingLotId;
        let parking = {}, parkingLot = {};
        for (let count = 0; count < parkingSubLots.length; count++) {
            let access = {
                parkingSubLotId: parkingSubLots[count].id,
                parkingLotId: parkingLotId,
                parkingId: parkingId,
                companyId: company.id,
                userB2b: username
            };
            data.push(access);
        }
        console.log('data for parkingSubLotAccesses is ', data);
        for (let x = 0; x < getState().manage.user.selectedCompany.parkings.length; x++) {
            if (getState().manage.user.selectedCompany.parkings[x].id == parkingId) {
                parking = {
                    id: parkingId,
                    name: getState().manage.user.selectedCompany.parkings[x].name
                };
                for (let x2 = 0; x2 < getState().manage.user.selectedCompany.parkings[x].parkingLots.length; x2++) {
                    if (getState().manage.user.selectedCompany.parkings[x].parkingLots[x2].id == parkingLotId) {
                        parkingLot = {
                            id: parkingLotId,
                            name: getState().manage.user.selectedCompany.parkings[x].parkingLots[x2].name
                        };
                        break;
                    }
                }
                break;
            }
        }
        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                console.log("Successfully created new parkingSubLotAccesses ", response);
                dispatch(newParkingSubLotAccessesAdded(addParkingSubLotObjectToParkingSubLotAccessResponse(company, parking, parkingLot, parkingSubLots, response)));
                dispatch(hideAddParkingSubLotAccessProgress());
            })
            .catch(error => {
                console.log(error);
                dispatch(hideAddParkingSubLotAccessProgress());
            });
    };
}

export function deleteParkingSubLotsForParticularParkingLot(username, accessObject) {

    return function (dispatch, getState) {
        console.log('the user name and access object are ', username, accessObject);

        let url = `${Path.API_end}ParkingSubLotUserAccesses/removeAccess?username=${username}`;

        let data = {
            parkingLotId: accessObject.parkingLot.id
        };

        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(parkingSubLotsAccessesForParticularLotDeleted(accessObject));
            })
            .catch(error => {
                console.log(error);
                dispatch(hideAddParkingSubLotAccessProgress());
            });


    };
}

export function newParkingSubLotAccessesAdded(response) {
    return {
        type: actionType.PARKING_SUBLOT_ACCESSES_ADDED,
        payload: {
            newParkingSubLotAccesses: response
        }
    };
}

export function userAccessListUpdated(data) {
    return {
        type: actionType.USER_ACCESS_LIST_UPDATED,
        payload: {
            data
        }
    };
}

export function parkingSubLotsAccessesForParticularLotDeleted(accessObject) {
    return {
        type: actionType.PARKING_SUBLOTS_ACCESSES_DELETED,
        payload: {
            data: accessObject
        }
    }
}

