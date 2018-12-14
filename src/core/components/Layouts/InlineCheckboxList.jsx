/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {PrimaryCheckBox} from '../../../core';
import {Row} from 'react-bootstrap';
import _ from 'lodash';

class InlineCheckboxList extends Component {
    render() {
        let outerThis = this;
        return (
            <Row>
                {
                    this.props.checkboxListOptions.map(function (option) {
                        return <PrimaryCheckBox key={_.random(0, 1000000)}
                                                checkboxToggledListener={outerThis.props.checkboxToggledListener}
                                                isInline={true} text={option.text} isChecked={option.isChecked}
                                                data={option.data}/>
                    })
                }
            </Row>
        );
    }
}

React.propTypes = {
    checkboxListOptions: React.PropTypes.array.isRequired, // option objects must have a string key "text", a boolean value "isChecked" denoting whether the checkbox must be checked or not, data an object describing the value associated with the checkbox
    checkboxToggledListener: React.PropTypes.func.isRequired
};

export default InlineCheckboxList;
