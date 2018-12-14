/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

// Node Module Imports
import
{
    combineReducers
} from 'redux';
import {routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

// User Module Imports
import user from './login';
import manage from './manage';
import reports from './reports';
import advanceReports from './advanceReports';


/* Combines the sub-state of all the modules and returns the application state */
export default combineReducers({
    [user.constants.NAME]: user.reducer,
    [manage.constants.NAME]: manage.reducer,
    form: formReducer,
    [reports.constants.NAME]: reports.reducer,
    [advanceReports.constants.NAME]: advanceReports.reducer,
    [advanceReports.constants.REPORT]: advanceReports.combing_reducer,
    routing: routerReducer
});