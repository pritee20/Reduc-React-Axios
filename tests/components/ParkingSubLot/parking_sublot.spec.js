import React, {Component} from 'react';

import sinon from 'sinon';
import {mount} from 'enzyme';
import {AutocompleteSearchBox, GMPTable, ProgressContainer, Button} from '../../../src/core';
import {PureParkingSubLotTable} from '../../../src/manage/parkingSubLot/components';
import {fakeStore} from '../../../src/store/fake_store';
import {Provider} from 'react-redux';
import {constants} from '../../../src/constants';
import helper from '../../helper';
import {push} from 'react-router-redux';
import {
    getParkingSubLots, getParkingSubblotCount, getCollectionModelTypes, getPlateNumberTypes, getSubLotTypes
} from '../../../src/manage/parkingSubLot/action';

import {getCompany} from '../../../src/manage/companyHeader/action';

describe('ParkingSubLotTable', function () {

    let fetchParkingSubLotsSpy, fetchCollectionModelsSpy, fetchPlateNumberTypesSpy, fetchSubLotTypesSpy,
        fetchSubLotCountSpy, location, fetchCompanySpy, pushSpy;

    before(() => {
        fetchParkingSubLotsSpy = sinon.spy(getParkingSubLots);
        fetchCollectionModelsSpy = sinon.spy(getCollectionModelTypes);
        fetchPlateNumberTypesSpy = sinon.spy(getPlateNumberTypes);
        fetchSubLotTypesSpy = sinon.spy(getSubLotTypes);
        fetchSubLotCountSpy = sinon.spy(getParkingSubblotCount);
        fetchCompanySpy = sinon.spy(getCompany);
        pushSpy = sinon.spy(push);
        location = {
            query: {
                companyId: helper.generateRandomNautralNumber(),
                parkingId: helper.generateRandomNautralNumber(),
                parkingLotId: helper.generateRandomNautralNumber()
            }
        };
    });

    it('componentDidMount must call parkingSubLots, collectionModelTypes, plateNumberTypes and subLotTypes', function () {

        mount(<PureParkingSubLotTable
            location={location} getParkingSubLots={fetchParkingSubLotsSpy}
            getParkingSubblotCount={fetchSubLotCountSpy}
            getCollectionModelTypes={fetchCollectionModelsSpy}
            getPlateNumberTypes={fetchPlateNumberTypesSpy}
            getSubLotTypes={fetchSubLotTypesSpy}
            getCompany={fetchCompanySpy}
        />);
        fetchCompanySpy.should.have.been.calledWith(location.query.companyId);
        fetchSubLotCountSpy.should.have.been.calledWith(location.query.parkingLotId);
        fetchCollectionModelsSpy.should.have.callCount(1);
        fetchSubLotTypesSpy.should.have.callCount(1);
        fetchPlateNumberTypesSpy.should.have.callCount(1);
    });

    it('redirect to error page if location object not available', function () {
        mount(<PureParkingSubLotTable push={pushSpy}/>);

        pushSpy.should.have.been.calledWith(constants.pathConstants.ERROR_PATH);

    });

    it('onPageSelected should work properly', function () {
        let parkingSubLotTable = new PureParkingSubLotTable({
            location, getParkingSubLots: fetchParkingSubLotsSpy
        });
        let pageLength = 10;
        let randomNumber = helper.generateRandomNautralNumber();
        let skip = (randomNumber - 1) * pageLength;
        parkingSubLotTable.onPageSelectedListener(randomNumber);
        fetchParkingSubLotsSpy.should.have.been.calledWith(pageLength, skip, location.query.parkingLotId);

    });

    it('GMPTable should render correctly', function () {

        let rows = [
            {
                "id": 6,
                "type": "CAR_24",
                "capacity": 100,
                "collectionModel": "POSTPAID",
                "taxiTime": "13:01:00",
                "autoCheckoutTime": "18:30:00",
                "autoCheckoutCost": null,
                "parkingLotId": 2,
                "bookingSecurity": 0,
                "convenienceFee": 0,
                "bookingNotes": "",
                "plateNumberType": "NUMERIC",
                "mobileRequired": "NA",
                "valetName": "NA",
                "lastCheckinUpdateTime": "00:01:00",
                "insidePhoto": "",
                "lostTicketFee": 0,
                "challanCost": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2016-11-24T12:42:35.000Z",
                "deleted": 0
            }, {
                "id": 7,
                "type": "BIKE",
                "capacity": 300,
                "collectionModel": "POSTPAID",
                "taxiTime": "00:01:00",
                "autoCheckoutTime": null,
                "autoCheckoutCost": null,
                "parkingLotId": 2,
                "bookingSecurity": 0,
                "convenienceFee": 0,
                "bookingNotes": null,
                "plateNumberType": "NUMERIC",
                "mobileRequired": "NA",
                "valetName": "NA",
                "lastCheckinUpdateTime": "00:01:00",
                "insidePhoto": null,
                "lostTicketFee": 0,
                "challanCost": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2016-04-14T11:56:33.000Z",
                "deleted": 0
            }];
        let pageLength = 10, showProgress = false;
        let totalEntries = (helper.generateRandomNautralNumber() + 1) * pageLength;

        let totalPages = parseInt(totalEntries / pageLength);

        let wrapper = mount(<PureParkingSubLotTable
            location={location} getParkingSubLots={fetchParkingSubLotsSpy}
            getParkingSubblotCount={fetchSubLotCountSpy}
            getCollectionModelTypes={fetchCollectionModelsSpy}
            getPlateNumberTypes={fetchPlateNumberTypesSpy}
            getSubLotTypes={fetchSubLotTypesSpy}
            parkingSubLotData={rows}
            totalPages={totalPages}
            showProgress={showProgress}
            totalParkingSubLots={totalEntries}
            getCompany={fetchCompanySpy}
        />);

        let tableWrapper = wrapper.find(GMPTable);

        let props = tableWrapper.props();

        props.rows.should.be.equal(rows);
    });

    it('button click should work correctly', function () {

        let rows = [
            {
                "id": 6,
                "type": "CAR_24",
                "capacity": 100,
                "collectionModel": "POSTPAID",
                "taxiTime": "13:01:00",
                "autoCheckoutTime": "18:30:00",
                "autoCheckoutCost": null,
                "parkingLotId": 2,
                "bookingSecurity": 0,
                "convenienceFee": 0,
                "bookingNotes": "",
                "plateNumberType": "NUMERIC",
                "mobileRequired": "NA",
                "valetName": "NA",
                "lastCheckinUpdateTime": "00:01:00",
                "insidePhoto": "",
                "lostTicketFee": 0,
                "challanCost": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2016-11-24T12:42:35.000Z",
                "deleted": 0
            }, {
                "id": 7,
                "type": "BIKE",
                "capacity": 300,
                "collectionModel": "POSTPAID",
                "taxiTime": "00:01:00",
                "autoCheckoutTime": null,
                "autoCheckoutCost": null,
                "parkingLotId": 2,
                "bookingSecurity": 0,
                "convenienceFee": 0,
                "bookingNotes": null,
                "plateNumberType": "NUMERIC",
                "mobileRequired": "NA",
                "valetName": "NA",
                "lastCheckinUpdateTime": "00:01:00",
                "insidePhoto": null,
                "lostTicketFee": 0,
                "challanCost": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2016-04-14T11:56:33.000Z",
                "deleted": 0
            }];
        let pageLength = 10, showProgress = false;
        let totalEntries = helper.generateRandomNautralNumber() * pageLength;

        let totalPages = parseInt(totalEntries / pageLength);

        let wrapper = mount(<PureParkingSubLotTable
            location={location} getParkingSubLots={fetchParkingSubLotsSpy}
            getParkingSubblotCount={fetchSubLotCountSpy}
            getCollectionModelTypes={fetchCollectionModelsSpy}
            getPlateNumberTypes={fetchPlateNumberTypesSpy}
            getSubLotTypes={fetchSubLotTypesSpy}
            parkingSubLotData={rows}
            totalPages={totalPages}
            showProgress={showProgress}
            totalParkingSubLots={totalEntries}
            getCompany={fetchCompanySpy}
        />);

        let tableWrapper = wrapper.find(GMPTable);

        let editButton = tableWrapper.find('tbody').find('tr').at(0).find(Button);
        

        editButton.length.should.be.equal(3);

    });
});