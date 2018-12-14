import React from 'react';
import {PrimaryCheckBox} from '../../../src/core';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {mount} from 'enzyme';

describe('(Component) PrimaryCheckBox', function () {
    // let checkboxChange;
    // beforeEach (() => {
    //     checkboxChange = sinon.spy();
    // });
    it('renders correctly', function () {
        let checkboxChange = sinon.spy();
        let data = {};
        let text = "sample";
        let wrapper = mount(<PrimaryCheckBox data={data} isChecked={true} text={text}
                                             checkboxToggledListener={checkboxChange}/>);
        let checkbox = wrapper.find({type: 'checkbox'});
        expect(checkbox.props().checked).to.equal(true);
        expect(wrapper.text()).to.equal(text);
        checkbox.simulate('change');
        checkboxChange.should.have.been.callCount(1);
    });

});


