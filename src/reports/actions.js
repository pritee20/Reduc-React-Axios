/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

//User Module Imports
import Path from '../../config/project.config.js';
import companyReports from './companyReports';
import dayWiseReports from './dayWiseReports';
import { generateUsers } from './helpers';
/**
 * Action creator for setting reports data.
 * @param response Response received from the fetchReports async request.
 * @param {boolean} userWise Boolean representing whether reports to be displayed login wise.
 * @param users List of usernames for login wise reports.
 * @param reportType Type of report.
 * @returns {{type: *, payload: {reportsData: *, isUserWise: *, usernames: *}}}
 */
export function setReportsData(response, userWise, users, reportType) {
    let reportActionType;
    switch (reportType) {
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.SET_REPORTS_DATA;
            break;
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.SET_REPORTS_DATA;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType,
        payload: {
            reportsData: response,
            isUserWise: userWise,
            usernames: users
        }
    });
}
/**
 * Action creator for selecting a company
 * @param companyId Selected company's id
 * @param reportType Type of report
 * @returns {{type: *, payload: {companyId: *}}}
 */
export function selectCompany(companyId, reportType) {
    let reportActionType;
    switch (reportType) {
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.SELECT_COMPANY;
            break;
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.SELECT_COMPANY;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType,
        payload: {
            companyId
        }
    });
}
/**
 * Action report for selecting a parking.
 * @param parkingId Selected parking's id
 * @param reportType Type of report
 * @returns {{type: *, payload: {parkingId: *}}}
 */
export function selectParking(parkingId, reportType) {
    let reportActionType;
    switch (reportType) {
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.SELECT_PARKING;
            break;
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.SELECT_PARKING;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType,
        payload: {
            parkingId
        }
    });
}
/**
 * Action creator for selecting a parking lot.
 * @param parkingLotId Selected parking lot's id
 * @param reportType Type of report.
 * @returns {{type: *, payload: {parkingLotId: *}}}
 */
export function selectParkingLot(parkingLotId, reportType) {
    let reportActionType;
    switch (reportType) {
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.SELECT_PARKINGLOT;
            break;
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.SELECT_PARKINGLOT;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType,
        payload: {
            parkingLotId
        }
    });
}
/**
 * Action creator for selecting a parking sublot
 * @param parkingSubLotId Selected Parking Sublot's id
 * @param reportType Type of report
 * @returns {{type: *, payload: {parkingSubLotId: *}}}
 */
export function selectParkingSubLot(parkingSubLotId, reportType) {
    let reportActionType;
    switch (reportType) {
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.SELECT_PARKINGSUBLOT;
            break;
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.SELECT_PARKINGSUBLOT;
            break;
        default:
            reportActionType = null;
    }
    ;

    return ({
        type: reportActionType,
        payload: {
            parkingSubLotId
        }
    });
}
/**
 * Action creator for selecting a login
 * @param username Selected login
 * @param reportType Type of report
 * @returns {{type: *, payload: {username: *}}}
 */
export function selectUser(username, reportType) {
    let reportActionType;
    switch (reportType) {
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.SELECT_USER;
            break;
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.SELECT_USER;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType,
        payload: {
            username
        }
    });
}
/**
 * Action creator for selecting a parking sublot incase of daywise reports
 * @param sublotType Selected Sublot Type
 * @param reportType Type of report
 * @returns {{type: *, payload: {sublotType: *}}}
 */
export function selectSublot(sublotType, reportType) {
    let reportActionType;
    switch (reportType) {
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.SELECT_SUBLOT;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType,
        payload: {
            sublotType
        }
    });
}

export function selectPaymentMode(selectedPaymentMode, reportType) {
    let reportActionType;
    switch (reportType) {
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.SELECT_PAYMENT_MODE;
            break;
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.SELECT_PAYMENT_MODE;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType,
        payload: {
            selectedPaymentMode
        }
    });
}
/**
 * Action creator for event when async request for fetching reports is made.
 * @param reportType Type of Report
 * @returns {{type: *}}
 */
export function fetchReportsRequest(reportType) {
    let reportActionType;
    switch (reportType) {
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.FETCH_REPORTS_REQUEST;
            break;
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.FETCH_REPORTS_REQUEST;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType
    });
}
/**
 * Action creator for setting the 'from' date.
 * @param {Date} fromDate Start Date of the duration for which reports is to be fetched.
 * @param reportType Type of report.
 * @returns {{type: *, payload: {fromDate: *}}}
 */
export function setFromDate(fromDate, reportType) {
    let reportActionType;
    switch (reportType) {
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.SET_FROM_DATE;
            break;
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.SET_FROM_DATE;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType,
        payload: {
            fromDate
        }
    });
}
/**
 * Action creator for clearing the selected configuration to their default values.
 * @param reportType Type of report
 * @returns {{type: *}}
 */
export function clearSelectConfig(reportType) {
    let reportActionType;
    switch (reportType) {
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.CLEAR_SELECT_CONFIG;
            break;
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.CLEAR_SELECT_CONFIG;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType
    });
}
/**
 * Action creator for setting the 'to' date.
 * @param {Date} toDate End Date of the duration for which reports is to be fetched
 * @param reportType Type of report
 * @returns {{type: *, payload: {toDate: *}}}
 */
export function setToDate(toDate, reportType) {
    let reportActionType;
    switch (reportType) {
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.SET_TO_DATE;
            break;
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.SET_TO_DATE;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType,
        payload: {
            toDate
        }
    });
}
/**
 * Action creator for clearing the reports state to their default value.
 * @param reportType Type of report.
 * @returns {{type: *}}
 */
export function clearReportsState(reportType) {
    let reportActionType;
    switch (reportType) {
        case companyReports.constants.NAME:
            reportActionType = companyReports.actionTypes.CLEAR_REPORT_STATE;
            break;
        case dayWiseReports.constants.NAME:
            reportActionType = dayWiseReports.actionTypes.CLEAR_REPORT_STATE;
            break;
        default:
            reportActionType = null;
    }
    return ({
        type: reportActionType
    });
}

/**
 * Makes an async request for fetching the reports of the given type.
 * Clears the select configuration to their default state.
 * Sets the 'from' and 'to' date.
 * Sets the reports data in the app state.
 * @param {Date} startDate Start Date of the duration for which reports is to be fetched.
 * @param {Date} endDate End Date of the duration for which reports is to be fetched.
 * @param {Boolean} userWise Boolean representing whether reports to be displayed user wise.
 * @param {String} reportType Type of report.
 * @returns {function(*, *)}
 */
export function fetchReportsData(startDate, endDate, userWise, reportType) {
    return (dispatch, getState) => {
        dispatch(clearSelectConfig(reportType));
        dispatch(fetchReportsRequest(reportType));
        dispatch(setFromDate(startDate, reportType));
        dispatch(setToDate(endDate, reportType));
        let companyId = getState().user.userAccess.companyIds[0];
        let reportURL;
        switch (reportType) {
            case companyReports.constants.NAME:
                reportURL = companyReports.constants.dataURL;
                break;
            case dayWiseReports.constants.NAME:
                reportURL = dayWiseReports.constants.dataURL;
                break;
            default:
                reportURL = '';
        }
        
		return fetch(`${Path.API_end}Companies/${companyId}/${reportURL}?from=${startDate}&to=${endDate}`,{
			method: 'GET', 
			headers: {'Authorization': getState().user.token}          
		})
		.then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))            
		.then(response => {
			
			let users =  userWise ? generateUsers(response, reportType) : [];
			let selectedUser = getState().reports[reportType].selectedConfig.username;
			if(userWise){
				if (selectedUser == null) {
					dispatch(selectUser(users[0], reportType));
				}                  
			} else {
				dispatch(selectUser(null, reportType));
			}             
			dispatch(setReportsData(response, userWise, users, reportType));
		})
		.catch(error => {
			console.log(error.message);
		});
	};

};


export function fetchReportsForPaymentMode(startDate, endDate, userWise, reportType, paymentMode) {
    return (dispatch, getState) => {
        dispatch(clearSelectConfig(reportType));
        dispatch(fetchReportsRequest(reportType));
        dispatch(setFromDate(startDate, reportType));
        dispatch(setToDate(endDate, reportType));
        let companyId = getState().user.userAccess.companyIds[0];
        let reportURL;
        switch (reportType) {
            case companyReports.constants.NAME:
                reportURL = companyReports.constants.dataURL;
                break;
            case dayWiseReports.constants.NAME:
                reportURL = dayWiseReports.constants.dataURL;
                break;
            default:
                reportURL = '';
        }

        return fetch(`${Path.API_end}Companies/${companyId}/${reportURL}?from=${startDate}&to=${endDate}&paymentMode=${paymentMode}`,{
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {

                let users =  userWise ? generateUsers(response, reportType) : [];
                let selectedUser = getState().reports[reportType].selectedConfig.username;
                if(userWise){
                    if (selectedUser == null) {
                        dispatch(selectUser(users[0], reportType));
                    }
                } else {
                    dispatch(selectUser(null, reportType));
                }
                dispatch(setReportsData(response, userWise, users, reportType));
            })
            .catch(error => {
                console.log(error.message);
            });
    };

};
