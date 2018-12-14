/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import 
    actionType from './actionTypes';
import Path from '../../config/project.config';
import {
    getLastThreeMonthDate,
    getQueryParameterStringOfAppliedFiltersFromState,
    getFirstDateOfMonth,
    filterSubFilterOnCompanyChange,
    filterSubFilterOnParkingChange,
    filterSubFilterOnParkingLotChange,
    getDataToSendMail,
    getQueryParameterStringFromObject,
    getDataToSendDataDumpMailOrDownload,
    checkDateRangeIsGreaterThanAWeek
} from './helper';

/*
 * This file contains all tha action used in reports to perform
 * */

// Action to set data dump date time range
export function setDataDumpDateTimeRange() {

    return {
        type: actionType.SET_DATA_DUMP_INITIAL_DATE_TIME_RANGE,
        payload: {
            fromDate: getLastThreeMonthDate(),
            toDate: new Date()
        }
    }
}

// Action to get data dump report with sub-filter on load
export function getDataDumpReportAndSubFilter() {

    return function (dispatch, getState) {

        // API url to get data dump report
        let url = `${Path.API_end}ParkingEvents/dataDumpReport?fromDate=${getState().advanceReports.dateRange.fromDate}&toDate=${getState().advanceReports.dateRange.toDate}&includeSubFilter=${true}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                // Dispatch set report sub filter action on api success
                dispatch(setReportSubFilter(response.subFilter));
                // Dispatch set report excel file name action on api success
                dispatch(setReportExcelFileName(response.excelFileName));

                dispatch(setDataDumpReportSuccess(response));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

export function setDataDumpReportSuccess(dataDumpReport) {
    return {
        type: actionType.SET_REPORT_ON_SUCCESS,
        payload: {
            dataDumpReport
        }
    }
}

// Action to set Report Sub filter and its copy
export function setReportSubFilter(subFilter) {
    return {
        type: actionType.SET_REPORT_SUB_FILTER,
        payload: {
            subFilter,
            mainSubFilter: subFilter
        }
    }
}

// Action to set excel file name
export function setReportExcelFileName(excelFileName) {
    return {
        type: actionType.SET_REPORT_EXCEL_FILE_NAME,
        payload: {
            excelFileName
        }
    }
}

// Action to set date range when date time range picker changed
export function onChangeDateTimePicker(dateRange) {
    return {
        type: actionType.ON_CHANGE_DATE_TIME_PICKER,
        payload: dateRange
    }
}

// Action to set selected filter on change of company filter
export function onChangeCompanyFilter(selectedCompanyId) {

    return function (dispatch, getState) {
        // Filter sub-filters with using company id
        let filteredSubFilter = filterSubFilterOnCompanyChange(getState().advanceReports.mainSubFilter, selectedCompanyId);
        // Dispatch reset sub filter action
        dispatch(reArrangeSubFilter(filteredSubFilter));
    };

}

// Action to set filtered sub-filter in state
export function reArrangeSubFilter(subFilter) {
    return {
        type: actionType.SET_REPORT_SUB_FILTER,
        payload: subFilter
    }
}

// Action to set selected filter on change of parking filter
export function onChangeParkingFilter(selectedParkingId) {

    return function (dispatch, getState) {
        // Filter sub-filters with using parking id
        let filteredSubFilter = filterSubFilterOnParkingChange(getState().advanceReports.mainSubFilter, selectedParkingId);
        // Dispatch reset sub filter action
        dispatch(reArrangeSubFilter(filteredSubFilter));
    };
}

// Action to set selected filter on change of parking lot filter
export function onChangeParkingLotFilter(selectedParkingLotId) {

    return function (dispatch, getState) {
        // Filter sub-filters with using parking lot id
        let filteredSubFilter = filterSubFilterOnParkingLotChange(getState().advanceReports.mainSubFilter, selectedParkingLotId);
        // Dispatch reset sub filter action
        dispatch(reArrangeSubFilter(filteredSubFilter));
    };

}

// Action to set selected filter on change of parking sub lot filter
export function onChangeParkingSubLotFilter(selectedParkingSubLotId) {
    return {
        type: actionType.ON_CHANGE_FILTER_SUCCESS,
        payload: {
            selectedParkingSubLotId
        }
    }
}

// Action to set selected filter on change of user filter
export function onChangeUserFilter(selectedUsername) {
    return {
        type: actionType.ON_CHANGE_FILTER_SUCCESS,
        payload: {
            selectedUsername
        }
    }
}

// Action to set selected filter on change of payment mode filter
export function onChangePaymentModeFilter(selectedPaymentMode) {
    return {
        type: actionType.ON_CHANGE_FILTER_SUCCESS,
        payload: {
            selectedPaymentMode
        }
    }
}

// Action to set selected filter on change of booking mode filter
export function onChangeBookingModeFilter(selectedBookingMode) {
    return {
        type: actionType.ON_CHANGE_FILTER_SUCCESS,
        payload: {
            selectedBookingMode
        }
    }
}

// Action to set selected filter on change of customer type filter
export function onChangeCustomerTypeFilter(selectedCustomerType) {
    return {
        type: actionType.ON_CHANGE_FILTER_SUCCESS,
        payload: {
            selectedCustomerType
        }
    }
}

// Action to set selected filter on change of event type filter
export function onChangeEventTypeFilter(selectedEventType) {
    return {
        type: actionType.ON_CHANGE_FILTER_SUCCESS,
        payload: {
            selectedEventType
        }
    }
}

// Action to set selected filter on change of time duration filter
export function onChangeTimeDurationFilter(selectedTimeDuration) {
    return {
        type: actionType.ON_CHANGE_FILTER_SUCCESS,
        payload: {
            selectedTimeDuration
        }
    }
}


// Action called on submit button for data dump with selected filters
export function onClickDataDumpSubmit(event) {
    event.preventDefault();

    return function (dispatch, getState) {
        dispatch(setReportExcelFileName());
        let paramsFiltersForDataDump = getQueryParameterStringOfAppliedFiltersFromState(getState().advanceReports);
        let url = `${Path.API_end}ParkingEvents/dataDumpReport?${paramsFiltersForDataDump}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                // Dispatch set excel file name action
                dispatch(setReportExcelFileName(response.excelFileName));
                swal("Success!", "New dump generated successfully.", "success");
            })
            .catch(error => {
                console.log(error.message);
                swal("Error!", "Something went wrong! :(", "error");
            });
    };
}

// Action to send data dump report via mail
export function sendDataDumpReportViaMail(email) {

    return function (dispatch, getState) {

        if (checkDateRangeIsGreaterThanAWeek(getState().advanceReports.dateRange.fromDate, getState().advanceReports.dateRange.toDate)) {
            swal("Warning", "Max Date Range is 7 Days", "warning");
            return;
        }

        let mailData = getDataToSendDataDumpMailOrDownload(getState().advanceReports);
        mailData.to = email;

        let queryParameterString = getQueryParameterStringFromObject(mailData);

        let url = `${Path.API_end}ParkingEvents/dataDumpReport?${queryParameterString}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                swal("Success!", "Mail Sent Successfully", "success");
            })
            .catch(error => {
                swal("Error!", error.message, "error");
            });
    };
}

// Action to send data dump report via mail
export function getDataDumpReportExcel() {

    return function (dispatch, getState) {

        if (checkDateRangeIsGreaterThanAWeek(getState().advanceReports.dateRange.fromDate, getState().advanceReports.dateRange.toDate)) {
            swal("Warning", "Max Date Range is 7 Days", "warning");
            return;
        }

        let mailData = getDataToSendDataDumpMailOrDownload(getState().advanceReports);
        mailData.download = true;
        mailData.access_token = getState().user.token;

        let queryParameterString = getQueryParameterStringFromObject(mailData);

        let url = `${Path.API_end}ParkingEvents/dataDumpReport?${queryParameterString}`;

        window.open(url);
    };
}

// Action to set current month date range from 1 of current month till now
export function setCurrentMonthDateRange() {

    return {
        type: actionType.SET_CURRENT_MONTH_DATE_RANGE,
        payload: {
            fromDate: getFirstDateOfMonth(),
            toDate: new Date()
        }
    }
}

// Action to get revenue report by vehicle type with sub-filter on load
export function getRevenueReportByVehicleTypeAndSubFilters() {

    return function (dispatch, getState) {

        let url = `${Path.API_end}ParkingEvents/vehicleTypeReport?fromDate=${getState().advanceReports.dateRange.fromDate}&toDate=${getState().advanceReports.dateRange.toDate}&includeSubFilter=${true}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                // Dispatch set report sub filter and its copy
                dispatch(setReportSubFilter(response.subFilter));
                // Dispatch set excel file name action
                dispatch(setReportExcelFileName(response.excelFileName));
                // Dispatch set revenue report by vehicle type action
                dispatch(setRevenueReportByVehicleTypeSuccess(response));
                dispatch(setGraphDataType(response.headers[0]));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

// Action called on submit button for revenue report by vehicle type with selected filters
export function onChangeRevenueReportByVehicleTypeSubmit() {
    return function (dispatch, getState) {
        dispatch(setReportExcelFileName());
        dispatch(setRevenueReportByVehicleTypeSuccess());
        let paramsFiltersForVehicleType = getQueryParameterStringOfAppliedFiltersFromState(getState().advanceReports);
        let url = `${Path.API_end}ParkingEvents/vehicleTypeReport?${paramsFiltersForVehicleType}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {

                // Dispatch set excel file name action
                dispatch(setReportExcelFileName(response.excelFileName));

                // Dispatch set revenue report by vehicle type action
                dispatch(setRevenueReportByVehicleTypeSuccess(response));

                dispatch(setGraphDataType(response.headers[0]));

                // swal("Success!", "New Report Generated.", "success");
            })
            .catch(error => {
                console.log(error.message);
            });
    }
}

// Action to send revenue report by vehicle type report via mail
export function sendRevenueReportByVehicleTypeViaMail(email) {

    return function (dispatch, getState) {

        let mailData = getDataToSendMail(getState().advanceReports);
        mailData.to = email;

        let url = `${Path.API_end}ParkingEvents/sendMailExcelVehicleTypeReport`;

        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(mailData)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                swal("Success!", "Mail Sent Successfully", "success");
            })
            .catch(error => {
                console.log(error.message);
                swal("Error!", "Mail Not Sent", "error");
            });
    };
}

// Action to set revenue report by vehicle type on success
export function setRevenueReportByVehicleTypeSuccess(revenueReportByVehicleType) {

    return {
        type: actionType.SET_REPORT_ON_SUCCESS,
        payload: {
            revenueReportByVehicleType
        }
    }
}


export function setGraphDataType(dataType) {
    return {
        type: actionType.SET_REVENUE_REPORT_VEHICLE_TYPE_GRAPH,
        payload: {
            graphDataType: dataType
        }
    };
}

export function setCurrentStatusSelectedParkingLot(selectedCurrentStatusParkingLot) {
    return {
        type: actionType.SET_REPORT_ON_SUCCESS,
        payload: {
            selectedCurrentStatusParkingLot
        }
    };
}

// Action to get value card report with sub filters on load
export function getValueCardReportAndSubFilters() {

    return function (dispatch, getState) {

        let url = `${Path.API_end}ParkingEvents/valueCardReport?fromDate=${getState().advanceReports.dateRange.fromDate}&toDate=${getState().advanceReports.dateRange.toDate}&includeSubFilter=${true}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                // Dispatch set report sub filter and its copy
                dispatch(setReportSubFilter(response.subFilter));
                // Dispatch set value card report action
                dispatch(setValueCardReportOnSuccess(response.data));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

// Action called on submit button for value card report with selected filters
export function getValueCardReportOnSubmit() {

    return function (dispatch, getState) {

        dispatch(setValueCardReportOnSuccess());

        let filterParams = getQueryParameterStringOfAppliedFiltersFromState(getState().advanceReports);

        let url = `${Path.API_end}ParkingEvents/valueCardReport?${filterParams}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                // Dispatch set value card report action
                dispatch(setValueCardReportOnSuccess(response.data));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

// Action to set value card report on api success
export function setValueCardReportOnSuccess(valueCardReport) {
    return {
        type: actionType.SET_REPORT_ON_SUCCESS,
        payload: {
            valueCardReport
        }
    }
}

// Action to get revenue report by time duration with sub-filter on load
export function getRevenueReportByTimeDurationAndSubFilters() {

    return function (dispatch, getState) {

        let url = `${Path.API_end}ParkingEvents/reportByTimeDuration?pastDays=${15}&includeSubFilter=${true}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                // Dispatch set report sub filter and its copy
                dispatch(setReportSubFilter(response.subFilter));
                // Dispatch set excel file name action
                dispatch(setReportExcelFileName(response.excelFileName));
                // Dispatch set revenue report by time duration action
                dispatch(setRevenueReportByTimeDurationSuccess(response));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

// Action to set revenue report by time duration on success
export function setRevenueReportByTimeDurationSuccess(revenueReportByTimeDuration) {

    return {
        type: actionType.SET_REPORT_ON_SUCCESS,
        payload: {
            revenueReportByTimeDuration
        }
    }
}

// Action to send revenue report by time duration via mail
export function sendRevenueReportByTimeDurationViaMail(email) {

    return function (dispatch, getState) {

        let mailData = getDataToSendMail(getState().advanceReports);
        mailData.to = email;
        let url = `${Path.API_end}ParkingEvents/sendMailExcelReportByTime`;

        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(mailData)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                swal("Success!", "Mail Sent Successfully", "success");
            })
            .catch(error => {
                console.log(error.message);
                swal("Error!", "Mail Not Sent", "error");
            });
    };
}

// Action called on submit button for revenue report by time duration with selected filters
export function onChangeRevenueReportByTimeDurationSubmit() {
    return function (dispatch, getState) {
        dispatch(setReportExcelFileName());
        dispatch(setRevenueReportByTimeDurationSuccess());
        let paramsFiltersForTimeDuration = getQueryParameterStringOfAppliedFiltersFromState(getState().advanceReports);
        let url = `${Path.API_end}ParkingEvents/reportByTimeDuration?${paramsFiltersForTimeDuration}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                // Dispatch set excel file name action
                dispatch(setReportExcelFileName(response.excelFileName));
                // Dispatch set revenue report by time duration action
                dispatch(setRevenueReportByTimeDurationSuccess(response));
                // swal("Success!", "New Report Generated.", "success");
            })
            .catch(error => {
                console.log(error.message);
                swal("Error!", "Something went wrong. :(", "error");
            });
    }
}


// Action to get revenue report by mode of payment with sub-filter on load
export function getRevenueReportByModeOfPaymentAndSubFilters() {

    return function (dispatch, getState) {

        let url = `${Path.API_end}ParkingEvents/reportByPaymentMode?fromDate=${getState().advanceReports.dateRange.fromDate}&toDate=${getState().advanceReports.dateRange.toDate}&includeSubFilter=${true}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                // Dispatch set report sub filter and its copy
                dispatch(setReportSubFilter(response.subFilter));
                // Dispatch set excel file name action
                dispatch(setReportExcelFileName(response.excelFileName));
                // Dispatch set revenue report by vehicle type action
                dispatch(setRevenueReportByModeOfPaymentSuccess(response));

                // set the default values for the graph
                dispatch(revenueReportBarChartDataChanged(response.headers[0]));
                dispatch(revenueReportPieChartDataChanged(response.headers[0]));

            })
            .catch(error => {
                console.log(error.message);
            });
    };
}


// Action to set revenue report by mode of payment on success
export function setRevenueReportByModeOfPaymentSuccess(revenueReportByModeOfPayment) {

    return {
        type: actionType.SET_REPORT_ON_SUCCESS,
        payload: {
            revenueReportByModeOfPayment
        }
    }
}

// Action to send revenue report by mode of payment report via mail
export function sendRevenueReportByModeOfPaymentViaMail(email) {

    return function (dispatch, getState) {

        let mailData = getDataToSendMail(getState().advanceReports);
        mailData.to = email;

        let url = `${Path.API_end}ParkingEvents/sendMailExcelReportByPayment`;

        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(mailData)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                swal("Success!", "Mail Sent Successfully", "success");
            })
            .catch(error => {
                console.log(error.message);
                swal("Error!", "Mail Not Sent", "error");
            });
    };
}

// Action called on submit button for revenue report by mode of payment with selected filters
export function onChangeRevenueReportByModeOfPaymentSubmit() {
    return function (dispatch, getState) {

        // Dispatch set excel file name action
        dispatch(setReportExcelFileName());
        // Dispatch set revenue report by vehicle type action
        dispatch(setRevenueReportByModeOfPaymentSuccess());

        let paramsFiltersForModeOfPayment = getQueryParameterStringOfAppliedFiltersFromState(getState().advanceReports);

        let url = `${Path.API_end}ParkingEvents/reportByPaymentMode?${paramsFiltersForModeOfPayment}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                // Dispatch set excel file name action
                dispatch(setReportExcelFileName(response.excelFileName));
                // Dispatch set revenue report by vehicle type action
                dispatch(setRevenueReportByModeOfPaymentSuccess(response));
                dispatch(setGraphDataType(response.headers[0]));
                // swal("Success!", "New Report Generated.", "success");
            })
            .catch(error => {
                console.log(error.message);
            });
    }
}

// Action to get current status report with sub-filter on load
export function getCurrentStatusReportAndSubFilters() {

    return function (dispatch, getState) {

        let url = `${Path.API_end}ParkingEvents/currentStatusReport?includeSubFilter=${true}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                // Dispatch set report sub filter and its copy
                dispatch(setReportSubFilter(response.subFilter));
                // Dispatch set excel file name action
                dispatch(setReportExcelFileName(response.excelFileName));
                // Dispatch set revenue report by vehicle type action
                dispatch(setCurrentStatusReportSuccess(response));
                dispatch(setGraphSelectedParkingLot(response.data[0].parkingLot));
            })
            .catch(error => {
                console.log(error.message);
            });
    };
}

export function setGraphSelectedParkingLot(selectedCurrentStatusParkingLot) {
    return {
        type : actionType.SET_REPORT_ON_SUCCESS,
        payload : {
            selectedCurrentStatusParkingLot
        }
    }
}

// Action to set revenue report by mode of payment on success
export function setCurrentStatusReportSuccess(currentStatusReport) {

    return {
        type: actionType.SET_REPORT_ON_SUCCESS,
        payload: {
            currentStatusReport
        }
    }
}


// Action to send current status report via mail
export function sendCurrentStatusReportViaMail(email) {

    return function (dispatch, getState) {

        let mailData = getDataToSendMail(getState().advanceReports);
        mailData.to = email;

        let url = `${Path.API_end}ParkingEvents/sendMailExcelCurrentStatusReport`;

        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(mailData)
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                swal("Success!", "Mail Sent Successfully", "success");
            })
            .catch(error => {
                console.log(error.message);
                swal("Error!", "Mail Not Sent", "error");
            });
    };
}


// Action called on submit button for revenue report by vehicle type with selected filters
export function currentStatusReportSubmit() {
    return function (dispatch, getState) {
        dispatch(setReportExcelFileName());
        dispatch(setCurrentStatusReportSuccess());
        let paramsFiltersForVehicleType = getQueryParameterStringOfAppliedFiltersFromState(getState().advanceReports);
        let url = `${Path.API_end}ParkingEvents/currentStatusReport?${paramsFiltersForVehicleType}`;

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {

                // Dispatch set excel file name action
                dispatch(setReportExcelFileName(response.excelFileName));

                // Dispatch set revenue report by vehicle type action
                dispatch(setCurrentStatusReportSuccess(response));

                dispatch(setGraphDataType(response.headers[0]));
            })
            .catch(error => {
                console.log(error.message);
            });
    }
}


export function revenueReportBarChartDataChanged(value) {
    return {
        type: actionType.REVENUE_REPORT_PAYMENT_MODE_BAR_CHART_TOGGLED,
        payload: {
            value
        }
    };
}

export function revenueReportPieChartDataChanged(value) {
    return {
        type: actionType.REVENUE_REPORT_PAYMENT_MODE_PIE_CHART_TOGGLED,
        payload: {
            value
        }
    };
}