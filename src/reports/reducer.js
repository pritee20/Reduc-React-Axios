/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { combineReducers } from 'redux';
import companyReports from './companyReports';
import dayWiseReports from './dayWiseReports';
import operatorAppStatus from './operatorAppStatus';

export default combineReducers({
	[companyReports.constants.NAME]: companyReports.reducer,
	[dayWiseReports.constants.NAME]: dayWiseReports.reducer,
	[operatorAppStatus.constants.NAME] : operatorAppStatus.reducer
});

