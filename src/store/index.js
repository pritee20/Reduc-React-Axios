/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from '../rootReducer';
import localStorageDump from './localStorageDump';

import storageConstants from '../constants/StorageConstants';


//Middlewares
const routerMiddle = routerMiddleware(browserHistory);
const middleware = [
    ReduxThunk,
    localStorageDump,
    routerMiddle
];

const storedState = JSON.parse(
    localStorage.getItem(storageConstants.APP_NAME)
);

const initialState = (storedState == null) ? {} : storedState;

//Store Configuration
let storeENV;

if (process.env.NODE_ENV === 'production') {
    storeENV = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware))
    );
} else {
    storeENV = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
}

export default storeENV;