/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionType';

import Path from '../../../config/project.config.js';


import {getRCParkingLotFilter, renderData, getRCParkingLotsDataTable} from './helper';

export function getRCParkingLots(companyId, parkingId, parkingLotId, parkingSubLotId) {
    return (dispatch, getState) => {
        let completeUrl = `${Path.API_end}ParkingLots?filter=` + encodeURIComponent(getRCParkingLotFilter());
        
        return fetch(completeUrl, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                renderData(getRCParkingLotsDataTable(response), companyId, parkingId, parkingLotId, parkingSubLotId);
                // dispatch(getRCParkingLotsSuccessful(response));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

export function getRCParkingLotsSuccessful(data) {
    return {
        type: actionType.GET_RC_PARKING_LOTS_SUCCESS,
        payload: data
    };
}
