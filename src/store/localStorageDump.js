/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import userActionTypes from '../login/actionTypes';
import storageConstants from '../constants/StorageConstants';

export default store => next => action => {
    if (action.type == userActionTypes.SAVE_USER_TO_LOCAL_STORAGE) {
        const state = store.getState();
        let stateToStore = {};

        try {
            for (var prop in state) {
                if (state.hasOwnProperty(prop) && prop.toLowerCase() == "user") {
                    stateToStore[prop] = state[prop];
                }
            }

        } catch (ex) {
            console.log(ex);
        }

        localStorage.setItem(storageConstants.APP_NAME, JSON.stringify(stateToStore));
    } else if (action.type == userActionTypes.LOGOUT_USER) {
        localStorage.setItem(storageConstants.APP_NAME, null);
    }
    next(action);
}
