/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';

const initialAdvanceReportState = {
    selectedCompanyId: "all",
    selectedParkingId: "all",
    selectedParkingLotId: "all",
    selectedParkingSubLotId: "all",
    selectedUsername: "all",
    selectedPaymentMode: "all",
    selectedBookingMode: "all",
    selectedEventType: "all",
    selectedCustomerType: "all",
    selectedTimeDuration: "all"
};

export default function (state = initialAdvanceReportState, action) {
    switch (action.type) {

        case actionType.SET_DATA_DUMP_INITIAL_DATE_TIME_RANGE :
        {
            return (Object.assign({}, state, {
                dateRange: action.payload
            }))
        }

        case actionType.SET_CURRENT_MONTH_DATE_RANGE :
        {
            return (Object.assign({}, state, {
                dateRange: action.payload
            }))
        }

        case actionType.SET_REPORT_SUB_FILTER :
        {
            return (Object.assign({}, state, action.payload))
        }
        case actionType.ON_CHANGE_DATE_TIME_PICKER :
        {
            return (Object.assign({}, state, {
                dateRange: action.payload
            }))
        }
        case actionType.SET_REVENUE_REPORT_VEHICLE_TYPE_GRAPH:
        {
            let newState = JSON.parse(JSON.stringify(state)); // a new instance of state is created which forces the graphs to redraw even though the data remains the same
            newState.revenueReportVehicleTypeGraph = action.payload.graphDataType;
            return newState;
        }


        case actionType.SET_REPORT_EXCEL_FILE_NAME :
        {
            return (Object.assign({}, state, action.payload))
        }

        case actionType.SET_REPORT_ON_SUCCESS :
        {
            return (Object.assign({}, state, action.payload))
        }

        case actionType.ON_CHANGE_FILTER_SUCCESS :
        {
            return (Object.assign({}, state, action.payload))
        }
            

        case actionType.REVENUE_REPORT_PAYMENT_MODE_PIE_CHART_TOGGLED:
        {
            let newState = JSON.parse(JSON.stringify(state));
            newState['revenueReportPaymentModePieChartKey'] = action.payload.value;
            return newState;
        }


        case actionType.REVENUE_REPORT_PAYMENT_MODE_BAR_CHART_TOGGLED:
        {
            let newState = JSON.parse(JSON.stringify(state));
            newState['revenueReportPaymentModeBarChartKey'] = action.payload.value;
            return newState;
        }

        case "@@router/LOCATION_CHANGE":
        {
            return initialAdvanceReportState;
        }

        default:
            return state;
    }
}

