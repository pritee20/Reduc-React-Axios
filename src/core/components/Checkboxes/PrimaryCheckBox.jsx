/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Checkbox} from 'react-bootstrap';

class PrimaryCheckBox extends Component {

    constructor(props) {
        super(props);
        this.onCheckBoxChanged = this.onCheckBoxChanged.bind(this);
    }

    onCheckBoxChanged(event) {
        if (this.props.checkboxToggledListener) {
            this.props.checkboxToggledListener(this.props.data, event.target.value);
        }
    }

    render() {
        return (

            <Checkbox onChange={this.onCheckBoxChanged}
                      checked={this.props.isChecked}
                      className="c-checkbox col-lg-4">
                <em className="fa fa-check"></em>
                {this.props.text}
            </Checkbox>

        );
    }

}

PrimaryCheckBox.propTypes = {
    data: React.PropTypes.object.isRequired,
    checkboxToggledListener: React.PropTypes.func,
    isChecked: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string.isRequired
};


export default PrimaryCheckBox;

