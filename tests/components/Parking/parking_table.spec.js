import React, {Component} from 'react';
import sinon from 'sinon';
import {mount, shallow} from 'enzyme';
import {fakeStore} from '../../../src/store/fake_store';
import {Provider} from 'react-redux';
import {PureParkingTable} from '../../../src/manage/parking/components';
import {getParkingsCount, getBookingState, getParkingCategories, getParkings} from '../../../src/manage/parking/action';
import {getCompany} from '../../../src/manage/companyHeader/action';
import {GMPTable, ProgressContainer} from '../../../src/core';
import {push} from 'react-router-redux';
import {constants} from '../../../src/constants';
import helper from '../../helper';
describe('Parking Table', function () {

    let store, state, location, companyData, getParkingsCountSpy, getCompanySpy, getParkingsSpy,
        parkingData, bookingStateSpy, parkingCategorySpy, bookingStates, pushSpy,
        parkingCategories, editParkingData;


    beforeEach(() => {
        store = fakeStore({});

        location = {query: {companyId: 3}};

        companyData = {
            id: 786,
            name: "xyz",
            contactNumber: 9876,
            address: "abc",
            city: "zyz"

        };

        getCompanySpy = sinon.spy(getCompany);
        getParkingsCountSpy = sinon.spy(getParkingsCount);
        bookingStateSpy = sinon.spy(getBookingState);
        parkingCategorySpy = sinon.spy(getParkingCategories);
        getParkingsSpy = sinon.spy(getParkings);
        pushSpy = sinon.spy(push);

        bookingStates = ["BOOKABLE", "DEPLOYED_NOT_BOOKABLE", "NOT_DEPLOYED"];
        parkingCategories = ["Airport", "Bus Station", "Corporate/Office", "Educational Institute",
            "Event venue", "Hotel", "Mall", "Market", "Metro Station", "Miscellaneous", "Residential",
            "Shopping Complex", "Train Station"];
        editParkingData = {};
        parkingData = [
            {
            "id": 1,
            "name": "Panache 11213",
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
            "updatedAt": "2017-02-06T00:21:15.000Z",
            "deleted": 0,
            "nFactor": 1,
            "nFactorCount": 1
        }, {
            "id": 5,
            "name": "Panache 2",
            "address": "test",
            "city": "Mumbai",
            "contactNumber": "Mohit",
            "companyId": 1,
            "category": "Corporate/Office",
            "landmark": "",
            "bookingState": "DEPLOYED_NOT_BOOKABLE",
            "createdBy": null,
            "updatedBy": "1701",
            "createdAt": "2016-02-02T19:35:47.000Z",
            "updatedAt": "2017-02-06T00:21:00.000Z",
            "deleted": 0,
            "nFactor": 0.5,
            "nFactorCount": 1
        }, {
            "id": 14,
            "name": "District Centre Demo",
            "address": "Saket",
            "city": "Delhi",
            "contactNumber": null,
            "companyId": 1,
            "category": null,
            "landmark": null,
            "bookingState": "BOOKABLE",
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2016-02-02T19:35:47.000Z",
            "updatedAt": "2016-11-21T07:20:56.000Z",
            "deleted": 0,
            "nFactor": 0.5,
            "nFactorCount": 1
        }, {
            "id": 17,
            "name": "Arya Samaj Road",
            "address": "Karol Bagh",
            "city": "Delhi",
            "contactNumber": null,
            "companyId": 1,
            "category": null,
            "landmark": null,
            "bookingState": "NOT_DEPLOYED",
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2016-02-02T19:35:47.000Z",
            "updatedAt": "2016-06-22T09:37:52.000Z",
            "deleted": 0,
            "nFactor": 1,
            "nFactorCount": 1
        }, {
            "id": 18,
            "name": "Tibetan Market Monastery konichiwa",
            "address": "Civil Line Zone",
            "city": "Delhi",
            "contactNumber": "",
            "companyId": 1,
            "category": null,
            "landmark": "",
            "bookingState": "NOT_DEPLOYED",
            "createdBy": null,
            "updatedBy": "1701",
            "createdAt": "2016-02-02T19:35:47.000Z",
            "updatedAt": "2017-02-06T01:02:12.000Z",
            "deleted": 0,
            "nFactor": 1,
            "nFactorCount": 1
        }, {
            "id": 19,
            "name": "Tilak Nagar",
            "address": "Tilak Nagar",
            "city": "Delhi",
            "contactNumber": null,
            "companyId": 1,
            "category": null,
            "landmark": null,
            "bookingState": "NOT_DEPLOYED",
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2016-02-02T19:35:47.000Z",
            "updatedAt": "2016-06-22T09:37:52.000Z",
            "deleted": 0,
            "nFactor": 1,
            "nFactorCount": 1
        }, {
            "id": 41,
            "name": "Azadpur Metro",
            "address": "Azadpur",
            "city": "Delhi",
            "contactNumber": null,
            "companyId": 1,
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
        }, {
            "id": 2997,
            "name": "Test Parking",
            "address": "DC,Janakpuri",
            "city": "Delhi",
            "contactNumber": "9999234786",
            "companyId": 1,
            "category": "Market",
            "landmark": "Near janakpuri west metro",
            "bookingState": "BOOKABLE",
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2016-10-17T10:19:18.000Z",
            "updatedAt": "2016-10-17T10:19:18.000Z",
            "deleted": 0,
            "nFactor": 0.5,
            "nFactorCount": 0.5
        }, {
            "id": 2998,
            "name": "New Parking Data",
            "address": "f-5,Cant Area",
            "city": "Delhi",
            "contactNumber": "8712131123",
            "companyId": 1,
            "category": "Residential",
            "landmark": "Near Dhaula Kuan",
            "bookingState": "DEPLOYED_NOT_BOOKABLE",
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2016-10-18T14:49:06.000Z",
            "updatedAt": "2016-10-18T14:49:06.000Z",
            "deleted": 0,
            "nFactor": 0.4,
            "nFactorCount": 0.78
        }, {
            "id": 3002,
            "name": "Test ASSSAWW",
            "address": "dsada,Sdsad",
            "city": "Mumbai",
            "contactNumber": "9876234567",
            "companyId": 1,
            "category": "Airport",
            "landmark": "Newewe",
            "bookingState": "BOOKABLE",
            "createdBy": null,
            "updatedBy": null,
            "createdAt": "2016-10-18T15:43:32.000Z",
            "updatedAt": "2016-10-18T15:43:32.000Z",
            "deleted": 0,
            "nFactor": 0.4,
            "nFactorCount": 1
        }];

    });

    it('should have one instance of Progress Container without data and getCompany and getParkingCount must be called once', function () {

        let wrapper = mount(<Provider store={store}>
            <PureParkingTable location={location} getParkingCategories={parkingCategorySpy}
                              getBookingState={bookingStateSpy} getParkingsCount={getParkingsCountSpy}
                              getCompany={getCompanySpy}/>
        </Provider>);

        let progressContainerWrapper = wrapper.find(ProgressContainer);

        progressContainerWrapper.length.should.be.equal(1);

        getParkingsCountSpy.should.have.callCount(1);
        getParkingsCountSpy.should.have.been.calledWith(location.query.companyId);
        getCompanySpy.should.have.callCount(1);
        getCompanySpy.should.have.been.calledWith(location.query.companyId);

    });

    it('should redirect to error path if company id is not available', function () {
        let pushSpy;
        pushSpy = sinon.spy(push);

        let wrapper = mount(<Provider store={store}>
            <PureParkingTable push={pushSpy}/>
        </Provider>);


        pushSpy.should.have.callCount(1);

        pushSpy.should.have.been.calledWith(constants.pathConstants.ERROR_PATH);
    });

    it('should correctly show GMP table instance when data is fetched', function () {
        let wrapper = mount(/**<Provider store={store}>*/
            <PureParkingTable location={location} getParkingsCount={getParkingsCountSpy} getCompany={getCompanySpy}
                              companyData={companyData}
                              getParkingCategories={parkingCategorySpy}
                              showProgress={false} isTesting={true}
                              parkingCategories={parkingCategories} parkingBookingStates={bookingStates}
                              getBookingState={bookingStateSpy} parkingData={parkingData} totalParkings={45}
                              totalPages={5}/>
            /**</Provider>*/);

        // let wrapper = providerWrapper.find(PureParkingTable);


        let tableWrapper = wrapper.find(GMPTable);

        tableWrapper.length.should.be.equal(1);

        let columnHeadings = ['ID', 'Name', 'Address', 'Contact Number', 'City', 'Edit'];

        let headingths = tableWrapper.find('thead').find('th');

        headingths.length.should.be.equal(columnHeadings.length);

        let bodytrs = tableWrapper.find('tbody').find('tr');

        bodytrs.length.should.be.equal(parkingData.length);

        let newParkingData = [
            {
                "id": 1,
                "name": "Panache 11213",
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
                "updatedAt": "2017-02-06T00:21:15.000Z",
                "deleted": 0,
                "nFactor": 1,
                "nFactorCount": 1
            }, {
                "id": 5,
                "name": "Panache 2",
                "address": "test",
                "city": "Mumbai",
                "contactNumber": "Mohit",
                "companyId": 1,
                "category": "Corporate/Office",
                "landmark": "",
                "bookingState": "DEPLOYED_NOT_BOOKABLE",
                "createdBy": null,
                "updatedBy": "1701",
                "createdAt": "2016-02-02T19:35:47.000Z",
                "updatedAt": "2017-02-06T00:21:00.000Z",
                "deleted": 0,
                "nFactor": 0.5,
                "nFactorCount": 1
            }, {
                "id": 14,
                "name": "District Centre Demo",
                "address": "Saket",
                "city": "Delhi",
                "contactNumber": null,
                "companyId": 1,
                "category": null,
                "landmark": null,
                "bookingState": "BOOKABLE",
                "createdBy": null,
                "updatedBy": null,
                "createdAt": "2016-02-02T19:35:47.000Z",
                "updatedAt": "2016-11-21T07:20:56.000Z",
                "deleted": 0,
                "nFactor": 0.5,
                "nFactorCount": 1
            }
        ];


        wrapper.setProps({
            parkingData: newParkingData
        });


        wrapper = wrapper.update();

        let newBodyTrs = wrapper.find(GMPTable).find('tbody').find('tr');

        newBodyTrs.length.should.be.equal(newParkingData.length);
    });


    it('fetchSuggestions in parking table must work correctly', function () {
        let parking = new PureParkingTable({location, getParkings: getParkingsSpy});

        let randomString = helper.generateRandomString(helper.generateRandomNautralNumber());

        parking.fetchSearchSuggestions(randomString);

        getParkingsSpy.should.have.been.calledWith(location.query.companyId, 5, 0, randomString);

    });

    it('onRowSelectedListener works properly', function () {
        let parking = new PureParkingTable({
            push: pushSpy
        });
        let row = {
            "id": 41,
            "name": "Azadpur Metro",
            "address": "Azadpur",
            "city": "Delhi",
            "contactNumber": null,
            "companyId": 1,
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
        };

        let path = constants.pathConstants.PARKING_LOT + '?companyId=' + row.companyId + '&parkingId=' + row.id;

        parking.onRowSelectedListener(row);

        pushSpy.should.have.been.calledWith(path);
    });

    it('onPageSelectedListener works properly', function () {
        let pageLength = 10;

        let parking = new PureParkingTable({
            getParkings: getParkingsSpy, location
        });

        let randomInteger = helper.generateRandomNautralNumber();

        parking.onPageSelectedListener(randomInteger);

        let skip = (randomInteger - 1) * pageLength;

        getParkingsSpy.should.have.been.calledWith(location.query.companyId, pageLength, skip);
    });



});
