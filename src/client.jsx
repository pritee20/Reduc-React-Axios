/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

//Node Modules Imports
import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'whatwg-fetch';
require('es6-promise').polyfill();

import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
//User Modules Imports
import routes from './routes';
import appStore from './store';

import initTranslation from './components/Common/localize';
import initLoadCss from './components/Common/load-css';

// Init translation system
initTranslation();
// Init css loader (for themes)
initLoadCss();

const history = syncHistoryWithStore(browserHistory, appStore);

// appStore.dispatch({ type: 'INIT' });

//Main App Rendering
ReactDOM.render(
    <Provider store={appStore}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>
    , document.getElementById('root'));
