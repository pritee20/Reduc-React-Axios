import
    actionType from './actionType';
import {getQueryParamsForParkingRevenueReport} from './helper';
import Path from '../../../config/project.config';


export function setToDuration(date) {
    return {
        type: actionType.SET_TO_DURATION_DATE,
        payload: {
            date: date
        }
    };
}

export function setFromDuration(date) {
    return {
        type: actionType.SET_FROM_DURATION_DATE,
        payload: {
            date: date
        }
    };
}


export function setPaymentTypes(paymentTypes) {
    return {
        type: actionType.SET_PAYMENT_TYPES,
        payload: {
            paymentTypes: paymentTypes
        }
    };
}

export function setBookingModes(bookingModes) {
    return {
        type: actionType.SET_BOOKING_MODES,
        payload: {
            bookingModes: bookingModes
        }
    };
}


export function setCustomerTypes(customerTypes) {
    return {
        type: actionType.SET_CUSTOMER_TYPES,
        payload: {
            customerTypes: customerTypes
        }
    };
}


export function setPaymentType(value) {
    return {
        type: actionType.SET_PAYMENT_TYPE,
        payload: {
            value
        }
    };
}

export function setBookingMode(value) {
    return {
        type: actionType.SET_BOOKING_MODE,
        payload: {
            value
        }
    };
}

export function setCustomerType(value) {
    return {
        type: actionType.SET_CUSTOMER_TYPE,
        payload: {
            value
        }
    };
}

export function setParkingRevenueReportData(data) {
    return {
        type: actionType.SET_PARKING_REVENUE_DATA,
        payload: {
            data
        }
    };
}

export function setParkingRevenueReportHeaders(headers) {
    return {
        type: actionType.SET_PARKING_REVENUE_HEADERS,
        payload: {
            headers
        }
    };
}


export function barChartOptionSelected(value) {
    return {
        type: actionType.DATA_POINT_BAR_CHART_PARKING_REVENUE_REPORT,
        payload: {
            value
        }
    };
}


export function pieChartOptionSelected(value) {
    return {
        type: actionType.DATA_POINT_PIE_CHART_PARKING_REVENUE_REPORT,
        payload: {
            value
        }
    };
}

export function getRevenueReportParkingData(showSubFilter) {
    return function (dispatch, getState) {
        let revReportByParking = getState().newReports.revenueReportByParking;

        console.log(revReportByParking);

        let url = `${Path.API_end}ParkingEvents/reportByParking?includeSubFilter=` + showSubFilter +
            `&fromDate=` + revReportByParking.fromDate + `&toDate=` + revReportByParking.toDate;

        let params = {
            bookingMode: revReportByParking.bookingMode,
            paymentType: revReportByParking.paymentType, customerType: revReportByParking.customerType
        };

        url = url + getQueryParamsForParkingRevenueReport(params);

        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'}
        })
            .then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {

                dispatch(setParkingRevenueReportData(response.data));
                if (showSubFilter) {
                    dispatch(setParkingRevenueReportHeaders(response.headers));
                    dispatch(setPaymentTypes(response.subFilter.payment_mode));
                    dispatch(setBookingModes(response.subFilter.booking_mode));
                    dispatch(setCustomerTypes(response.subFilter.customer_type));
                    dispatch(pieChartOptionSelected(response.headers[0]));
                    dispatch(barChartOptionSelected(response.headers[0]));
                }
            })
            .catch(error => {
                console.log(error.message);
            });


    };
}

