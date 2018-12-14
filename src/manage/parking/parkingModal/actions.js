/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../../config/project.config.js';
import actionType from './actionType';
import {updateRow} from '../helper.js';


export function setEditParkingModal(data) {
    return {
        type: actionType.SET_EDIT_PARKING_MODAL,
        payload: data
    };
}

export function updateParkingModal(key, value) {
    return {
        type: actionType.UPDATE_PARKING_MODAL,
        payload: {
            key: key,
            value: value
        }
    }
}

export function updateParkingSuccess(data) {
    return {
        type: actionType.UPDATE_PARKING_INFORMATION,
        payload: data
    }
}

export function updateParkingInformation(data) {

    return function (dispatch, getState) {

        let completeUrl = `${Path.API_end}Parkings/${data.id}`;

        let dataToUpdateParking = {
            name: data.name,
            city: data.city,
            address: data.address,
            bookingState: data.bookingState,
            contactNumber: data.contactNumber,
            landmark: data.landmark,
            nFactor: data.nFactor,
            nFactorCount: data.nFactorCount
        };

        if (data.category !== "" && data.category !== null) {
            dataToUpdateParking.category = data.category;
        }

        return fetch(completeUrl, {
            method: 'PUT',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(dataToUpdateParking)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(updateParkingSuccess(response));
                // dispatch(getCompanyUpdateSuccess(response));
            })
            .catch(error => {
                console.log(error.message);
            });

    };
}

