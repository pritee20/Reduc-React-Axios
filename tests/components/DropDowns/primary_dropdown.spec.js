import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import {DropDown} from '../../../src/core';

describe('(Component) DropDown', function () {
    it('renders correctly', function () {
        let options = [{text: 'text1', value: "1"}, {text: 'text2', value: "2"}, {text: 'text3', value: "3"}];
        let onChange = sinon.spy();
        let onBlur = sinon.spy();
        let wrapper = mount(<DropDown options={options} value="3" changeListener={onChange} blurListener={onBlur}/>);
        let optionsHtml = wrapper.find('option');
        optionsHtml.length.should.be.equal(options.length);
        wrapper.simulate('change');
        onChange.should.have.callCount(1);
        wrapper.simulate('blur');
        onBlur.should.have.callCount(1);
    });
});



