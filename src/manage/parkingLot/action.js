/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../config/project.config.js';

import actionType from './actionTypes';

import {getParkingLotsFilter, getParkingLotCountFilter} from './helper';
import {updateDataTableWithNewEntity} from '../helper';

/**
 * called to fetch a specific number of parking lots from the server
 * @param limit
 * @param skip
 * @param parkingId
 * @param searchText if it's not undefined then it's for fetching search suggestions
 * @returns an asynchronous action which fetches the parking lot and dispatches the success action
 */
export function getParkingLots(limit, skip, parkingId, searchText) {

    return function (dispatch, getState) {

        let completeUrl = `${Path.API_end}ParkingLots?filter=` + encodeURIComponent(getParkingLotsFilter(limit, skip, parkingId, searchText));

        return fetch(completeUrl, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                if (searchText != undefined) {
                    dispatch(parkingLotSearchSuggestionSuccess(response));
                } else {
                    dispatch(parkingLotsSuccess(response));
                }
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}

/**
 * get the number of parking lots associated with a particular parking.
 * @param parkingId is the id of the parking of which the associated parkings need to be fetched.
 */
export function getParkingLotsCount(parkingId) {
    return function (dispatch, getState) {
        let url = `${Path.API_end}ParkingLots/count` + (parkingId != undefined ? '?where=' + encodeURIComponent(getParkingLotCountFilter(parkingId)) : '');
        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(parkingLotsCountSuccess(response.count));
                dispatch(getParkingLots(10, 0, parkingId));
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}


export function parkingLotSearchSuggestionSuccess(response) {
    return {
        type: actionType.NEW_PARKING_LOT_SEACH_SUGGESTIONS,
        payload: {
            searchSuggestions: response
        }
    };
}

export function parkingLotSearchSuggestionsClear() {
    return {
        type: actionType.CLEAR_PARKING_LOT_SEARCH_SUGGESTIONS
    };
}

export function parkingLotsCountSuccess(count) {
    return {
        type: actionType.SET_PARKING_LOT_COUNT,
        payload: {
            count
        }
    };
}

export function parkingLotsSuccess(response) {
    return {
        type: actionType.GET_PARKING_LOTS_SUCCESS,
        payload: {
            parkingLotData: response
        }
    }
}


export function showProgressParkingLot() {
    return {
        type: actionType.SHOW_PROGRESS_PARKING_LOTS
    };
}

export function hideProgressParkingLot() {
    return {
        type: actionType.HIDE_PROGRESS_PARKING_LOTS
    };
}

export function showAddParkingLotModal() {
    return {
        type: actionType.SHOW_ADD_PARKINGLOT_MODAL
    };
}

export function showEditParkingLotModal() {
    return {
        type: actionType.SHOW_EDIT_PARKINGLOT_MODAL
    };
}

export function hideAddParkingLotModal() {
    return {
        type: actionType.HIDE_ADD_PARKINGLOT_MODAL
    };
}
export function hideEditParkingLotModal() {
    return {
        type: actionType.HIDE_EDIT_PARKINGLOT_MODAL
    };
}
export function setParkingTypes(parkingTypes) {
    return {
        type: actionType.SET_PARKING_TYPES,
        payload: {parkingTypes}
    };
}
export function setTicketingSystems(ticketingSystems) {
    return {
        type: actionType.SET_TICKETING_SYSTEMS,
        payload: {ticketingSystems}
    };
}
export function setParkingAreaTypes(parkingAreaTypes) {
    return {
        type: actionType.SET_PARKING_AREA_TYPES,
        payload: {parkingAreaTypes}
    };

}
export function getParkingTypes() {
    return (dispatch, getState) => {
        return fetch(`${Path.API_end}ParkingTypeMasters`, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                let parkingType = [];
                response.forEach((element)=> {
                    parkingType.push(element.type)
                });
                dispatch(setParkingTypes(parkingType));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}
export function getTicketingSystems() {
    return (dispatch, getState) => {
        return fetch(`${Path.API_end}TicketingSystems`, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                let tickSystems = [];
                response.forEach((element)=> {
                    tickSystems.push(element.type)
                });
                dispatch(setTicketingSystems(tickSystems));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}
export function getParkingAreaTypes() {
    return (dispatch, getState) => {
        return fetch(`${Path.API_end}ParkingAreaTypeMasters`, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                let parkingAreaTypes = [];
                response.forEach((element)=> {
                    parkingAreaTypes.push(element.type)
                });
                dispatch(setParkingAreaTypes(parkingAreaTypes));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

export function createNewParkingLot(parkingLotData, companyId) {
    return (dispatch, getState) => {

        let url = `${Path.API_end}ParkingLots`;
        dispatch(hideAddParkingLotModal());
        return fetch(url, {
            method: "POST",
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(parkingLotData)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                swal("Success!", "Parking Lot Created.", "success");
                response.parkings = {
                    companyId: companyId
                };
                dispatch(newParkingLotAdded(response));
                dispatch(hideAddParkingLotModal());

            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

export function newParkingLotAdded(data) {
    return {
        type: actionType.NEW_PARKING_LOT_ADDED,
        payload: {
            newParkingLot: data
        }
    };
}