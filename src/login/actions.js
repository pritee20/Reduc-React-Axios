/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { push } from 'react-router-redux';
import Path from '../../config/project.config.js';
import actionType from './actionTypes';
import { processUserAccesses, getUserRedirectUrl} from './helpers';

/**
 * Action Creator for the event of successful login of an user.
 * @param {string} token Authentication Token received from the response.
 * @param {string} username user's username
 * @param {Object} userAccess User's access levels,access to various companies,parkings,etc.
 * @returns {{type, payload: {token: *, username: *, userAccess: *}}}
 */
export function loginUserSuccess(token, username, userAccess) {

    return {
        type: actionType.LOGIN_USER_SUCCESS,
        payload: {
            token: token,
            username: username,
            userAccess: userAccess
        }
    };
}
/**
 * Action Creator for event of user login failure.
 * @param {Object} error Error Object
 * @returns {{type, payload: {status: *, statusText: *}}}
 */
export function loginUserFailure(error) {
    return {
        type: actionType.LOGIN_USER_FAILURE,
        payload: {
            status: error.status,
            statusText: error.message
        }
    };
}
/**
 * Action creator for event when an Async request for login is sent.
 * @returns {{type}}
 */
export function loginUserRequest() {
    return {
        type: actionType.LOGIN_USER_REQUEST
    };
}
/**
 * Action creator for logout event
 * @returns {{type}}
 */
export function logout() {
    return {
        type: actionType.LOGOUT_USER
    };
}
/**
 * Makes an async call to logout endpoint of the API
 * clears the App state upon success and redirects to login page
 * @returns {function(*, *)}
 * @throws Error object if response in not OK
 */
export function logoutAndRedirect() {
    return (dispatch, getState) => {

        if (getState().user && getState().user.token != undefined && getState().user.token != null && getState().user.token.length != 0) {
            return fetch(`${Path.API_end}UserB2bs/logout`, {
                method: 'POST',
                headers: {'Authorization': getState().user.token}
            })
                .then(response => response.ok ? response.status : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
                .then(() => {
                    localStorage.setItem('YOUR_APP_NAME', null);
                    getState().user = {};
                    dispatch(logout());
                    dispatch(push('/'));
                })
                .catch(error => {
                    console.log(`${error.status} : ${error.message} `);
                    localStorage.setItem('YOUR_APP_NAME', null);
                    getState().user = {};
                    dispatch(logout());
                    dispatch(push('/'));
                });
        } else {
            dispatch(push('/'));
        }
    };
}
/**
 * Action creator for setting user accesses to the app state
 * @param access
 * @returns {{type, payload: {companyAccess: *, parkingAccess: *, parkingLotsAccess: *, parkingSubLotsAccess: *}}}
 */
export function userAccessSuccess(access) {
    return {
        type: actionType.USER_ACCESS_NAMED,
        payload: {
            companyAccess: access.companyAccess,
            parkingAccess: access.parkingAccess,
            parkingLotsAccess: access.parkingLotsAccess,
            parkingSubLotsAccess: access.parkingSubLotsAccess
        }
    };
}
/**
 * Makes an async request for fetching detailed user accesses.
 * Processes the accesses response by calling processUserAccesses method
 * and redirects to the 'reports' page.
 * @returns {function(*, *)}
 */
export function getUserAccess(authToken, username, userAccess) {
    return (dispatch, getState) => {
        return fetch(`${Path.API_end}UserB2bs/access`, {
            method: 'GET',
            headers: {'Authorization': authToken}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                
                let redirect = '/dashboard';

                // if (getState().user.redirectPath && getState().user.redirectPath !== null) {
                //     redirect = getState().user.redirectPath;
                // }

                dispatch(loginUserSuccess(authToken, username, userAccess));
                let userAccesses = processUserAccesses(response);
                dispatch(userAccessSuccess(userAccesses));
                dispatch(saveUserToLocalStorage());
                dispatch(push(redirect));
            })
            .catch(error => {
                console.log(error);
            });
    };
}

export function saveUserToLocalStorage() {
    return {
        type: actionType.SAVE_USER_TO_LOCAL_STORAGE
    };
}

/**
 * Makes an async request to login endpoint of the API.
 * Calls the relevant action creators depending upon the type of event occured.
 * If Login is successful,calls getUserAccess to get more detailed user accesses.
 * @param {string} username
 * @param {string} password
 * @returns {Function}
 */
export function loginUser(username, password) {

    return function (dispatch, getState) {
        dispatch(loginUserRequest());
        return fetch(`${Path.API_end}UserB2bs/xyz`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                let userAccess = {
                    userAccesses: response.userAccesses,
                    companyIds: response.companyIds,
                    parkingIds: response.parkingIds,
                    parkingLotIds: response.parkingLotIds,
                    parkingSubLotIds: response.parkingSubLotIds
                };
                localStorage.setItem("accessToken", response.authToken);
                try {
                    dispatch(getUserAccess(response.authToken, response.username, userAccess));
                } catch (e) {
                    dispatch(loginUserFailure({
                        status: 403,
                        statusText: 'Invalid token'
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            });
    };
}

export function saveRedirectPath(path) {
    return {
        type: actionType.SAVE_REDIRECT_PATH,
        payload: path
    };
}


