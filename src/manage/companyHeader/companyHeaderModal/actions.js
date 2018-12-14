/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../../config/project.config.js';

import actionType from './actionTypes';

import RenderData from './helper';

import {getCompanyUpdateSuccess} from '../action';

export function editCompanyDispatch() {

    return {
        type: actionType.SHOW_COMPANY_EDIT_MODAL,
    };

}

export function setCompanyHeaderDispatch(data) {

    return {
        type: actionType.SET_COMPANY_EDIT_MODAL,
        payload: data
    };

}

export function setFreechargeMerchantId(data) {
    return {
        type: actionType.UPDATE_FREECHARGE_MERCHANT_ID,
        payload: data
    }
}

export function closeEditCompanyDispatch() {
    return {
        type: actionType.HIDE_COMPANY_EDIT_MODAL
    };

}


export function getCompanySuccess(data) {

    return {
        type: actionType.GET_COMPANY_SUCCESS,
        payload: data
    };
}


export function setCompanyName(data) {
    console.log('the setCompanyName data is ', data);
    return {
        type: actionType.UPDATE_COMPANY_NAME,
        payload: data
    }

}

export function setCompanyAddress(data) {

    return {
        type: actionType.UPDATE_COMPANY_ADDRESS,
        payload: data
    }

}

export function setCompanyCity(data) {

    return {
        type: actionType.UPDATE_COMPANY_CITY,
        payload: data
    }

}

export function setCompanyContractor(data) {

    return {
        type: actionType.UPDATE_COMPANY_CONTRACTOR,
        payload: data
    }

}

export function setCompanyEmail(data) {

    return {
        type: actionType.UPDATE_COMPANY_EMAIL,
        payload: data
    }

}

export function setCompanyContact(data) {

    return {
        type: actionType.UPDATE_COMPANY_CONTACTNUMBER,
        payload: data
    }

}

export function setCompanyWebsite(data) {

    return {
        type: actionType.UPDATE_COMPANY_WEBSITE,
        payload: data
    }

}

export function updateCompanySuccess(data) {

    return {
        type: actionType.UPDATE_COMPANY_INFORMATION,
        payload: data
    };
}


export function updateCompanyInformation(companyData) {
    const merchantId = companyData.merchantId;
    return function (dispatch, getState) {

        let completeUrl = `${Path.API_end}Companies/${companyData.id}`;

        let data = {
            name: companyData.name,
            city: companyData.city,
            email: companyData.email,
            contactNumber: companyData.contactNumber,
            contractor: companyData.contractor,
            website: companyData.website,
            address: companyData.address
        };

        return fetch(completeUrl, {
            method: 'PUT',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(updateCompanyMerchantId(merchantId, response));
            })
            .catch(error => {
                console.log(error.message);
            });


    };
}

export function updateCompanyMerchantId(merchantId, companyResponse) {
    return function (dispatch, getState) {

        let completeUrl = `${Path.API_end}FreechargeMerchantIds/update?where=` +
            encodeURIComponent(JSON.stringify({"companyId": companyResponse.id}));
        return fetch(completeUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': getState().user.token},
            body: JSON.stringify({merchantId})
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                companyResponse['merchantId'] = merchantId;
                dispatch(updateCompanySuccess(companyResponse));
                dispatch(getCompanyUpdateSuccess(companyResponse));
            })
            .catch(error => {
                console.log(error);
            });
    };

}
