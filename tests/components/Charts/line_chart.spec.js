import React, {Component} from 'react';
import {LineChart} from '../../../src/core';
import {shallow, mount} from 'enzyme';
import {constants} from '../../../src/constants';
import  {Line} from 'recharts';


describe('Line Chart', function () {

    it('style object returned is correct', function () {

        let wrapper = shallow(<LineChart/>);

        let returnedStyleObj = wrapper.instance().getStyle();

        let defaultStyleObj = wrapper.instance().defaultStyle;

        returnedStyleObj.width.should.be.equal(defaultStyleObj.width);
        returnedStyleObj.height.should.be.equal(defaultStyleObj.height);
        returnedStyleObj.marginLeft.should.be.equal(defaultStyleObj.marginLeft);
        returnedStyleObj.marginRight.should.be.equal(defaultStyleObj.marginRight);
        returnedStyleObj.marginTop.should.be.equal(defaultStyleObj.marginTop);
        returnedStyleObj.marginBottom.should.be.equal(defaultStyleObj.marginBottom);

    });

    it('style is correctly assigned', function () {

        let style = {
            width: 500,
            height: 400,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 0,
            marginTop: 1
        };

        let wrapper = shallow(<LineChart style={style}/>);
        let returnedStyleObj = wrapper.instance().getStyle();

        returnedStyleObj.width.should.be.equal(style.width);
        returnedStyleObj.height.should.be.equal(style.height);
        returnedStyleObj.marginLeft.should.be.equal(style.marginLeft);
        returnedStyleObj.marginRight.should.be.equal(style.marginRight);
        returnedStyleObj.marginTop.should.be.equal(style.marginTop);
        returnedStyleObj.marginBottom.should.be.equal(style.marginBottom);

    });

    it('error message must be shown if data and lines do not exist', function () {

        let wrapper = mount(<LineChart/>);

        let paragraph = wrapper.find('p');

        paragraph.length.should.be.equal(1);

        paragraph.text().should.be.equal(constants.placeHolderConstants.noDataToRenderChart);

    });

    it('if lines and data are specified then render correctly', function () {

        let data = [{name: "Jan", first: 40, second: 50}, {name: "Feb", first: 40, second: 10}, {
            name: "Mar",
            first: 80,
            second: 70
        }, {name: "Apr", first: 50, second: 60}];

        let lines = [{key: "first", color: "#440044"}, {key: "second", color: "#440055"}];

        let lineChartWrapper = mount(<LineChart data={data} lines={lines}/>);

        let lineWrapper = lineChartWrapper.find(Line);

        lineWrapper.length.should.be.equal(lines.length);

        lineWrapper.map(function (line, index) {
            expect(line.props().stroke).to.equal(lines[index].color);
            expect(line.props().dataKey).to.equal(lines[index].key);
        });

    });

});