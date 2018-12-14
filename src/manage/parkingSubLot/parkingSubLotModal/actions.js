/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../../config/project.config.js';
import actionType from './actionType';
import {hideEditParkingSubLotModal} from '../action';

export function setEditParkingSubLotModal(data) {
    return {
        type: actionType.SET_EDIT_PARKING_SUB_LOT_MODAL,
        payload: data
    };
}

export function updateParkingSubLotModal(key, value) {
    return {
        type: actionType.UPDATE_PARKING_SUB_LOT_MODAL,
        payload: {
            key: key,
            value: value
        }
    };
}

export function updateParkingSubLotSuccess(data) {
    return {
        type: actionType.UPDATE_PARKING_SUB_LOT_INFORMATION,
        payload: data
    }
}


export function updateParkingSubLotInformation(data) {

    return function (dispatch, getState) {

        let completeUrl = `${Path.API_end}ParkingSubLots/${data.id}`;
        console.log(data);
        let dataToUpdateParkingSubLot = {
            autoCheckoutTime: data.autoCheckoutTime,
            bookingNotes: data.bookingNotes,
            bookingSecurity: data.bookingSecurity,
            capacity: data.capacity,
            collectionModel: data.collectionModel,
            convenienceFee: data.convenienceFee,
            insidePhoto: data.insidePhoto,
            lastCheckinUpdateTime: data.lastCheckinUpdateTime,
            lostTicketFee: data.lostTicketFee,
            mobileRequired: data.mobileRequired,
            plateNumberType: data.plateNumberType,
            taxiTime: data.taxiTime,
            type: data.type,
            valetName: data.valetName,
            challanCost: data.challanCost
        };

        if (data.autoCheckoutCost) {
            dataToUpdateParkingSubLot.autoCheckoutCost = data.autoCheckoutCost;
        }

        return fetch(completeUrl, {
            method: 'PUT',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToUpdateParkingSubLot)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(updateParkingSubLotSuccess(response));
                dispatch(hideEditParkingSubLotModal());
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}

