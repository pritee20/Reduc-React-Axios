/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../config/project.config.js';

import actionType from './actionTypes';

import {getCompanyFilter} from './helper';
import {setCompanyHeaderDispatch} from './companyHeaderModal/actions'

export function getCompanySuccess(data) {

    return {
        type: actionType.GET_COMPANY_SUCCESS,
        payload: data
    };
}


export function getCompany(companyId) {

    return function (dispatch, getState) {


        let url = `${Path.API_end}Companies/${companyId}?filter=` + encodeURIComponent(getCompanyFilter());
        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(getCompanySuccess(response));
                dispatch(setCompanyHeaderDispatch(response));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

export function getCompanyUpdateSuccess(data) {

    return {
        type: actionType.GET_COMPANY_UPDATE_SUCCESS,
        payload: data
    };
}
