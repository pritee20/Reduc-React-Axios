/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';
/*Company Reports Deafult state*/
const defaultState = {
	reportsData: null,
	isReportsData: false,
	isUserWise: false,
	usernames: [],
	isFetchingReports: false,
	fromDate: null,
	toDate: null,
	paymentMode : null,
	selectedConfig: {
		companyId: null,
		parkingId: null,
		parkingLotId: null,
		parkingSubLotId: null,
		username: null
	}
};

const Reducer = (state = defaultState, action) => {
	switch (action.type) {
	case actionType.FETCH_REPORTS_REQUEST:
		return (
			Object.assign({},state,{
				isFetchingReports: true,
				isReportsData: false
			})
		);
	case actionType.SET_REPORTS_DATA:
		return (
			Object.assign({},state,{
				reportsData: action.payload.reportsData,
				isReportsData: true,
				isFetchingReports: false,
				isUserWise: action.payload.isUserWise,
				usernames: action.payload.usernames
			})
		);
	case actionType.SET_FROM_DATE:
		return (
			Object.assign({},state,{
				fromDate: action.payload.fromDate
			})
		);
	case actionType.SET_TO_DATE:
		return (
			Object.assign({},state,{
				toDate: action.payload.toDate
			})
		);
	case actionType.SELECT_COMPANY:
		return (
			Object.assign({},state,{
				selectedConfig: Object.assign({},state.selectedConfig,{
					companyId: action.payload.companyId
				})
			})
		);
	case actionType.SELECT_PARKING:
		return (
			Object.assign({},state,{
				selectedConfig: Object.assign({},state.selectedConfig,{
					parkingId: action.payload.parkingId
				})
			})
		);
	case actionType.SELECT_PARKINGLOT:
		return (
			Object.assign({},state,{
				selectedConfig: Object.assign({},state.selectedConfig,{
					parkingLotId: action.payload.parkingLotId
				})
			})
		);
	case actionType.SELECT_PARKINGSUBLOT:
		return (
			Object.assign({},state,{
				selectedConfig: Object.assign({},state.selectedConfig,{
					parkingSubLotId: action.payload.parkingSubLotId
				})
			})
		);
	case actionType.SELECT_USER:
		return (
			Object.assign({},state,{
				selectedConfig: Object.assign({},state.selectedConfig,{
					username: action.payload.username
				})
			})
		);

	case actionType.SELECT_PAYMENT_MODE:
		return (
			Object.assign({},state,{
				paymentMode: action.payload.selectedPaymentMode
			})
		);
	case actionType.CLEAR_SELECT_CONFIG:
		return (
			Object.assign({},state,{
				selectedConfig: Object.assign({},state.selectedConfig,{
					companyId: null,
					parkingId: null,
					parkingLotId: null,
					parkingSubLotId: null,
					username: null
				})
			})
		);
	case actionType.CLEAR_REPORT_STATE:
		return (
			Object.assign({},defaultState)
		);																					
	default: return state;
	}
};

export default Reducer;

