import React, {Component} from 'react';

import {BarChart} from '../../../src/core';
import {shallow, mount} from 'enzyme';
import {constants} from '../../../src/constants';
import  {Bar} from 'recharts';

describe('Bar Chart tests', function () {

    it('getStyle must return default style if no props are given', function () {

        let barChartWrapper = shallow(<BarChart/>);

        let barChartInstance = barChartWrapper.instance();

        let style = barChartInstance.getStyle();

        let defaultStyle = barChartInstance.defaultStyle;

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

        let barChartWrapper = shallow(<BarChart style={style}/>);

        let barChartInstance = barChartWrapper.instance();

        let setStyle = barChartInstance.getStyle();

        setStyle.height.should.be.equal(style.height);
        setStyle.width.should.be.equal(style.width);
        setStyle.marginRight.should.be.equal(style.marginRight);
        setStyle.marginLeft.should.be.equal(style.marginLeft);
        setStyle.marginTop.should.be.equal(style.marginTop);
        setStyle.marginBottom.should.be.equal(style.marginBottom);

    });

    it('placeholder must be in place if props are not passed', function () {

        let barChartWrapper = mount(<BarChart/>);

        let paragraph = barChartWrapper.find('p');

        paragraph.length.should.be.equal(1);
        paragraph.text().should.be.equal(constants.placeHolderConstants.noDataToRenderChart);

    });

    it('values must be assigned in render correctly', function () {

        let data = [{name: "Jan", first: 40, second: 50}, {name: "Feb", first: 40, second: 10}, {
            name: "Mar",
            first: 80,
            second: 70
        }, {name: "Apr", first: 50, second: 60}];

        let bars = [{key: "first", color: "#440044"}, {key: "second", color: "#440055"}];

        let barChartWrapper = mount(<BarChart data={data} bars={bars}/>);

        let barWrapper = barChartWrapper.find(Bar);

        barWrapper.length.should.be.equal(bars.length);

        barWrapper.map(function (bar, index) {
            expect(bar.props().fill).to.equal(bars[index].color);
            expect(bar.props().dataKey).to.equal(bars[index].key);
        });


    });
});