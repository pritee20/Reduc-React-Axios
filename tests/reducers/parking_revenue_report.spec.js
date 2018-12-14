/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';

import reducer, {pastDate, presentDate} from '../../src/advanceReports/revenue-reports-parking/reducer';
import * as actions from '../../src/advanceReports/revenue-reports-parking/action';

describe('Revenue report by parking reducer test', function () {

    it('should return initial state', function () {
        let state = reducer(undefined, {});

        state.fromDate.should.be.equal(pastDate);

        state.toDate.should.be.equal(presentDate);
    });

    it('action should be correctly modify state', function () {
        let date = new Date();

        let state = reducer(undefined, actions.setToDuration(date));

        state.toDate.should.be.equal(date);

    });

    it('action to set fromDate should modify state', function () {
        let date = new Date();

        let state = reducer(undefined, actions.setFromDuration(date));

        state.fromDate.should.be.equal(date);
    });

    it('paymentTypes array should be set correctly', function () {
        let paymentTypes = [];

        let state = reducer(undefined, actions.setPaymentTypes(paymentTypes));

        state.paymentTypes.should.be.equal(paymentTypes);
    });

});