/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import
{
    createSelector
} from 'reselect';
import {constants} from '../constants';

const revenueReportHeaderData = (state) => {
    if (state.advanceReports && state.advanceReports.revenueReportByVehicleType) {
        return state.advanceReports.revenueReportByVehicleType.headers;
    } else {
        return [];
    }
};

const graphDropDownOptions = (revenueReportData) => {
    let options = [];

    revenueReportData.forEach(function (key) {
        options.push({
            "value": key,
            "text": key.toUpperCase()
        });
    });

    return options;
};

const revenueReportDropDownOptions = createSelector(revenueReportHeaderData, graphDropDownOptions);

const revenueReportVehicleTypeGraphDataType = (state) => {
    return state.advanceReports.revenueReportVehicleTypeGraph;
};

const revenueReportVehicleTypeData = (state) => {
    if (state.advanceReports.revenueReportByVehicleType) {
        return state.advanceReports.revenueReportByVehicleType.data;
    } else {
        return [];
    }
};

const revenueReportVehicleTypeGraphLibReqObjs = (dataType, reportData) => {


    let pieData = [], pieColors = [];
    let reportDataLength = reportData.length;
    let colorLength = 20; // length of PIE_COLOR_CHARTS found in '../constants/ValueConstants

    for (let index = 0; index < reportDataLength; index++) {
        pieData.push({
            "name": reportData[index].type,
            "value": reportData[index][dataType]
        });

        pieColors.push({"color": constants.valueConstants.PIE_CHARTS_COLORS[index % colorLength]});
    }

    return {
        bars: [
            {"key": dataType, "color": "#27C24C"}
        ],
        pies: {data: pieData, colors: pieColors}
    };
};

const revenueReportGraphData = createSelector(revenueReportVehicleTypeGraphDataType, revenueReportVehicleTypeData, revenueReportVehicleTypeGraphLibReqObjs);

const currentStatusReportSelectedParkingLot = (state) => {
    return state.advanceReports.selectedCurrentStatusParkingLot;
};

const currentStatusReportData = (state) => {
    if (state.advanceReports.currentStatusReport) {
        return state.advanceReports.currentStatusReport.data;
    } else {
        return [];
    }
};

const processCurrentStatusReportData = (selectedParkingLot, reportData) => {

    let info = {
        dataExists: false,
        pieCharts: []
    };

    if (selectedParkingLot && reportData) {
        let pieData = [], pieColors = [], selectedType = 0;
        let reportDataLength = reportData.length;

        for (let index = 0; index < reportDataLength; index++) {
            if (selectedParkingLot === reportData[index].parkingLot) {
                Object.keys(reportData[index]).map(function (value) {
                    pieData = [];
                    pieColors = [];
                    selectedType = 0;
                    if (value !== "parkingLot" && value !== "total") {
                        selectedType = value;
                        pieData.push({
                            "name": "Vacant",
                            "value": reportData[index][value].capacity - reportData[index][value].occupied
                        });
                        pieData.push({
                            "name": "Occupied",
                            "value": reportData[index][value].occupied
                        });
                        pieColors.push({"color": "red"});
                        pieColors.push({"color": "green"});

                        info.pieCharts.push({
                            value: selectedType,
                            data: pieData,
                            colors: pieColors
                        });
                        info.dataExists = true;
                    }
                });

            }

        }

    }

    return info;
};

const currentStatusReportGraphData = createSelector(currentStatusReportSelectedParkingLot, currentStatusReportData, processCurrentStatusReportData);


const revenueReportsPaymentModeDropDownOptionsData = (state) => {
    if (state.advanceReports && state.advanceReports.revenueReportByModeOfPayment) {
        return state.advanceReports.revenueReportByModeOfPayment.headers;
    } else {
        return [];
    }
};

const revenueReportsPaymentModeDropDownOptionsArray = (headers) => {

    if (headers.length) {

        let options = [];

        for (let count = 0; count < headers.length; count++) {
            options.push({
                "text": headers[count].toUpperCase(),
                "value": headers[count]
            });
        }

        return options;
    } else {
        return [];
    }

};

const revenueReportPaymentModeDropDownOptions = createSelector(revenueReportsPaymentModeDropDownOptionsData, revenueReportsPaymentModeDropDownOptionsArray);

const revenueReportPaymentModeGraphDataArray = (state) => {
    if (state.advanceReports && state.advanceReports.revenueReportByModeOfPayment) {
        return state.advanceReports.revenueReportByModeOfPayment.data;
    } else {
        return [];
    }
};

const revenueReportPaymentModeBarGraphDropDownValue = (state) => {
    if (state.advanceReports && state.advanceReports.revenueReportPaymentModeBarChartKey) {
        return state.advanceReports.revenueReportPaymentModeBarChartKey;
    } else {
        return '';
    }
};

const revenueReportPaymentModePieChartDropDownValue = (state) => {
    if (state.advanceReports && state.advanceReports.revenueReportPaymentModePieChartKey) {
        return state.advanceReports.revenueReportPaymentModePieChartKey;
    } else {
        return '';
    }
};

const revenueReportPaymentModeGraphDataObject = (data, barGraphValue, pieChartValue) => {
    let info = {'dataExists': false};
    if (data.length > 0 && barGraphValue.length > 0 && pieChartValue.length > 0) {
        let colors = ['#E88664', '#2ECC71', '#2ECC60', '#E88680', '#E88694', '#2ECC91', '#2ECC20', '#E88688'];
        let colorArrayLength = colors.length;
        let pieColors = [], pieData = [], barChartColors = [{key: barGraphValue, color: colors[0]}];
        for (let index = 0; index < data.length; index++) {
            pieColors.push({
                "color": colors[index % colorArrayLength]
            });
            pieData.push({
                "name": data[index]['type'],
                "value": data[index][pieChartValue]
            });

        }
        info.pieChart = {
            data: pieData,
            colors: pieColors
        };

        info.barChart = {
            data: data,
            bars: barChartColors
        };

        info.dataExists = true;
    }
    return info;
};

const revenueReportPaymentModeGraphData = createSelector(revenueReportPaymentModeGraphDataArray, revenueReportPaymentModeBarGraphDropDownValue,
    revenueReportPaymentModePieChartDropDownValue, revenueReportPaymentModeGraphDataObject);

const currentStatusGraphDropDownOptions = (revenueReportData) => {
    let options = [];

    revenueReportData.forEach(function (key) {
        options.push({
            "value": key && key.parkingLot ? key.parkingLot : "",
            "text": key && key.parkingLot ? key.parkingLot.toUpperCase() : ""
        });
    });

    return options;
};


const currentStatusDropDownOptions = createSelector(currentStatusReportData, currentStatusGraphDropDownOptions);

exports.revenueReportPaymentModeDropDownOptions = revenueReportPaymentModeDropDownOptions;
exports.revenueReportDropDownOptions = revenueReportDropDownOptions;
exports.revenueReportGraphData = revenueReportGraphData;
exports.currentStatusReportGraphData = currentStatusReportGraphData;
exports.revenueReportPaymentModeGraphData = revenueReportPaymentModeGraphData;
exports.currentStatusDropDownOptions = currentStatusDropDownOptions;


