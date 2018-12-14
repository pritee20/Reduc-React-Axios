/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import ValueCardReport from '../../../src/advanceReports/components/ValueCardReport';
import { Provider } from 'react-redux';
import { fakeStore } from '../../../src/store/fake_store';
import { mount } from 'enzyme';
import ContentWrapper from '../../../src/components/Layout/ContentWrapper';
import CompanyFilter from '../../../src/advanceReports/components/CompanyFilter';

/*
* Unit Test for vehicle type report
* */

describe('Value Card Report', function () {

    let store = fakeStore({}),
        dateRange = {
            fromDate : new Date(),
            toDate : new Date()
        },
        subFilter = {},
        excelFileName = "excel.xls",
        selectedCompanyId = 0,
        selectedParkingId=0,
        selectedParkingLotId=0,
        selectedUsername=0,
        selectedPaymentMode=0,
        selectedBookingMode=0,
        selectedCustomerType=0,
        selectedEventType=0,
        valueCardReport={
            average_ticket_value:0,
            average_check_in_per_day:0,
            average_parked_time:"00",
            average_rotation:0
        };

    // This should render ContentWrapper
    it('render Value Card Report component', function () {
        const wrapper = mount(
            <Provider store={store}>
                <ValueCardReport
                    dateRange={dateRange}
                    subFilter={subFilter}
                    excelFileName={excelFileName}
                    selectedCompanyId={selectedCompanyId}
                    selectedParkingId={selectedParkingId}
                    selectedParkingLotId={selectedParkingLotId}
                    selectedUsername={selectedUsername}
                    selectedPaymentMode={selectedPaymentMode}
                    selectedBookingMode={selectedBookingMode}
                    selectedCustomerType={selectedCustomerType}
                    selectedEventType={selectedEventType}
                    valueCardReport={valueCardReport}
                />
            </Provider>
        );

        expect(wrapper).to.exist;

        const valueCardWrapper = wrapper.find(ValueCardReport);

        expect(valueCardWrapper.props().dateRange).to.exist;
        expect(valueCardWrapper.props().subFilter).to.exist;
        expect(valueCardWrapper.props().excelFileName).to.exist;
        expect(valueCardWrapper.props().selectedCompanyId).to.exist;
        expect(valueCardWrapper.props().selectedParkingId).to.exist;
        expect(valueCardWrapper.props().selectedParkingLotId).to.exist;
        expect(valueCardWrapper.props().selectedUsername).to.exist;
        expect(valueCardWrapper.props().selectedPaymentMode).to.exist;
        expect(valueCardWrapper.props().selectedBookingMode).to.exist;
        expect(valueCardWrapper.props().selectedCustomerType).to.exist;
        expect(valueCardWrapper.props().selectedEventType).to.exist;
        expect(valueCardWrapper.props().valueCardReport).to.exist;

        expect(valueCardWrapper.find(ContentWrapper)).to.have.length(1);
        expect(valueCardWrapper.find(CompanyFilter)).to.have.length(1);


    })

});
