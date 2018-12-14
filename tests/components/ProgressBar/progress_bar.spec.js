import React, {Component} from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';

import {ProgressContainer} from '../../../src/core';

describe('(Component) ProgressContainer', function () {
    it('renders correctly when show is true', function () {
        let show = true;
        let message = "sample message";
        let wrapper = mount(<ProgressContainer show={show} message={message}/>);
        let messageHtml = wrapper.find('p');
        let progressHtml = wrapper.find('div.ball-pulse');
        messageHtml.length.should.be.equal(1);
        progressHtml.length.should.be.equal(1);
        messageHtml.text().should.be.equal(message);
    });

    it('renders correctly when show is true', function () {
        let show = false;
        let message = "sample message";
        let wrapper = mount(<ProgressContainer show={show} message={message}/>);
        let messageHtml = wrapper.find('p');
        let progressHtml = wrapper.find('div.ball-pulse');
        messageHtml.length.should.be.equal(0);
        progressHtml.length.should.be.equal(0);
        // messageHtml.text().should.be.equal(message);
    });

});
