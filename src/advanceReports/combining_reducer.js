/**
 * combine all the report reducers
 */

// node module imports
import {combineReducers} from 'redux';

// reports imports
import {revenueReportByParking} from './revenue-reports-parking';


export default combineReducers({
    [revenueReportByParking.constants.NAME] : revenueReportByParking.reducer 
});