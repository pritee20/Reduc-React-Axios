/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

class PriceTableRow extends Component {

    render() {
        console.log(this.props.cost);
        return (
            <div>
                <Row>
                    <Col xs={6}>{this.props.duration}</Col>
                    <Col xs={6} className="text-right">{this.props.cost}</Col>
                </Row>
                <br/>
            </div>
        );
    }
}

PriceTableRow.propTypes = {
    duration: React.PropTypes.string.isRequired,
    cost: React.PropTypes.string.isRequired
};

export default PriceTableRow;
