/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';

/**
 * React Component that contains default view when user lost his url
 */
class ReportsDefaultView extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Row>
                <Col xs={12} className="text-center">
                    <h2 className="text-thin">Welcome to GMP Reports Dashboard</h2>
                    <p>
                        Choose from sidebar to view any reports.
                    </p>
                </Col>
            </Row>
        );
    }
}

export default ReportsDefaultView;

