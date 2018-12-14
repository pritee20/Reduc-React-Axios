import React, {Component} from 'react';
import sinon from 'sinon';
import {mount} from 'enzyme';
import {GMPTable} from '../../../src/core';

describe('(Component) GMPTable', function () {
    let columns, rows, totalEntries, totalPages, rowSelected, pageSelectedListener, pageLength;

    beforeEach(() => {
        columns = [{
            property: 'prop',
            header: {
                label: 'col'
            }
        }, {
            property: 'prop2',
            header: {
                label: 'col2'
            }
        }, {
            property: 'prop3',
            header: {
                label: 'col3'
            }
        }, {
            property: 'prop4',
            header: {
                label: 'col4'
            }
        }
        ];

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

        pageLength = 10;
        totalEntries = 54;
        totalPages = totalEntries / pageLength;

        rowSelected = sinon.spy();
        pageSelectedListener = sinon.spy();
    });

    it('renders correctly', function () {
        let wrapper = mount(<GMPTable rows={rows} columns={columns} showProgress={false} totalEntries={totalEntries}
                                      totalPages={totalPages} rowSelected={rowSelected}
                                      pageSelectedListener={pageSelectedListener}/>);
        let tableHeadWrapper = wrapper.find('thead');
        let tableHeaderColumn = tableHeadWrapper.find('th');

        // the table header should have as many headings as specified in columns
        tableHeaderColumn.length.should.be.equal(columns.length);

        // the individual column header in the table should be equal to the value specified by label in header object of individual column
        tableHeaderColumn.forEach(function (node, index) {
            node.text().should.be.equal(columns[index].header.label);
        });

        // get all the td's in the body
        let tableBodyWrapper = wrapper.find('tbody').find('tr').find('td');
        // iterate through all the td's and using some maths compare the text of each td
        tableBodyWrapper.forEach(function (node, index) {
            node.text().should.be.equal(rows[parseInt(index / 4)][columns[index % 4].property]);
        });


    });

    it('button click works correctly', function () {
        let wrapper = mount(<GMPTable rows={rows} columns={columns} showProgress={false} totalEntries={totalEntries}
                                      totalPages={totalPages} rowSelected={rowSelected}
                                      pageSelectedListener={pageSelectedListener}/>);

        let buttonWrapper = wrapper.find('button');

        buttonWrapper.length.should.be.equal(1);

        buttonWrapper.simulate('click');

        pageSelectedListener.should.have.callCount(1);
    });


    it('row click works correctly', function () {
        let wrapper = mount(<GMPTable rows={rows} columns={columns} showProgress={false} totalEntries={totalEntries}
                                      totalPages={totalPages} rowSelected={rowSelected}
                                      pageSelectedListener={pageSelectedListener}/>);

        let rowWrapper = wrapper.find('tbody').find('tr');

        rowWrapper.length.should.be.equal(rows.length);

        let randomIndex = Date.now() % pageLength;

        rowWrapper.at(randomIndex).simulate('click');

        rowSelected.should.have.callCount(1);

        rowSelected.should.have.been.calledWith(rows[randomIndex]);
    });


});
