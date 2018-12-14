/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';

import * as actions from '../../src/advanceReports/revenue-reports-parking/action';
import actionType from '../../src/advanceReports/revenue-reports-parking/actionType';

describe('Revenue report by parking action test', function () {

    it('set to duration action test', function () {
        let date = new Date();

        let action = actions.setToDuration(date);

        let conceivedAction = {
            type: actionType.SET_TO_DURATION_DATE,
            payload: {
                date: date
            }
        };

        action.type.should.be.equal(conceivedAction.type);
        action.payload.date.should.be.equal(conceivedAction.payload.date);
    });

    it('set from duration action test ', function () {
        let date = new Date();

        let action = actions.setFromDuration(date);

        let conceivedAction = {
            type: actionType.SET_FROM_DURATION_DATE,
            payload: {
                date: date
            }
        };

        action.type.should.be.equal(conceivedAction.type);

        action.payload.date.should.be.equal(conceivedAction.payload.date);
    });

    it('set payment modes action', function () {

        let paymentModes = [];

        let action = actions.setPaymentTypes(paymentModes);

        let conceivedAction = {
            type: actionType.SET_PAYMENT_TYPES,
            payload: {
                paymentTypes: paymentModes
            }
        };

        action.type.should.be.equal(conceivedAction.type);
        action.payload.paymentTypes.should.be.equal(conceivedAction.payload.paymentTypes);

    });

});