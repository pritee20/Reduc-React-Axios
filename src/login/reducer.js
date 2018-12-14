/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';

/*Default State for User Module*/
const initialAuthState = {
    token: null,
    userName: null,
    userAccess: null,
    userAccessNamed: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    redirectPath: null
};

export default function (state = initialAuthState, action) {
    switch (action.type) {
        case actionType.LOGIN_USER_REQUEST:
            return (
                Object.assign({}, state, {
                    'isAuthenticating': true,
                    'statusText': null
                })
            );
        case actionType.LOGIN_USER_SUCCESS:
            return (
                Object.assign({}, state, {
                    'isAuthenticating': false,
                    'isAuthenticated': true,
                    'token': action.payload.token,
                    'userName': action.payload.username,
                    'userAccess': action.payload.userAccess,
                    'statusText': 'You have been successfully logged in.'
                })
            );
        case actionType.LOGIN_USER_FAILURE:
            return (
                Object.assign({}, state, {
                    'isAuthenticating': false,
                    'isAuthenticated': false,
                    'token': null,
                    'userName': null,
                    'userAccess': null,
                    'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
                })
            );
        case actionType.LOGOUT_USER:
            return (
                Object.assign({}, state, {
                    'isAuthenticated': false,
                    'token': null,
                    'userName': null,
                    'userAccess': null,
                    'userAccessNamed': null,
                    'statusText': 'You have been successfully logged out.',
                    'redirectPath': null
                })
            );
        case actionType.USER_ACCESS_NAMED:
            return (
                Object.assign({}, state, {
                    'userAccessNamed': action.payload
                })
            );

        case actionType.SAVE_REDIRECT_PATH:
        {
            return (
                Object.assign({}, state, {
                    'redirectPath': action.payload
                })
            );
        }
        default:
            return state;
    }
}
