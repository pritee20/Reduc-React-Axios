import actionType from './actionType';

export let presentDate = new Date();

export let pastDate = new Date();

pastDate.setMonth(pastDate.getMonth() - 1);

const initialState = {
    fromDate: pastDate.toDateString(),
    toDate: presentDate.toDateString(),
    customerType: "all",
    bookingMode: "all",
    paymentType: "all"
};

export default function (state = initialState, action) {
    switch (action.type) {


        case actionType.SET_TO_DURATION_DATE:
        {
            return (Object.assign({}, state, {
                toDate: action.payload.date
            }));
        }

        case actionType.SET_FROM_DURATION_DATE:
        {
            return (Object.assign({}, state, {
                fromDate: action.payload.date
            }));
        }

        case actionType.SET_PAYMENT_TYPES:
        {
            return (Object.assign({}, state, {
                paymentTypes: action.payload.paymentTypes
            }));
        }

        case actionType.SET_BOOKING_MODES:
        {
            return (Object.assign({}, state, {
                bookingModes: action.payload.bookingModes
            }));
        }

        case actionType.SET_CUSTOMER_TYPES:
        {
            return (Object.assign({}, state, {
                customerTypes: action.payload.customerTypes
            }));
        }

        case actionType.SET_BOOKING_MODE:
        {
            return (Object.assign({}, state, {
                bookingMode: action.payload.value
            }));
        }

        case actionType.SET_CUSTOMER_TYPE:
        {
            return (Object.assign({}, state, {
                customerType: action.payload.value
            }));
        }


        case actionType.SET_PAYMENT_TYPE:
        {
            return (Object.assign({}, state, {
                paymentType: action.payload.value
            }));
        }

        case actionType.SET_PARKING_REVENUE_DATA:
        {
            return (Object.assign({}, state, {
                data: action.payload.data
            }));
        }

        case actionType.SET_PARKING_REVENUE_HEADERS:
        {
            return (Object.assign({}, state, {
                headers: action.payload.headers
            }));
        }

        case actionType.DATA_POINT_BAR_CHART_PARKING_REVENUE_REPORT:
        {
            let newState = JSON.parse(JSON.stringify(state));
            newState.barChartDataPoint = action.payload.value;
            return newState;
            
        }

        case actionType.DATA_POINT_PIE_CHART_PARKING_REVENUE_REPORT:
        {
            let newState = JSON.parse(JSON.stringify(state));
            newState.pieChartDataPoint = action.payload.value;
            return newState;
        }


        default:
        {
            return state;
        }
    }
}