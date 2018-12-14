/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../config/project.config.js';
import actionType from './actionTypes';
import {getCompanySearchFilter} from '../user/helper';
import {initializeDatatable, getCompaniesFilter} from './helper';


export function getCompanies(limit, skip, searchText) {
    return function (dispatch, getState) {
        let url = `${Path.API_end}Companies?filter=` + encodeURIComponent(getCompaniesFilter(limit, skip, searchText));
        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(addCompaniesToState(response));
                dispatch(showOrHideProgress(false));
            })
            .catch(error => {
                console.log(error.message);
                dispatch(showOrHideProgress(false));
            });
    };
}

export function addCompaniesToState(response) {
    return {
        type: actionType.GET_COMPANIES_SUCCESS,
        payload: response
    };
}


export function getTotalCompanyCount(searchText) {
    return function (dispatch, getState) {
        dispatch(showOrHideProgress(true));
        searchText = !(searchText != undefined && searchText.length > 0) ? undefined : '%' + searchText + '%';
        let url = !searchText ? `${Path.API_end}Companies/count` : `${Path.API_end}Companies/count?where=` + encodeURIComponent(JSON.stringify({"name": {"like": searchText}}));
        return fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': getState().user.token}
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(setTotalCompanyCount(response.count));
                dispatch(getCompanies(10, 0, searchText));
            })
            .catch(error => {
                console.log(error.message);
                dispatch(showOrHideProgress(false));
            });

    };
}

export function setTotalCompanyCount(count) {
    return {
        type: actionType.SET_TOTAL_COMPANY_COUNT,
        payload: {count}
    };
}


export function showOrHideProgress(show) {
    return {
        type: actionType.MAKING_NETWORK_REQUEST,
        payload: {
            show
        }
    };
}

export function createNewCompany(companyData, merchantId) {
    return (dispatch, getState) => {
        return fetch(`${Path.API_end}Companies`, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(companyData)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(addMerchantId(merchantId, response));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

export function addMerchantId(merchantId, companyResponse) {
    let url = `${Path.API_end}Companies/${companyResponse.id}/freeChargeMerchantId`;
    console.log(JSON.stringify({merchantId}));
    return (dispatch, getState) => {
        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify({merchantId})
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(newCompanyAdded(companyResponse));
                swal("Success!", "Company Created.", "success")
            })
            .catch(error => {
                console.log(error.message);
                dispatch(newCompanyAdded(companyResponse));
            });
    };
}

export function newCompanyAdded(companyResponse) {
    return {
        type: actionType.NEW_COMPANY_ADDED,
        payload: companyResponse
    };
}

export function getSearchSuggestions(searchText, fetchParkingSubLots) {
    return function (dispatch, getState) {
        searchText = !(searchText != undefined && searchText.length > 0) ? undefined : searchText + '%';
        let url = `${Path.API_end}Companies?filter=` + (fetchParkingSubLots ? encodeURIComponent(getCompanySearchFilter(searchText))
                : encodeURIComponent(getCompaniesFilter(5, 0, searchText)));
        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                console.log('get companies for search was a success, response is ', response);
                dispatch(searchSuggestionsFetchSuccess(response));
            })
            .catch(error => {
                console.log(error.message);
                dispatch(showOrHideProgress(false));
            });
    };

}

export function searchSuggestionsFetchSuccess(searchSuggestions) {
    return {
        type: actionType.GET_SEARCH_SUGGESTIONS_SUCCESS, payload: {data: searchSuggestions}
    };
}

export function clearSearchSuggestions() {
    return {
        type: actionType.CLEAR_SEARCH_SUGGESTIONS
    };
}
