import React from 'react';
import {Button} from '../../../src/core';
import sinon from 'sinon';
import {shallow} from 'enzyme';

describe('(Component) Button', function () {
    it('renders without problems', function () {
        var button = shallow(<Button />);
        expect(button).to.exist;
    });
});


