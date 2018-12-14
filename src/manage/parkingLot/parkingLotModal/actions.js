/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../../config/project.config.js';
import actionType from './actionType';
import {hideEditParkingLotModal} from '../action';


export function setEditParkingLotModal(data) {
    return {
        type: actionType.SET_EDIT_PARKING_LOT_MODAL,
        payload: data
    }
}

export function updateParkingLotModal(key, value) {
    return {
        type: actionType.UPDATE_PARKING_LOT_MODAL,
        payload: {
            key: key,
            value: value
        }
    }
}

export function updateParkingLotSuccess(data) {
    return {
        type: actionType.UPDATE_PARKING_LOT_INFORMATION,
        payload: data
    };
}

export function updateParkingLotInformation(data) {

    return function (dispatch, getState) {

        let completeUrl = `${Path.API_end}ParkingLots/${data.id}`;

        let dataToUpdateParkingLot = {
            name: data.name,
            avgParkingWeekday: data.avgParkingWeekday,
            avgParkingWeekend: data.avgParkingWeekend,
            closeTime: data.closeTime,
            extraNotes: data.extraNotes,
            frontPhoto: data.frontPhoto,
            leftPhoto: data.leftPhoto,
            openTime: data.openTime,
            parkingOwner: data.parkingOwner,
            parkingType: data.parkingType,
            rightPhoto: data.rightPhoto,
            ticketingSystem: data.ticketingSystem,
            parkingAreaType: data.parkingAreaType,
            collectionAt: data.collectionAt
        };


        return fetch(completeUrl, {
            method: 'PUT',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToUpdateParkingLot)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(updateParkingLotSuccess(response));
                dispatch(hideEditParkingLotModal());
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}

