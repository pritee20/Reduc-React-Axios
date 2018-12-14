/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import { Col } from 'react-bootstrap';
import { DropDownWithDefaultValue } from '../../core';
import { getValueAndTextObjectFromArrayOfString } from '../helper';

/*
* React Component that contains booking mode filter
* */
export default class BookingModeFilter extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col xs={ 4 }>
                <label className="col-xs-5 control-label">Booking Mode</label>
                <Col xs={ 7 }>
                    <DropDownWithDefaultValue
                        options={getValueAndTextObjectFromArrayOfString(this.props.options)}
                        defaultValue="all"
                        defaultText="All"
                        value={this.props.selectedBookingMode}
                        changeListener={this.props.onChangeBookingModeFilter}
                    />
                </Col>

            </Col>
        );
    }

}

BookingModeFilter.propTypes = {

};


