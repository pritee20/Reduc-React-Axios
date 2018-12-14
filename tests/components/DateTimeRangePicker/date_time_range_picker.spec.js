/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import DateTimeRangePicker from '../../../src/core/components/DateTimeRangePicker/DateTimeRangePicker';
import { Provider } from 'react-redux';
import { fakeStore } from '../../../src/store/fake_store';
import { mount } from 'enzyme';

describe('Date Time Range Picker', function () {

    let store = fakeStore({});

    let dateRange = {
        fromDate : new Date(),
        toDate : new Date
    };

    // This should render ContentWrapper
    it('render date time range component', function () {
        const wrapper = mount(
            <Provider store={store}>
                <DateTimeRangePicker
                    fromDate={dateRange.fromDate}
                    toDate={dateRange.toDate}
                />
            </Provider>
        );

        expect(wrapper).to.exist;
        expect(wrapper.find(DateTimeRangePicker).props().fromDate).to.exist;
        expect(wrapper.find(DateTimeRangePicker).props().toDate).to.exist;

    })

});
