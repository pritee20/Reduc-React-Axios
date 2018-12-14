import React, {Component} from 'react';

import {PieChart} from '../../../src/core';
import {shallow, mount} from 'enzyme';
import {constants} from '../../../src/constants';
import  {Pie, Cell} from 'recharts';

describe('Pie Chart tests', function () {

    it('getStyle must return default style if no props are given', function () {

        let pieChartWrapper = shallow(<PieChart/>);

        let pieChartInstance = pieChartWrapper.instance();

        let style = pieChartInstance.getStyle();

        let defaultStyle = pieChartInstance.defaultStyle;

        defaultStyle.height.should.be.equal(style.height);
        defaultStyle.width.should.be.equal(style.width);
        defaultStyle.marginLeft.should.be.equal(style.marginLeft);
        defaultStyle.marginRight.should.be.equal(style.marginRight);
        defaultStyle.marginTop.should.be.equal(style.marginTop);
        defaultStyle.marginBottom.should.be.equal(style.marginBottom);

    });


    it('getStyle must return data as specified in the props', function () {

        let style = {
            width: 300,
            height: 50,
            marginLeft: 4,
            marginRight: 6, marginTop: 2,
            marginBottom: 44
        };

        let pieChartWrapper = shallow(<PieChart style={style}/>);

        let pieChartInstance = pieChartWrapper.instance();

        let setStyle = pieChartInstance.getStyle();

        setStyle.height.should.be.equal(style.height);
        setStyle.width.should.be.equal(style.width);
        setStyle.marginRight.should.be.equal(style.marginRight);
        setStyle.marginLeft.should.be.equal(style.marginLeft);
        setStyle.marginTop.should.be.equal(style.marginTop);
        setStyle.marginBottom.should.be.equal(style.marginBottom);

    });

    it('placeholder must be in place if props are not passed', function () {

        let pieChartWrapper = mount(<PieChart/>);

        let paragraph = pieChartWrapper.find('p');

        paragraph.length.should.be.equal(1);
        paragraph.text().should.be.equal(constants.placeHolderConstants.noDataToRenderChart);

    });

    it('values must be assigned in render correctly', function () {

        let pieDate = [
            {"name": "John", value: 50},
            {"name": "Paul", value: 10},
            {"name": "George", value: 60},
            {"name": "Ringo", value: 20},
            {"name": "Pete", value: 50}
        ];

        let pieCells = [
            {"color": "#0000FF"},
            {"color": "#000000"},
            {"color": "#FFF0FF"},
            {"color": "#FF0000"},
            {"color": "#00FFFF"}
        ];


        let pieChartWrapper = mount(<PieChart data={pieDate} cells={pieCells}/>);

        let pieWrapper = pieChartWrapper.find(Pie);

        pieWrapper.length.should.be.equal(1);

        // let cellWrapper = pieWrapper.find(Cell);

        // cellWrapper.length.should.be.equal(pieDate.length);

        // cellWrapper.map(function (cell, index) {
        //     expect(cell.props().fill).to.equal(pieCells[index].color);
        // });


    });
});