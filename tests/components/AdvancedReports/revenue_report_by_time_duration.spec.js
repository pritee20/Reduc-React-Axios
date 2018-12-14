/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import RevenueReportByTimeDuration from '../../../src/advanceReports/components/RevenueReportByTimeDuration';
import { Provider } from 'react-redux';
import { fakeStore } from '../../../src/store/fake_store';
import { mount } from 'enzyme';
import ContentWrapper from '../../../src/components/Layout/ContentWrapper';
import CompanyFilter from '../../../src/advanceReports/components/CompanyFilter';


/*
 * Unit Test for data dump report
 */
describe('Revenue Report By Time Duration', function () {

    let store = fakeStore({}),
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
        authToken = "Unit Test Auth Token";

    // This should render ContentWrapper
    it('render Revenue Report By Time Duration component', function () {
        const wrapper = mount(
            <Provider store={store}>
                <RevenueReportByTimeDuration
                    authToken={authToken}
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
                />
            </Provider>
        );

        expect(wrapper).to.exist;

        const reportWrapper = wrapper.find(RevenueReportByTimeDuration);
        
        expect(reportWrapper.props().subFilter).to.exist;
        expect(reportWrapper.props().authToken).to.exist;
        expect(reportWrapper.props().excelFileName).to.exist;
        expect(reportWrapper.props().selectedCompanyId).to.exist;
        expect(reportWrapper.props().selectedParkingId).to.exist;
        expect(reportWrapper.props().selectedParkingLotId).to.exist;
        expect(reportWrapper.props().selectedUsername).to.exist;
        expect(reportWrapper.props().selectedPaymentMode).to.exist;
        expect(reportWrapper.props().selectedBookingMode).to.exist;
        expect(reportWrapper.props().selectedCustomerType).to.exist;
        expect(reportWrapper.props().selectedEventType).to.exist;

        expect(reportWrapper.find(ContentWrapper)).to.have.length(1);
        expect(reportWrapper.find(CompanyFilter)).to.have.length(1);


    })

});
