/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../config/project.config.js';


import actionType from './actionTypes';

import {getParkingSublotCountFilter, getParkingSubLotsFilter} from './helper';


export function getParkingSubLots(limit, skip, parkingLotId, searchText) {

    return function (dispatch, getState) {

        let urlParkingSubLots = `${Path.API_end}ParkingSubLots?filter=` + encodeURIComponent(JSON.stringify(getParkingSubLotsFilter(limit, skip, parkingLotId, searchText)));

        return fetch(urlParkingSubLots, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(getParkingSubLotsSuccess(response));
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}


export function getParkingSubblotCount(parkingLotId) {

    return function (dispatch, getState) {
        let url = `${Path.API_end}ParkingSubLots/count` +
            (parkingLotId ? `?where=` + encodeURIComponent(JSON.stringify(getParkingSublotCountFilter(parkingLotId))) : '');
        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(parkingSubLotCountSuccess(response.count));
                dispatch(getParkingSubLots(10, 0, parkingLotId));
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}

export function parkingSubLotCountSuccess(count) {
    return {
        type: actionType.GET_PARKING_SUBLOT_COUNT_SUCCESS,
        payload: {
            count: count
        }
    };
}

export function getParkingSubLotsSuccess(data) {

    return {
        type: actionType.GET_PARKING_SUB_LOTS_SUCCESS,
        payload: {subLots: data}
    };
}
export function showAddParkingSubLotModal() {
    return {
        type: actionType.SHOW_ADD_PARKINGSUBLOT_MODAL
    }
}
export function hideAddParkingSubLotModal() {
    return {
        type: actionType.HIDE_ADD_PARKINGSUBLOT_MODAL
    }
}

export function showEditParkingSubLotModal() {
    return {
        type: actionType.SHOW_EDIT_PARKING_SUBLOT_MODAL
    };
}

export function hideEditParkingSubLotModal() {
    return {
        type: actionType.HIDE_EDIT_PARKING_SUBLOT_MODAL
    };
}

export function setSubLotTypes(subLotTypes) {
    return {
        type: actionType.SET_PARKINGSUBLOT_TYPES,
        payload: {subLotTypes: subLotTypes}
    }
}
export function setCollectionModels(models) {
    return {
        type: actionType.SET_COLLECTION_MODELS,
        payload: {collectionModels: models}
    }
}
export function setPlateNumberTypes(PNTypes) {
    return {
        type: actionType.SET_PLATE_NUMBER_TYPES,
        payload: {plateNumberTypes: PNTypes}
    }
}
export function getSubLotTypes() {
    return (dispatch, getState) => {
        return fetch(`${Path.API_end}SubLotTypes`, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                let SLTypes = [];
                response.forEach((element)=> {
                    SLTypes.push(element.typeName)
                })
                dispatch(setSubLotTypes(SLTypes));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}
export function getCollectionModelTypes() {
    return (dispatch, getState) => {
        return fetch(`${Path.API_end}CollectionModelTypes`, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                let CMTypes = [];
                response.forEach((element)=> {
                    CMTypes.push(element.type)
                })
                dispatch(setCollectionModels(CMTypes));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}
export function getPlateNumberTypes() {
    return (dispatch, getState) => {
        return fetch(`${Path.API_end}PlateNumberTypes`, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                let PNTypes = [];
                response.forEach((element)=> {
                    PNTypes.push(element.type)
                })
                dispatch(setPlateNumberTypes(PNTypes));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}
export function createNewParkingSubLot(parkingSubLotData, callback) {
    return (dispatch, getState) => {
        dispatch(hideAddParkingSubLotModal());
        return fetch(`${Path.API_end}ParkingSubLots`, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(parkingSubLotData)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(newParkingSubLotCreated(response));
                swal("Success!", "Parking Sublot Created.", "success")
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

export function newParkingSubLotCreated(response) {
    return {
        type: actionType.NEW_PARKING_SUBLOT_CREATED,
        payload: {
            subLot: response
        }
    };
}