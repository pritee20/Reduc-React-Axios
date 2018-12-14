/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../config/project.config.js';

import actionType from './actionTypes';

import {getParkingsFilter, getParkingsCountFilter} from './helper';


export function getParkings(companyId, limit, skip, searchText) {

    return function (dispatch, getState) {

        let url = `${Path.API_end}Parkings?filter=` + encodeURIComponent(getParkingsFilter(companyId, limit, skip, searchText));

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                if (searchText == undefined) {
                    dispatch(getParkingsSuccess(response));
                } else {
                    dispatch(parkingSearchSuggestionFetchSuccess(response));
                }
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}

export function getParkingsCount(companyId) {
    return function (dispatch, getState) {
        let url = `${Path.API_end}Parkings/count?where=` + encodeURIComponent(getParkingsCountFilter(companyId));
        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(setTotalParkingCount(response));
                dispatch(getParkings(companyId, 10, 0));
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}


export function getParkingsSuccess(data) {

    return {
        type: actionType.GET_PARKINGS_SUCCESS,
        payload: data
    };
}


export function parkingSearchSuggestionFetchSuccess(response) {
    return {
        type: actionType.PARKING_SUGGESTIONS_FETCH_SUCCESS,
        payload: {
            searchSuggestions: response
        }
    };
}

export function clearParkingSuggestions() {
    return {
        type: actionType.PARKING_SUGGESTIONS_CLEAR
    };
}

export function setTotalParkingCount(response) {
    return {
        type: actionType.SET_TOTAL_PARKING_COUNT,
        payload: {
            count: response.count
        }
    };
}


export function hideAddParkingModal() {
    return {
        type: actionType.HIDE_ADD_PARKING_MODAL
    };
}

export function showAddParkingModal() {
    return {
        type: actionType.SHOW_ADD_PARKING_MODAL
    };
}

export function showEditParkingModal() {
    return {
        type: actionType.SHOW_EDIT_PARKING_MODAL
    };
}

export function hideEditParkingModal() {
    return {
        type: actionType.HIDE_EDIT_PARKING_MODAL
    };
}

function setParkingCategories(categories) {
    return {
        type: actionType.SET_PARKING_CATEGORIES,
        data: categories
    }
}
function setBookingStates(bookingStates) {
    return {
        type: actionType.SET_PARKING_BOOKING_STATES,
        data: bookingStates
    }
}
export function getParkingCategories() {
    return (dispatch, getState) => {
        return fetch(`${Path.API_end}ParkingCategories`, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                let parkingCat = [];
                response.forEach((element)=> {
                    parkingCat.push(element.category)
                });
                console.log(JSON.stringify(parkingCat));
                dispatch(setParkingCategories(parkingCat));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}
export function getBookingState() {
    return (dispatch, getState) => {
        return fetch(`${Path.API_end}BookingStateMasters`, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                let bookingStates = [];
                response.forEach((element)=> {
                    bookingStates.push(element.bookingState)
                });
                console.log(JSON.stringify(bookingStates));
                dispatch(setBookingStates(bookingStates));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

export function createNewParking(parkingData) {
    return (dispatch, getState) => {
        return fetch(`${Path.API_end}Parkings`, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(parkingData)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(newParkingAdded(response));
                swal("Success!", "Parking Created.", "success")
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

export function newParkingAdded(response) {
    return {
        type: actionType.NEW_PARKING_ADDED,
        payload: {
            newParking: response
        }
    };
}

