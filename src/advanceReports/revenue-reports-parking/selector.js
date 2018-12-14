/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import {createSelector} from 'reselect';
import {constants} from '../../constants';

const fromFilterDate = (state) => {
    if (state.newReports && state.newReports.revenueReportByParking) {
        return state.newReports.revenueReportByParking.fromDate;
    } else {
        let date = new Date();
        date.setMonth(date.getMonth() - 3);
        return date.toDateString();
    }
};

const toFilterDate = (state) => {
    if (state.newReports && state.newReports.revenueReportByParking) {
        return state.newReports.revenueReportByParking.toDate;
    } else {
        let date = new Date();
        return date.toDateString();
    }
};

const paymentModeData = (state) => {
    if (state.newReports && state.newReports.revenueReportByParking && state.newReports.revenueReportByParking.paymentTypes) {
        return state.newReports.revenueReportByParking.paymentTypes;
    } else {
        return [];
    }
};

const bookingModeData = (state) => {
    if (state.newReports && state.newReports.revenueReportByParking && state.newReports.revenueReportByParking.bookingModes) {
        return state.newReports.revenueReportByParking.bookingModes;
    } else {
        return [];
    }
};

const customerTypeData = (state) => {
    if (state.newReports && state.newReports.revenueReportByParking && state.newReports.revenueReportByParking.customerTypes) {
        return state.newReports.revenueReportByParking.customerTypes;
    } else {
        return [];
    }
};
/**
 * The selector for the filter component in ParkingRevenueReport {@link components/ParkingRevenueReportFilter}
 * @param fromDate
 * @param toDate
 * @param paymentModes
 * @param bookingModes
 * @param customerTypes
 * @returns {{fromDate: *, toDate: *, paymentModeOptions: *[], bookingModeOptions: *[], customerTypeOptions: *[]}}
 */
const filterData = (fromDate, toDate, paymentModes, bookingModes, customerTypes) => {

    let all = {
        "text": "All",
        "value": "All"
    };

    let paymentModeOptions = [all];

    for (let index = 0; index < paymentModes.length; index++) {
        paymentModeOptions.push({
            "value": paymentModes[index],
            "text": paymentModes[index].replace("_", " ").toUpperCase()
        });
    }

    let bookingModeOptions = [all];

    for (let index = 0; index < bookingModes.length; index++) {
        let text = bookingModes[index].replace("_", " ");
        bookingModeOptions.push({
            "value": bookingModes[index],
            "text": bookingModes[index].replace("_", " ").toUpperCase()
        });
    }

    let customerTypeOptions = [all];

    for (let index = 0; index < customerTypes.length; index++) {
        customerTypeOptions.push({
            "value": customerTypes[index],
            "text": customerTypes[index].replace("_", " ").toUpperCase()
        });
    }


    return {
        fromDate, toDate, paymentModeOptions, bookingModeOptions, customerTypeOptions
    };
};

/**
 * Get the  data that has been returned from the server
 * @param state
 * @returns {*}
 */
const parkingRevenueReportData = (state) => {
    if (state.newReports && state.newReports.revenueReportByParking
        && state.newReports.revenueReportByParking.data) {
        return state.newReports.revenueReportByParking.data;
    } else {
        return [];
    }
};

/**
 * Get the header data from the state that was returned from the server
 * @param state
 * @returns {*}
 */
const parkingRevenueReportHeaders = (state) => {
    if (state.newReports && state.newReports.revenueReportByParking
        && state.newReports.revenueReportByParking.headers) {
        return state.newReports.revenueReportByParking.headers;
    } else {
        return []
    }
};

/**
 * selector for the table data in Revenue Report By Parking {@link components/ParkingRevenueReportTable}
 * @param headers array of string values sent from the server
 *  @param data array of objects sent from the server
 * @returns {{data: (Number|String|Object|data.data|Function), headers: *, footerData: {}}}
 */
const parkingTableData = (headers, data) => {

    let footerData = {};

    for (let index = 0; index < headers.length; index++) {
        footerData[headers[index]] = 0;
    }

    for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
        for (let headerIndex = 0; headerIndex < headers.length; headerIndex++) {
            let header = headers[headerIndex];
            footerData[header] = footerData[header] + data[dataIndex][header];
        }
    }

    return {
        data: data,
        headers: headers,
        footerData
    };
};

/**
 * Get the data required for the
 * drop downs in the graph component of
 * Parking Revenue Reports {@link components/ParkingRevenueReportGraph}
 * @param headers
 * @param data
 */
const parkingRevenueReportGraphDropDown = (headers) => {
    let graphDropDownOptions = [];

    for (let index = 0; index < headers.length; index++) {
        graphDropDownOptions.push({
            "value": headers[index],
            "text": headers[index].replace("_", " ").toUpperCase()
        });
    }

    return graphDropDownOptions;
};


const parkingRevenueReportGraphDropDownOptions = createSelector(parkingRevenueReportHeaders, parkingRevenueReportGraphDropDown);


/**
 * get selected option value for pie chart i.e, in, out, foc, etc
 * @param state
 * @returns {*}
 */
const parkingRevenueReportPieChartDataPoint = (state) => {
    if (state.newReports && state.newReports.revenueReportByParking
        && state.newReports.revenueReportByParking.pieChartDataPoint) {
        return state.newReports.revenueReportByParking.pieChartDataPoint;
    } else {
        return '';
    }
};

/**
 * selected option value for bar chart i.e, in, out, foc, etc
 * @param state
 * @returns {*}
 */
const parkingRevenueReportBarChartDataPoint = (state) => {
    if (state.newReports && state.newReports.revenueReportByParking
        && state.newReports.revenueReportByParking.barChartDataPoint) {
        return state.newReports.revenueReportByParking.barChartDataPoint;
    } else {
        return '';
    }
};

const revenueReportParkingPieChart = (dataPoint, data) => {

    let pieChartData = [];
    let pieChartColors = [];
    let colors = ['#2ECC71', '#2292A7', '#3498DB', '#2ECC69', '#2292A5', '#3498D0', '#2ECC61', '#2292B7', '#349889'];
    let colorsLength = colors.length;

    for (let index = 0; index < data.length; index++) {
        pieChartData.push({
            "name": data[index].name,
            "value": data[index][dataPoint]
        });

        pieChartColors.push({
            "color": colors[index % colorsLength]
        });
    }

    return {
        data: pieChartData,
        colors: pieChartColors
    };

};

const pieChartObject = createSelector(parkingRevenueReportPieChartDataPoint, parkingRevenueReportData, revenueReportParkingPieChart);


const barChartDataObject = (barChartDataPoint, data) => {
    let bars = [{"key": barChartDataPoint, "color": "#2ECC71"}];
    let xAxisKey = "name";
    return {
        bars: bars,
        xAxisKey: xAxisKey,
        data: data
    };
};


const barChartObject = createSelector(parkingRevenueReportBarChartDataPoint, parkingRevenueReportData, barChartDataObject);

const parkingRevenueReportGraph = (dropDownOptions, pieChart, barChart) => {

    return {
        options: dropDownOptions,
        pieChart: pieChart,
        barChart: barChart
    }
};


exports.filter = createSelector(fromFilterDate, toFilterDate, paymentModeData, bookingModeData, customerTypeData, filterData);

exports.table = createSelector(parkingRevenueReportHeaders, parkingRevenueReportData, parkingTableData);

exports.graph = createSelector(parkingRevenueReportGraphDropDownOptions, pieChartObject, barChartObject, parkingRevenueReportGraph);