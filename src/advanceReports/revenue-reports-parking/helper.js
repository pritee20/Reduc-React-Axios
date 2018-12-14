export function getQueryParamsForParkingRevenueReport(params) {
    let queryString = '';
    if (params.paymentType !== undefined && params.paymentType.toLowerCase() !== 'all') {
        queryString = queryString + '&paymentType=' + params.paymentType;
    }
    if (params.customerType !== undefined && params.customerType.toLowerCase() !== 'all') {
        queryString = queryString + '&customerType=' + params.customerType;
    }
    if (params.bookingMode !== undefined && params.bookingMode.toLowerCase() !== 'all') {
        queryString = queryString + '&bookingMode=' + params.bookingMode;
    }
    return queryString;
}