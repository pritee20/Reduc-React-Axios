import React, {Component} from 'react';
import sinon from 'sinon';
import {mount} from 'enzyme';
import {AutocompleteSearchBox, GMPTable, ProgressContainer} from '../../../src/core';
import {PureUserTable} from '../../../src/manage/user/components';
import {fakeStore} from '../../../src/store/fake_store';
import {Provider} from 'react-redux';
import {constants} from '../../../src/constants';
import helper from '../../helper';
import {push} from 'react-router-redux';
import {
    getUser,
    getUserCount,
    getUsers,
    showProgressUserB2BTable,
    clearUserSearchSuggestions
} from '../../../src/manage/user/actions';


describe('UserTable', function () {

    let rows, userCountSpy, usersFetchSpy, showProgressSpy, pushSpy, clearSearchSuggestionsSpy;

    beforeEach(() => {
        userCountSpy = sinon.spy(getUserCount);

        usersFetchSpy = sinon.spy(getUsers);

        showProgressSpy = sinon.spy(showProgressUserB2BTable);

        pushSpy = sinon.spy(push);

        clearSearchSuggestionsSpy = sinon.spy(clearUserSearchSuggestions);
    });

    it('on mount getUsers must be called', function () {

        mount(<PureUserTable showProgressUserB2BTable={showProgressSpy} getUserCount={userCountSpy}/>);

        showProgressSpy.should.have.callCount(1);

        userCountSpy.should.have.callCount(1);

    });

    it('onRowSelected should redirect to users', function () {
        let usertable = new PureUserTable({
            push: pushSpy
        });

        let user = {
            username: "17091"
        };

        let path = constants.pathConstants.USER + "?userId=" + user.username;

        usertable.onRowSelectedListener(user);

        pushSpy.should.have.been.calledWith(path);
    });

    it('fetchSearchSuggestions should fetch search suggestions based on username', function () {
        let value = helper.generateRandomString(helper.generateRandomNautralNumber());

        let usertable = new PureUserTable({
            getUsers: usersFetchSpy
        });

        usertable.fetchSearchSuggestions(value);

        usersFetchSpy.should.have.been.calledWith(5, 0, value);
    });

    it('onPageSelected should work properly', function () {
        let pageNo = helper.generateRandomNautralNumber();

        let pageLength = 10;

        let skip = (pageNo - 1) * pageLength;

        let usertable = new PureUserTable({
            getUsers: usersFetchSpy,
            showProgressUserB2BTable: showProgressSpy
        });

        usertable.onPageSelectedListener(pageNo);

        showProgressSpy.should.have.callCount(1);

        usersFetchSpy.should.have.been.calledWith(pageLength, skip);
    });


    it('clearSearchSuggestions should work properly', function () {

        let usertable = new PureUserTable({
            clearUserSearchSuggestions: clearSearchSuggestionsSpy
        });
        usertable.clearSearchSuggestions();

        clearSearchSuggestionsSpy.should.have.callCount(1);
    });


    it('GMPTable should have correct arguments', function () {
        let rows = [
            {
                "username": "00",
                "name": "Mohit",
                "contactNumber": "9953440143",
                "expectedVersion": 1,
                "createdAt": "2017-01-12T10:58:28.000Z",
                "updatedAt": "2017-01-20T11:23:42.000Z",
                "deleted": 0
            }, {
                "username": "0009",
                "name": "Mohit",
                "contactNumber": "0009",
                "expectedVersion": 1,
                "createdAt": "2017-01-13T11:37:54.000Z",
                "updatedAt": "2017-01-13T11:47:19.000Z",
                "deleted": 0
            }, {
                "username": "007",
                "name": "Mohit Khandelwal",
                "contactNumber": "9953440143",
                "expectedVersion": 1,
                "createdAt": "2017-02-06T08:12:38.000Z",
                "updatedAt": "2017-02-06T08:12:38.000Z",
                "deleted": 0
            }, {
                "username": "01",
                "name": "00",
                "contactNumber": "00",
                "expectedVersion": 1,
                "createdAt": "2017-01-12T10:59:01.000Z",
                "updatedAt": "2017-01-12T10:59:01.000Z",
                "deleted": 0
            }, {
                "username": "0143",
                "name": "Mohit",
                "contactNumber": "9953440143",
                "expectedVersion": 1,
                "createdAt": "2017-01-12T08:34:15.000Z",
                "updatedAt": "2017-01-30T08:27:02.000Z",
                "deleted": 0
            }, {
                "username": "02",
                "name": "02",
                "contactNumber": "02",
                "expectedVersion": 1,
                "createdAt": "2017-01-12T11:43:20.000Z",
                "updatedAt": "2017-01-12T11:43:20.000Z",
                "deleted": 0
            }, {
                "username": "03",
                "name": "03",
                "contactNumber": "03",
                "expectedVersion": 1,
                "createdAt": "2017-01-12T11:46:29.000Z",
                "updatedAt": "2017-01-12T11:46:29.000Z",
                "deleted": 0
            }, {
                "username": "04",
                "name": "04",
                "contactNumber": "04",
                "expectedVersion": 1,
                "createdAt": "2017-01-12T11:56:27.000Z",
                "updatedAt": "2017-01-12T11:56:27.000Z",
                "deleted": 0
            }, {
                "username": "1000",
                "name": "Rajouri MANAGER 2dfds",
                "contactNumber": "32141000",
                "expectedVersion": 1,
                "createdAt": "2016-02-02T19:35:46.000Z",
                "updatedAt": "2017-01-12T08:33:45.000Z",
                "deleted": 0
            }, {
                "username": "10001",
                "name": "DEFENCE COLONY 4",
                "contactNumber": "99999",
                "expectedVersion": null,
                "createdAt": "2016-02-16T06:43:34.000Z",
                "updatedAt": "2016-03-24T21:17:56.000Z",
                "deleted": 0
            }];

        let pageCount = helper.generateRandomNautralNumber();

        let totalEntries = (helper.generateRandomNautralNumber() + 1) * 10, showProgress = false;

        let usertableWrapper = mount(
            <PureUserTable showProgressUserB2BTable={showProgressSpy}
                           getUserCount={userCountSpy} pageCount={pageCount}
                           shouldShowDataFetchProgress={showProgress}
                           userB2BData={rows} totalUserB2Bs={totalEntries}
            />
        );

        let gmptablewrapper = usertableWrapper.find(GMPTable);

        gmptablewrapper.length.should.be.equal(1);

        let props = gmptablewrapper.props();

        props.totalPages.should.be.equal(pageCount);
        props.totalEntries.should.be.equal(totalEntries);
        props.rows.should.be.equal(rows);
        props.showProgress.should.be.equal(showProgress);
        props.rowSelected.should.be.equal(usertableWrapper.instance().onRowSelectedListener);
        props.pageSelectedListener.should.be.equal(usertableWrapper.instance().onPageSelectedListener);

    });


});