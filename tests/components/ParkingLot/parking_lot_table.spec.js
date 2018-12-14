import React, {Component} from 'react';

import sinon from 'sinon';
import {mount} from 'enzyme';
import {fakeStore} from '../../../src/store/fake_store';
import {push} from 'react-router-redux';
import {
    getParkingLotsCount,
    getParkingAreaTypes,
    getParkingLots,
    getParkingTypes,
    getTicketingSystems,
} from '../../../src/manage/parkingLot/action';
import {getCompany} from '../../../src/manage/companyHeader/action';
import {PureParkingLotTable} from '../../../src/manage/parkingLot/components';
import {Provider}from 'react-redux';
import {constants} from '../../../src/constants';
import helper from '../../helper';
describe('Parking Lot Table', function () {

    let store, parkingLotData, pushSpy, location, companyData, locationCompanyId, locationParkingId,
        getParkingLotCountSpy, getParkingLotsSpy, getParkingAreaTypesSpy, getParkingTypesSpy,
        getTicketingSystemsSpy, getCompanySpy, columnHeadingData, columnPropertyData, pageLength;

    beforeEach(() => {
        store = fakeStore({});

        pushSpy = sinon.spy(push);

        companyData = {
            id: 786,
            name: "xyz",
            contactNumber: 9876,
            address: "abc",
            city: "zyz"

        };

        pageLength = 10;

        parkingLotData = [
            {
                "id": 1,
                "name": "Panache 1.1",
                "openTime": "08:00:00",
                "closeTime": "23:59:00",
                "parkingId": 1,
                "leftPhoto": "",
                "rightPhoto": "",
                "frontPhoto": "",
                "parkingType": "Street",
                "parkingOwner": "",
                "collectionAt": null,
                "avgParkingWeekday": 0,
                "avgParkingWeekend": 0,
                "ticketingSystem": "Handheld System",
                "extraNotes": "",
                "geoLocation": null,
                "parkingArea": null,
                "parkingAreaType": "Point",
                "deleted": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2017-02-07T14:45:27.000Z",
                "email": null,
                "parkings": {
                    "id": 1,
                    "name": "Panache 11213nnlkn",
                    "address": "Sec 25A Noida  M:09910683855",
                    "city": "Noida",
                    "contactNumber": "9943556789",
                    "companyId": 1,
                    "category": null,
                    "landmark": "",
                    "bookingState": "BOOKABLE",
                    "createdBy": null,
                    "updatedBy": "1701",
                    "createdAt": "2016-02-02T19:35:47.000Z",
                    "updatedAt": "2017-02-16T10:39:18.000Z",
                    "deleted": 0,
                    "nFactor": 1,
                    "nFactorCount": 1
                }
            }, {
                "id": 2,
                "name": "BSES Vikas Margdfvderefr",
                "openTime": "00:00:00",
                "closeTime": "23:59:59",
                "parkingId": 2,
                "leftPhoto": "",
                "rightPhoto": "",
                "frontPhoto": "",
                "parkingType": "Street",
                "parkingOwner": "fv",
                "collectionAt": null,
                "avgParkingWeekday": 0,
                "avgParkingWeekend": 0,
                "ticketingSystem": "Handheld System",
                "extraNotes": "",
                "geoLocation": {"lat": 28.62823, "lng": 77.27474},
                "parkingArea": null,
                "parkingAreaType": null,
                "deleted": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2017-02-13T08:52:24.000Z",
                "email": null,
                "parkings": {
                    "id": 2,
                    "name": "BSES, Vikas Marg, Laxmi nagar",
                    "address": "Laxmi Nagar",
                    "city": "Delhi",
                    "contactNumber": null,
                    "companyId": 2,
                    "category": null,
                    "landmark": null,
                    "bookingState": "DEPLOYED_NOT_BOOKABLE",
                    "createdBy": null,
                    "updatedBy": "1701",
                    "createdAt": "2016-02-02T19:35:47.000Z",
                    "updatedAt": "2017-02-07T15:44:40.000Z",
                    "deleted": 0,
                    "nFactor": 1,
                    "nFactorCount": 1
                }
            }, {
                "id": 3,
                "name": "Lalita Parkdsvsv",
                "openTime": "00:00:00",
                "closeTime": "23:59:59",
                "parkingId": 3,
                "leftPhoto": "",
                "rightPhoto": "",
                "frontPhoto": "",
                "parkingType": "Road Side",
                "parkingOwner": "",
                "collectionAt": null,
                "avgParkingWeekday": 0,
                "avgParkingWeekend": 0,
                "ticketingSystem": "Handheld System",
                "extraNotes": "",
                "geoLocation": {"lat": 28.63199, "lng": 77.27096},
                "parkingArea": null,
                "parkingAreaType": null,
                "deleted": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2017-02-13T08:39:17.000Z",
                "email": null,
                "parkings": {
                    "id": 3,
                    "name": "Lalita Park, Laxmi nagar",
                    "address": "Laxmi Nagar",
                    "city": "Delhi",
                    "contactNumber": null,
                    "companyId": 2,
                    "category": null,
                    "landmark": null,
                    "bookingState": "DEPLOYED_NOT_BOOKABLE",
                    "createdBy": null,
                    "updatedBy": "1701",
                    "createdAt": "2016-02-02T19:35:47.000Z",
                    "updatedAt": "2017-02-13T08:39:17.000Z",
                    "deleted": 0,
                    "nFactor": 1,
                    "nFactorCount": 1
                }
            }, {
                "id": 4,
                "name": "Pandav Nagarklm",
                "openTime": "00:00:00",
                "closeTime": "23:59:59",
                "parkingId": 4,
                "leftPhoto": "",
                "rightPhoto": "",
                "frontPhoto": "",
                "parkingType": "Open Surface",
                "parkingOwner": "",
                "collectionAt": null,
                "avgParkingWeekday": 0,
                "avgParkingWeekend": 0,
                "ticketingSystem": "Handheld System",
                "extraNotes": "",
                "geoLocation": {"lat": 28.61478, "lng": 77.27764},
                "parkingArea": null,
                "parkingAreaType": null,
                "deleted": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2017-02-13T10:19:17.000Z",
                "email": null,
                "parkings": {
                    "id": 4,
                    "name": "Pandav Nagarassd",
                    "address": "Near Mother Dairy, Pandav Nagar",
                    "city": "Delhi",
                    "contactNumber": "",
                    "companyId": 2,
                    "category": null,
                    "landmark": "",
                    "bookingState": "DEPLOYED_NOT_BOOKABLE",
                    "createdBy": null,
                    "updatedBy": "1701",
                    "createdAt": "2016-02-02T19:35:47.000Z",
                    "updatedAt": "2017-02-13T10:44:14.000Z",
                    "deleted": 0,
                    "nFactor": 1,
                    "nFactorCount": 1
                }
            }, {
                "id": 5,
                "name": "Panache 2.1",
                "openTime": "00:00:00",
                "closeTime": "23:59:59",
                "parkingId": 5,
                "leftPhoto": null,
                "rightPhoto": null,
                "frontPhoto": null,
                "parkingType": "Open Surface",
                "parkingOwner": null,
                "collectionAt": null,
                "avgParkingWeekday": null,
                "avgParkingWeekend": null,
                "ticketingSystem": null,
                "extraNotes": null,
                "geoLocation": null,
                "parkingArea": null,
                "parkingAreaType": null,
                "deleted": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2016-11-21T03:53:41.000Z",
                "email": null,
                "parkings": {
                    "id": 5,
                    "name": "Panache 21",
                    "address": "testvd1",
                    "city": "lucknow1",
                    "contactNumber": "9971438996",
                    "companyId": 1,
                    "category": "Educational Institute",
                    "landmark": "sfdsv1",
                    "bookingState": "BOOKABLE",
                    "createdBy": null,
                    "updatedBy": "1701",
                    "createdAt": "2016-02-02T19:35:47.000Z",
                    "updatedAt": "2017-02-17T09:27:43.000Z",
                    "deleted": 0,
                    "nFactor": 0.5,
                    "nFactorCount": 1
                }
            }, {
                "id": 6,
                "name": "Ramesh Park 1",
                "openTime": "00:00:00",
                "closeTime": "23:59:59",
                "parkingId": 6,
                "leftPhoto": null,
                "rightPhoto": null,
                "frontPhoto": null,
                "parkingType": "Open Surface",
                "parkingOwner": null,
                "collectionAt": null,
                "avgParkingWeekday": null,
                "avgParkingWeekend": null,
                "ticketingSystem": null,
                "extraNotes": null,
                "geoLocation": {"lat": 28.63542, "lng": 77.26994},
                "parkingArea": null,
                "parkingAreaType": null,
                "deleted": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2016-11-21T03:53:41.000Z",
                "email": null,
                "parkings": {
                    "id": 6,
                    "name": "Ramesh Park",
                    "address": "Laxmi Nagar",
                    "city": "Delhi",
                    "contactNumber": null,
                    "companyId": 2,
                    "category": null,
                    "landmark": null,
                    "bookingState": "DEPLOYED_NOT_BOOKABLE",
                    "createdBy": null,
                    "updatedBy": null,
                    "createdAt": "2016-02-02T19:35:47.000Z",
                    "updatedAt": "2016-11-24T19:53:13.000Z",
                    "deleted": 0,
                    "nFactor": 1,
                    "nFactorCount": 1
                }
            }, {
                "id": 7,
                "name": "Geeta Colony",
                "openTime": "00:00:00",
                "closeTime": "23:59:59",
                "parkingId": 7,
                "leftPhoto": null,
                "rightPhoto": null,
                "frontPhoto": null,
                "parkingType": "Open Surface",
                "parkingOwner": null,
                "collectionAt": null,
                "avgParkingWeekday": null,
                "avgParkingWeekend": null,
                "ticketingSystem": null,
                "extraNotes": null,
                "geoLocation": null,
                "parkingArea": null,
                "parkingAreaType": null,
                "deleted": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2016-11-21T03:53:41.000Z",
                "email": null,
                "parkings": {
                    "id": 7,
                    "name": "Geeta Colony",
                    "address": "Geeta Colony",
                    "city": "Delhi",
                    "contactNumber": null,
                    "companyId": 3,
                    "category": null,
                    "landmark": null,
                    "bookingState": "DEPLOYED_NOT_BOOKABLE",
                    "createdBy": null,
                    "updatedBy": null,
                    "createdAt": "2016-02-02T19:35:47.000Z",
                    "updatedAt": "2016-11-16T08:59:20.000Z",
                    "deleted": 0,
                    "nFactor": 1,
                    "nFactorCount": 1
                }
            }, {
                "id": 8,
                "name": "Panache1.2nllnk",
                "openTime": "00:00:00",
                "closeTime": "23:59:59",
                "parkingId": 1,
                "leftPhoto": "",
                "rightPhoto": "",
                "frontPhoto": "",
                "parkingType": "Open Surface",
                "parkingOwner": "",
                "collectionAt": null,
                "avgParkingWeekday": 0,
                "avgParkingWeekend": 0,
                "ticketingSystem": "Ticket Dispenser",
                "extraNotes": "",
                "geoLocation": null,
                "parkingArea": null,
                "parkingAreaType": null,
                "deleted": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2017-02-07T14:41:45.000Z",
                "email": null,
                "parkings": {
                    "id": 1,
                    "name": "Panache 11213nnlkn",
                    "address": "Sec 25A Noida  M:09910683855",
                    "city": "Noida",
                    "contactNumber": "9943556789",
                    "companyId": 1,
                    "category": null,
                    "landmark": "",
                    "bookingState": "BOOKABLE",
                    "createdBy": null,
                    "updatedBy": "1701",
                    "createdAt": "2016-02-02T19:35:47.000Z",
                    "updatedAt": "2017-02-16T10:39:18.000Z",
                    "deleted": 0,
                    "nFactor": 1,
                    "nFactorCount": 1
                }
            }, {
                "id": 9,
                "name": "Palm court mall",
                "openTime": "09:00:00",
                "closeTime": "09:00:00",
                "parkingId": 8,
                "leftPhoto": null,
                "rightPhoto": null,
                "frontPhoto": null,
                "parkingType": "Open Surface",
                "parkingOwner": null,
                "collectionAt": null,
                "avgParkingWeekday": null,
                "avgParkingWeekend": null,
                "ticketingSystem": null,
                "extraNotes": null,
                "geoLocation": {"lat": 28.47245, "lng": 77.05482},
                "parkingArea": null,
                "parkingAreaType": null,
                "deleted": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2016-11-21T03:53:41.000Z",
                "email": null,
                "parkings": {
                    "id": 8,
                    "name": "Palm Court Mall",
                    "address": "Gurgaon",
                    "city": "Gurgaon",
                    "contactNumber": null,
                    "companyId": 4,
                    "category": null,
                    "landmark": null,
                    "bookingState": "DEPLOYED_NOT_BOOKABLE",
                    "createdBy": null,
                    "updatedBy": null,
                    "createdAt": "2016-02-02T19:35:47.000Z",
                    "updatedAt": "2016-06-22T10:22:29.000Z",
                    "deleted": 0,
                    "nFactor": 1,
                    "nFactorCount": 1
                }
            }, {
                "id": 10,
                "name": "Main Market Rajouri -1",
                "openTime": "00:00:00",
                "closeTime": "23:59:59",
                "parkingId": 9,
                "leftPhoto": null,
                "rightPhoto": null,
                "frontPhoto": null,
                "parkingType": "Open Surface",
                "parkingOwner": null,
                "collectionAt": null,
                "avgParkingWeekday": null,
                "avgParkingWeekend": null,
                "ticketingSystem": null,
                "extraNotes": null,
                "geoLocation": {"lat": 28.64152, "lng": 77.1209},
                "parkingArea": null,
                "parkingAreaType": null,
                "deleted": 0,
                "createdAt": "2016-02-02T19:35:45.000Z",
                "updatedAt": "2016-11-21T03:53:41.000Z",
                "email": null,
                "parkings": {
                    "id": 9,
                    "name": "Rajouri Garden Main market",
                    "address": "Delhi",
                    "city": "Delhi",
                    "contactNumber": null,
                    "companyId": 5,
                    "category": null,
                    "landmark": null,
                    "bookingState": "DEPLOYED_NOT_BOOKABLE",
                    "createdBy": null,
                    "updatedBy": null,
                    "createdAt": "2016-02-02T19:35:47.000Z",
                    "updatedAt": "2016-06-22T10:22:29.000Z",
                    "deleted": 0,
                    "nFactor": 1,
                    "nFactorCount": 1
                }
            }];
        locationCompanyId = 1;
        locationParkingId = 1;

        location = {
            "query": {
                "companyId": locationCompanyId,
                "parkingId": locationParkingId
            }
        };

        getParkingLotCountSpy = sinon.spy(getParkingLotsCount);
        getParkingLotsSpy = sinon.spy(getParkingLots);
        getParkingAreaTypesSpy = sinon.spy(getParkingAreaTypes);
        getParkingTypesSpy = sinon.spy(getParkingTypes);
        getTicketingSystemsSpy = sinon.spy(getTicketingSystems);
        getCompanySpy = sinon.spy(getCompany);

        columnHeadingData = ['ID', 'Name', 'Parking Owner', 'Parking Type', 'EDIT'];
        columnPropertyData = ['id', 'name', 'parkingOwner', 'parkingType', 'createdAt'];
    });


    it('getParkingAreaTypes, getParkingTypes, and getTicketingSystems must be called in componentDidMount', function () {
        /**let wrapper =*/ mount(/**<Provider store={store}>*/
            <PureParkingLotTable getParkingLotsCount={getParkingLotCountSpy}
                                 getParkingAreaTypes={getParkingAreaTypesSpy}
                                 getParkingTypes={getParkingTypesSpy} getTicketingSystems={getTicketingSystemsSpy}/>
            /**</Provider>*/);

        getParkingAreaTypesSpy.should.have.callCount(1);
        getParkingTypesSpy.should.have.callCount(1);
        getTicketingSystemsSpy.should.have.callCount(1);
    });


    it('getParkingLotsCount is called with parkingId when location object exists', function () {
        /**let wrapper =*/ mount(/**<Provider store={store}>*/
            <PureParkingLotTable location={location} getParkingLotsCount={getParkingLotCountSpy}
                                 getCompany={getCompanySpy} getParkingAreaTypes={getParkingAreaTypesSpy}
                                 getParkingTypes={getParkingTypesSpy} getTicketingSystems={getTicketingSystemsSpy}/>
            /**</Provider>*/);


        getCompanySpy.should.have.callCount(1);
        getCompanySpy.should.have.been.calledWith(location.query.companyId);

        getParkingLotCountSpy.should.have.callCount(1);
        getParkingLotCountSpy.should.have.been.calledWith(location.query.parkingId);
    });

    it('ParkingLotTable.getParkingLotColumns should return correct data', function () {
        let parkingLotColumnData = (new PureParkingLotTable({})).getParkingLotColumns();

        parkingLotColumnData.map(function (parkingLotColumn) {

            columnHeadingData.filter(function (item) {
                return parkingLotColumn.header.label.toLowerCase() == item.toLowerCase();
            }).length.should.be.equal(1);

            columnPropertyData.filter(function (item) {
                return parkingLotColumn.property == item;
            }).length.should.be.equal(1);
        });


    });

    it('onRowSelected of ParkingLotTable should work properly', function () {
        let props = {
            location, push: pushSpy
        };

        let parkingLotTableObject = new PureParkingLotTable(props);

        let row = {
            "id": 1,
            "name": "Panache 1.1",
            "openTime": "08:00:00",
            "closeTime": "23:59:00",
            "parkingId": 1,
            "leftPhoto": "",
            "rightPhoto": "",
            "frontPhoto": "",
            "parkingType": "Street",
            "parkingOwner": "",
            "collectionAt": null,
            "avgParkingWeekday": 0,
            "avgParkingWeekend": 0,
            "ticketingSystem": "Handheld System",
            "extraNotes": "",
            "geoLocation": null,
            "parkingArea": null,
            "parkingAreaType": "Point",
            "deleted": 0,
            "createdAt": "2016-02-02T19:35:45.000Z",
            "updatedAt": "2017-02-07T14:45:27.000Z",
            "email": null,
            "parkings": {
                "id": 1,
                "name": "Panache 11213nnlkn",
                "address": "Sec 25A Noida  M:09910683855",
                "city": "Noida",
                "contactNumber": "9943556789",
                "companyId": 1,
                "category": null,
                "landmark": "",
                "bookingState": "BOOKABLE",
                "createdBy": null,
                "updatedBy": "1701",
                "createdAt": "2016-02-02T19:35:47.000Z",
                "updatedAt": "2017-02-16T10:39:18.000Z",
                "deleted": 0,
                "nFactor": 1,
                "nFactorCount": 1
            }
        };

        parkingLotTableObject.onRowSelectedListener(row);

        let path = constants.pathConstants.PARKING_SUBLOT + '?companyId=' + row.parkings.companyId
            + '&parkingId=' + row.parkings.id + '&parkingLotId=' + row.id;

        pushSpy.should.have.callCount(1);

        pushSpy.should.have.been.calledWith(path);
    });

    it('onPageSelected of ParkingLot should call getParkingLots with limit and skip if location object is not speicified in props', function () {
        let parkingLot = new PureParkingLotTable({
            getParkingLots: getParkingLotsSpy
        });

        let randomNumber = helper.generateRandomNautralNumber();

        parkingLot.onPageSelectedListener(randomNumber);

        getParkingLotsSpy.should.have.callCount(1);

        getParkingLotsSpy.should.have.been.calledWith(10, (randomNumber - 1) * 10);

    });


    it('Search suggestions must be correctly called with and without location', function () {
        let parkingLot = new PureParkingLotTable({
            location,
            getParkingLots: getParkingLotsSpy
        });

        let randomString = helper.generateRandomString(helper.generateRandomNautralNumber());

        parkingLot.fetchSearchSuggestions(randomString);

        getParkingLotsSpy.should.have.callCount(1);
        getParkingLotsSpy.should.have.been.calledWith(5, 0, location.query.parkingId, randomString);

        parkingLot = new PureParkingLotTable({
            getParkingLots: getParkingLotsSpy
        });

        parkingLot.fetchSearchSuggestions(randomString);

        getParkingLotsSpy.should.have.been.calledWith(5, 0, undefined, randomString);

    });


});