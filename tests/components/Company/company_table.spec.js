import React, {Component} from 'react';
import sinon from 'sinon';
import {mount} from 'enzyme';
import {AutocompleteSearchBox, GMPTable, ProgressContainer} from '../../../src/core';
import {PureCompanyTable} from '../../../src/manage/company/components';
import {fakeStore} from '../../../src/store/fake_store';
import {Provider} from 'react-redux';
import {constants} from '../../../src/constants';
import helper from '../../helper';
import {push} from 'react-router-redux';
import {getTotalCompanyCount, getCompanies, getSearchSuggestions} from '../../../src/manage/company/action';

describe('(Component) CompanyTable', function () {
    let pageCount, rows, totalCompanies, searchSuggestions, showProgress,
        pageLength, fakeState, getCompanySpy, pushSpy, getSearchSuggestionsSpy;

    beforeEach(() => {

        rows = [{'id': 0, 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': 1, 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': 2, 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': 3, 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': 4, 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': 5, 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': 6, 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': 7, 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': 8, 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'},
            {'id': 9, 'prop': 'val', 'prop2': 'val2', 'prop3': 'val3', 'prop4': 'val4'}];

        searchSuggestions = [];

        showProgress = false;

        totalCompanies = 54;

        pageLength = 10;

        pageCount = parseInt(totalCompanies / pageLength) + 1;

        fakeState = {manage: {company: {count: totalCompanies, data: rows, showProgress, searchSuggestions}}}

        getCompanySpy = sinon.spy(getCompanies);

        pushSpy = sinon.spy(push);

        getSearchSuggestionsSpy = sinon.spy(getSearchSuggestionsSpy);

    });

    it('renders correctly', function () {

        let store = fakeStore({});

        let getTotalCompanyCount = sinon.spy(getTotalCompanyCount);

        let wrapper = mount(
            <Provider store={store}>
                <PureCompanyTable getTotalCompanyCount={getTotalCompanyCount}
                                  showProgress={showProgress} searchSuggestions={searchSuggestions}
                                  pageCount={pageCount} totalCompanies={totalCompanies} rows={rows}/>
            </Provider>);


        getTotalCompanyCount.should.have.callCount(1);

        let tableWrapper = wrapper.find(GMPTable);

        tableWrapper.length.should.be.equal(1);

        let autocompleteSearchWrapper = wrapper.find(AutocompleteSearchBox);

        autocompleteSearchWrapper.length.should.be.equal(1);

        tableWrapper.props().totalPages.should.be.equal(pageCount);

        tableWrapper.props().rows.should.be.equal(rows);

        tableWrapper.props().totalEntries.should.be.equal(totalCompanies);

        tableWrapper.props().showProgress.should.be.equal(showProgress);

    });


    it('onRowSelected should redirect to parkings page', function () {

        let companyTable = new PureCompanyTable({
            push: pushSpy
        });

        let row = {
            id: helper.generateRandomNautralNumber()
        };

        companyTable.onRowSelectedListener(row);

        let path = constants.pathConstants.PARKING + '?companyId=' + row.id;

        pushSpy.should.have.been.calledWith(path);

    });


    it('onPageSelected should call getCompanies with correct arguments', function () {

        let companyTable = new PureCompanyTable({
            getCompanies: getCompanySpy
        });


        let randomInteger = helper.generateRandomNautralNumber();

        let pageLength = 10;

        let skip = (randomInteger - 1) * 10;

        companyTable.onPageSelectedListener(randomInteger);

        getCompanySpy.should.have.been.calledWith(pageLength, skip);

    });

    it('fetchSearchSuggestions should be called correctly', function () {

        let randomString = helper.generateRandomString(helper.generateRandomNautralNumber());

        let companytable = new PureCompanyTable({
            getSearchSuggestions: getSearchSuggestionsSpy
        });

        companytable.fetchTheSuggestions(randomString);

        getSearchSuggestionsSpy.should.have.been.calledWith(randomString, false);

    });

});

