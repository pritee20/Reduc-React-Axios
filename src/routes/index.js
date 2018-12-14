/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


//Node Module Imports
import React from 'react';
import {Route, IndexRoute} from 'react-router';


//User Module Imports
import {requireAuthentication} from '../hoc/AuthenticatedComponent';
import BaseHorizontal from '../components/Layout/BaseHorizontal';
import SingleView from '../components/SingleView/SingleView';
import ManageContainer from '../manage/components/ManageContainer';
import UserProfile from '../manage/user/components/ManageUser.jsx';
import ParkingTable from '../manage/parking/components/ParkingTable';
import ParkingLotTable from '../manage/parkingLot/components/ParkingLotTable';
import ParkingSubLotTable from '../manage/parkingSubLot/components/ParkingSubLotTable';
import ReceiptContents from '../manage/parkingSubLot/receiptContents/components/ReceiptContents';
import Login from '../login/components/Login';
import reports from '../reports';
import accessConstants from '../constants/AccessConstants';
import DuplicateReceiptContent from '../manage/duplicateReceiptContent/DuplicateReceiptContent';
import Pricing from '../manage/pricing/components/Pricing.jsx';
import Error from '../error.jsx';
import ReportContainer from '../advanceReports/components/ReportContainer';
import {ChartsDemo} from '../charts-demo';
import {constants} from '../constants';
import {CheckInCount} from '../check-in-count/CheckInCount';

export default (
    <Route path='/' component={BaseHorizontal}>
        <IndexRoute component={Login}/>
        <Route path="dashboard" component={requireAuthentication(SingleView, accessConstants.TYPE_DASHBOARD)}/>
        <Route path="reports" component={requireAuthentication(reports.components.ReportsView, accessConstants.TYPE_REPORT)}/>
        <Route path="new-reports" component={requireAuthentication(ReportContainer, accessConstants.TYPE_REPORT)}/>
        <Route path="manage" component={requireAuthentication(ManageContainer, accessConstants.TYPE_MANAGE)}/>
        <Route path="error" component={requireAuthentication(Error, accessConstants.TYPE_ERROR)}/>
        <Route path="user" component={requireAuthentication(UserProfile, accessConstants.TYPE_MANAGE)}/>
        <Route path="parking" component={requireAuthentication(ParkingTable, accessConstants.TYPE_MANAGE)}/>
        <Route path="parkingLot" component={requireAuthentication(ParkingLotTable, accessConstants.TYPE_MANAGE)}/>
        <Route path="parkingSubLot" component={requireAuthentication(ParkingSubLotTable, accessConstants.TYPE_MANAGE)}/>
        <Route path="receiptContent" component={requireAuthentication(ReceiptContents, accessConstants.TYPE_MANAGE)}/>
        <Route path="duplicateReceiptContent" component={requireAuthentication(DuplicateReceiptContent, accessConstants.TYPE_MANAGE)}/>
        <Route path="pricing" component={requireAuthentication(Pricing, accessConstants.TYPE_MANAGE)}/>
            <Route path="checkInCount" component={CheckInCount} />
        <Route path={constants.pathConstants.DEMO} component={ChartsDemo}/>
    </Route>
);
