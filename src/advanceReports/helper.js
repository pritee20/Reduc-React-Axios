/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


/*
* This file contains all the helper function to provide data, get and setting objects and others
* */

// Function to get first date of month. 
export function getFirstDateOfMonth() {

    let now = new Date();
    let current;
    
    if (now.getMonth() == 11) {
        current = new Date(now.getFullYear() + 1, 0, 1);
    } else {
        current = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    return current
}

// Function to get last three month date by now
export function getLastThreeMonthDate() {

    let date = new Date();

    date.setDate(date.getDate() - 6);

    return date;
}

// Process revenue report by vehicle type data to show it GMP Datatable
export function processRevenueReportByVehicleTypeData(reportData) {

    let companyReportData = {
        headers: [{
            text: " ",
            subText: "",
            value: "vehicle_type"
        }],
        footers: [{
            text : "Total"
        }],
        reportData: reportData.data,
        columnData: [{
            data: 'type'
        }],
        originalHeader : []
    };


    if (!reportData.headers) {
        return companyReportData;
    }

    reportData.headers.map(function (headerText) {
        let footerText = 0;
        companyReportData.headers.push({
            text: headerText.toUpperCase(),
            subText: headerText === "total" ? " (Rs.)" : " (count)",
            value: headerText
        });

        companyReportData.columnData.push({
            data: headerText
        });

        companyReportData.reportData.map(function (singleReport) {
            footerText = footerText + singleReport[headerText]
        });

        companyReportData.footers.push({
            text : footerText
        });

    });

    companyReportData.originalHeader = reportData.headers;

    return companyReportData;

}

// Process revenue report by time duration data to show it GMP Datatable
export function processRevenueReportByTimeDurationData(reportData) {

    let companyReportData = {
        headers: [{
            text: "Time Period",
            subText: "",
            value: "type"
        }],
        footers: [{
            text : "Total"
        }],
        reportData: reportData.data,
        columnData: [{
            data: 'type'
        }],
        originalHeader : []
    };


    if (!reportData.headers) {
        return companyReportData;
    }

    reportData.headers.map(function (headerText) {
        let footerText = 0;
        companyReportData.headers.push({
            text: headerText.toUpperCase(),
            subText: headerText === "total" ? " (Rs.)" : " (count)",
            value: headerText
        });

        companyReportData.columnData.push({
            data: headerText
        });

        companyReportData.reportData.map(function (singleReport) {
            footerText = footerText + singleReport[headerText]
        });

        companyReportData.footers.push({
            text : footerText
        });

    });

    companyReportData.originalHeader = reportData.headers;
    console.log(companyReportData);
    return companyReportData;

}


// Process current status report data to show it GMP Datatable
export function processCurrentStatusReportData(reportData) {

    let companyReportData = {
        headers: [{
            text: "Parking_Lot_Name",
            subText: "",
            value: "type"
        }],
        footers: [{
            text : "Total"
        }],
        reportData: JSON.parse(JSON.stringify(reportData.data)),
        columnData: [{
            data: 'parkingLot'
        }],
        originalHeader : []
    };


    if (!reportData.headers) {
        return companyReportData;
    }

    reportData.headers.map(function (headerText) {
        let footerText = {
            occupied : 0,
            vacant : 0,
            capacity : 0
        };

        companyReportData.headers.push({
            text: headerText.toUpperCase(),
            subText: headerText.toLowerCase() === "total" ? " (Rs.)" : " (Vacant/Total)",
            value: headerText
        });

        companyReportData.columnData.push({
            data: headerText
        });

        companyReportData.reportData.map(function (singleReport) {
            if(singleReport[headerText]){
                footerText.occupied = footerText.occupied + singleReport[headerText].occupied;
                footerText.capacity = footerText.capacity + singleReport[headerText].capacity;
                footerText.vacant = footerText.vacant + (singleReport[headerText].capacity - singleReport[headerText].occupied);
            }

            singleReport[headerText] = singleReport[headerText] ? singleReport[headerText].capacity - singleReport[headerText].occupied + "/" +singleReport[headerText].capacity : "N/A";
        });


        companyReportData.footers.push({
            text : footerText.vacant + "/" + footerText.capacity
        });

    });

    companyReportData.originalHeader = reportData.headers;

    return companyReportData;

}

// Function to return drop down array objects into id, value and name
export function convertNameIdIntoValueAndTextForDropDown(dropDownOptions) {

    let newDropDownOptions = [];

    dropDownOptions.map(function (option) {
        newDropDownOptions.push({
            id : option.id,
            value : option.id,
            text : option.name
        });
    });

    return newDropDownOptions;

}

// Function to return array of value and text object from user object
export function convertUsernameIntoValueAndTextForDropDown(userOptions) {
    
    userOptions.map(function (option) {
        option.value = option.username;
        option.text = option.username
    });

    return userOptions;
}

// Function to get array of value and text object from array of string
export function getValueAndTextObjectFromArrayOfString(stringArray) {

    let objectArray = [];

    stringArray.map(function (string) {
        objectArray.push({
            value: string,
            text: string
        });
    });

    return objectArray;
}

// Function to get query parameter string of applied filters from state
export function getQueryParameterStringOfAppliedFiltersFromState(advanceReports) {

    let params = {};

    if(advanceReports.dateRange && advanceReports.dateRange.fromDate){
        params.fromDate = advanceReports.dateRange.fromDate;
    }

    if(advanceReports.dateRange && advanceReports.dateRange.toDate){
        params.toDate = advanceReports.dateRange.toDate;
    }

    if(advanceReports.selectedCompanyId && advanceReports.selectedCompanyId !== "all"){
        params.companyId = advanceReports.selectedCompanyId;
    }

    if(advanceReports.selectedParkingId && advanceReports.selectedParkingId !== "all"){
        params.parkingId = advanceReports.selectedParkingId;
    }

    if(advanceReports.selectedParkingLotId && advanceReports.selectedParkingLotId !== "all"){
        params.parkingLotId = advanceReports.selectedParkingLotId;
    }

    if(advanceReports.selectedParkingSubLotId && advanceReports.selectedParkingSubLotId !== "all"){
        params.vehicleType = advanceReports.selectedParkingSubLotId;
    }

    if(advanceReports.selectedUsername && advanceReports.selectedUsername !== "all"){
        params.user = advanceReports.selectedUsername;
    }

    if(advanceReports.selectedPaymentMode && advanceReports.selectedPaymentMode !== "all"){
        params.paymentMode = advanceReports.selectedPaymentMode;
    }

    if(advanceReports.selectedBookingMode && advanceReports.selectedBookingMode !== "all"){
        params.bookingMode = advanceReports.selectedBookingMode;
    }

    if(advanceReports.selectedCustomerType && advanceReports.selectedCustomerType !== "all"){
        params.customerType = advanceReports.selectedCustomerType;
    }

    if(advanceReports.selectedEventType && advanceReports.selectedEventType !== "all"){
        params.eventType = advanceReports.selectedEventType;
    }

    if(advanceReports.selectedTimeDuration && advanceReports.selectedTimeDuration !== "all"){
        switch(advanceReports.selectedTimeDuration){
            case 'day' : {
                params.pastDays = 15
            }
                break;
            case 'week' : {
                params.pastWeeks = 15
            }
                break;
            case 'month' : {
                params.pastMonths = 15
            }
        }
    }


    let query = Object.keys(params)
        .map(k =>
            encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
        )
        .join('&');

    return query;
}


export function getQueryParameterStringFromObject(object) {
    
    let query = Object.keys(object)
        .map(k =>
            encodeURIComponent(k) + '=' + encodeURIComponent(object[k])
        )
        .join('&');

    return query;
}

// Function to get filtered sub-filter on change of company
export function filterSubFilterOnCompanyChange(subFilter, companyId) {
    
    companyId = parseInt(companyId);

    if(!companyId){
        companyId = "all";
    }
    
    let companyTempArray;
    let selectedCompanyId = companyId;
    let selectedParkingId = "all";
    let selectedParkingLotId = "all";
    let selectedUsername = "all";

    if(companyId === "all"){
        return {
            subFilter,
            selectedCompanyId,
            selectedParkingId,
            selectedParkingLotId,
            selectedUsername
        }
    }

    let filteredSubFilter = JSON.parse(JSON.stringify(subFilter));

    filteredSubFilter.parkings = [];
    filteredSubFilter.parkingLots = [];
    filteredSubFilter.users = [];

    if(subFilter.parkings){
        subFilter.parkings.map(function (parking) {
            if(companyId === parking.company_id){
                filteredSubFilter.parkings.push(parking);
            }
        });
    }

    if(subFilter.parkingLots){
        subFilter.parkingLots.map(function (parkingLot) {
            if(companyId === parkingLot.company_id){
                filteredSubFilter.parkingLots.push(parkingLot);
            }
        });
    }

    if(subFilter.users){
        subFilter.users.map(function (user) {
            companyTempArray = user.companies.split(',');
            companyTempArray.map(function (id) {
                if(parseInt(id) === companyId){
                    filteredSubFilter.users.push(user);
                }
            });

        });
    }



    if(filteredSubFilter.companies.length === 1){
        selectedCompanyId = filteredSubFilter.companies[0].id
    }

    if(filteredSubFilter.parkings.length === 1){
        selectedParkingId = filteredSubFilter.parkings[0].id
    }

    if(filteredSubFilter.parkingLots.length === 1){
        selectedParkingLotId = filteredSubFilter.parkingLots[0].id
    }

    if(filteredSubFilter.users.length === 1){
        selectedUsername = filteredSubFilter.users[0].username
    }

    return {
        subFilter : filteredSubFilter,
        selectedCompanyId,
        selectedParkingId,
        selectedParkingLotId,
        selectedUsername
    };
    
}

// Function to get filtered sub-filter on change of parking
export function filterSubFilterOnParkingChange(subFilter, parkingId) {

    parkingId = parseInt(parkingId);

    if(!parkingId){
        parkingId = "all";
    }

    let parkingTempArray;
    let selectedCompanyId = "all";
    let selectedParkingId = parkingId;
    let selectedParkingLotId = "all";
    let selectedUsername = "all";

    if(parkingId === "all"){
        return {
            subFilter,
            selectedCompanyId,
            selectedParkingId,
            selectedParkingLotId,
            selectedUsername
        }
    }

    let filteredSubFilter = JSON.parse(JSON.stringify(subFilter));;
    filteredSubFilter.parkingLots = [];
    filteredSubFilter.users = [];

    if(subFilter.parkings){
        subFilter.parkings.map(function (parking) {
            if(parking.id === parkingId){
                selectedCompanyId = parking.company_id;
            }
        });
    }

    if(subFilter.parkingLots){
        subFilter.parkingLots.map(function (parkingLot) {
            if(parkingId === parkingLot.parking_id){
                filteredSubFilter.parkingLots.push(parkingLot);
            }
        });
    }

    if(subFilter.users){
        subFilter.users.map(function (user) {
            parkingTempArray = user.parkings.split(',');
            parkingTempArray.map(function (id) {
                if(parseInt(id) === parkingId){
                    filteredSubFilter.users.push(user);
                }
            });
        });
    }


    if(filteredSubFilter.companies.length === 1){
        selectedCompanyId = filteredSubFilter.companies[0].id
    }

    if(filteredSubFilter.parkings.length === 1){
        selectedParkingId = filteredSubFilter.parkings[0].id
    }

    if(filteredSubFilter.parkingLots.length === 1){
        selectedParkingLotId = filteredSubFilter.parkingLots[0].id
    }

    if(filteredSubFilter.users.length === 1){
        selectedUsername = filteredSubFilter.users[0].username
    }

    return {
        subFilter : filteredSubFilter,
        selectedCompanyId,
        selectedParkingId,
        selectedParkingLotId,
        selectedUsername
    };

}

// Function to get filtered sub-filter on change of parking lot
export function filterSubFilterOnParkingLotChange(subFilter, parkingLotId) {

    parkingLotId = parseInt(parkingLotId);

    if(!parkingLotId){
        parkingLotId = "all";
    }

    let parkingTempArray;
    let selectedCompanyId = "all";
    let selectedParkingId = "all";
    let selectedParkingLotId = parkingLotId;
    let selectedUsername = "all";

    if(parkingLotId === "all"){
        return {
            subFilter,
            selectedCompanyId,
            selectedParkingId,
            selectedParkingLotId,
            selectedUsername
        }
    }


    let filteredSubFilter = JSON.parse(JSON.stringify(subFilter));

    filteredSubFilter.users = [];

    if(subFilter.parkingLots){
        subFilter.parkingLots.map(function (parkingLot) {
            if(parkingLot.id === parkingLotId){
                selectedCompanyId = parkingLot.company_id;
                selectedParkingId = parkingLot.parking_id;
            }
        });
    }

    filteredSubFilter.companies = subFilter.companies;
    filteredSubFilter.parkings = subFilter.parkings;
    filteredSubFilter.parkingLots = subFilter.parkingLots;

    if(subFilter.users){
        subFilter.users.map(function (user) {
            parkingTempArray = user.parkingLots.split(',');
            parkingTempArray.map(function (id) {
                if(parseInt(id) === parkingLotId){
                    filteredSubFilter.users.push(user);
                }
            });

        });
    }

    if(filteredSubFilter.companies.length === 1){
        selectedCompanyId = filteredSubFilter.companies[0].id
    }

    if(filteredSubFilter.parkings.length === 1){
        selectedParkingId = filteredSubFilter.parkings[0].id
    }

    if(filteredSubFilter.parkingLots.length === 1){
        selectedParkingLotId = filteredSubFilter.parkingLots[0].id
    }

    if(filteredSubFilter.users.length === 1){
        selectedUsername = filteredSubFilter.users[0].username
    }

    return {
        subFilter : filteredSubFilter,
        selectedCompanyId,
        selectedParkingId,
        selectedParkingLotId,
        selectedUsername
    };

}

// Function to get object to send mail by using state and applied filters
export function getDataToSendMail(advanceReports) {

    let mailData = {};

    if(advanceReports.excelFileName){
        mailData.fileName = advanceReports.excelFileName;
    }

    if(advanceReports.selectedCompanyId && advanceReports.selectedCompanyId !== "all"){
        advanceReports.mainSubFilter.companies.map(function (company) {
            if(company.id === advanceReports.selectedCompanyId){
                mailData.companyName = company.name
            }
        })
    }else {
        mailData.companyName = "All Companies";
    }

    if(advanceReports.selectedParkingLotId && advanceReports.selectedParkingLotId !== "all"){
        advanceReports.mainSubFilter.parkingLots.map(function (parkingLot) {
            if(parkingLot.id === advanceReports.selectedParkingLotId){
                mailData.parkingLotName = parkingLot.name
            }
        })
    }else {
        mailData.parkingLotName = "All Parking Lots";
    }

    return mailData;
}

export function checkDateRangeIsGreaterThanAWeek(fromDate, toDate) {
    let fDate = new Date(fromDate);
    let tDate = new Date(toDate);

    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;

    // Convert both dates to milliseconds
    var date1_ms = fDate.getTime();
    var date2_ms = tDate.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return

    if(Math.round(difference_ms/one_day) > 6){
        return true
    }
    return false;
}

// Function to get object to send mail by using state and applied filters
export function getDataToSendDataDumpMailOrDownload(advanceReports) {

    let mailData = {};


    if(advanceReports.dateRange && advanceReports.dateRange.fromDate){
        mailData.fromDate = advanceReports.dateRange.fromDate;
    }

    if(advanceReports.dateRange && advanceReports.dateRange.toDate){
        mailData.toDate = advanceReports.dateRange.toDate;
    }

    if(advanceReports.selectedCompanyId && advanceReports.selectedCompanyId !== "all"){
        mailData.companyId = advanceReports.selectedCompanyId;
        advanceReports.mainSubFilter.companies.map(function (company) {
            if(company.id === advanceReports.selectedCompanyId){
                mailData.companyName = company.name;
            }
        })
    }else {
        mailData.companyName = "All Companies";
    }

    if(advanceReports.selectedParkingId && advanceReports.selectedParkingId !== "all"){
        mailData.parkingId = advanceReports.selectedParkingId;
    }

    if(advanceReports.selectedParkingLotId && advanceReports.selectedParkingLotId !== "all"){
        mailData.parkingLotId = advanceReports.selectedParkingLotId;
        advanceReports.mainSubFilter.parkingLots.map(function (parkingLot) {
            if(parkingLot.id === advanceReports.selectedParkingLotId){
                mailData.parkingLotName = parkingLot.name
            }
        })
    }else {
        mailData.parkingLotName = "All Parking Lots";
    }

    if(advanceReports.selectedParkingSubLotId && advanceReports.selectedParkingSubLotId !== "all"){
        mailData.vehicleType = advanceReports.selectedParkingSubLotId;
    }

    if(advanceReports.selectedPaymentMode && advanceReports.selectedPaymentMode !== "all"){
        mailData.paymentMode = advanceReports.selectedPaymentMode;
    }

    if(advanceReports.selectedBookingMode && advanceReports.selectedBookingMode !== "all"){
        mailData.bookingMode = advanceReports.selectedBookingMode;
    }

    if(advanceReports.selectedCustomerType && advanceReports.selectedCustomerType !== "all"){
        mailData.customerType = advanceReports.selectedCustomerType;
    }

    if(advanceReports.selectedEventType && advanceReports.selectedEventType !== "all"){
        mailData.eventType = advanceReports.selectedEventType;
    }

    if(advanceReports.mainSubFilter.companies.length === 1){
        mailData.companyName = advanceReports.mainSubFilter.companies[0].name;
    }

    if(advanceReports.mainSubFilter.parkingLots.length === 1){
        mailData.parkingLotName = advanceReports.mainSubFilter.parkingLots[0].name;
    }

    return mailData;
}

// Function to get number to two decimal spaces
export function convertNumberToTwoDecimal(number){
    
    let twoDecimalNumber = parseFloat(Math.round(number * 100) / 100).toFixed(2);
    
    return twoDecimalNumber;
}

// Function to get static duration options
export function getDurationOptions() {
    let durationOptions = [{
        text : "Past 15 Days",
        value : "day"
    },{
        text : "Past 15 Weeks",
        value : "week"
    },{
        text : "Past 15 Months",
        value : "month"
    }];
    
    return durationOptions
}
