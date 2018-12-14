/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from  'react';
import {Grid, Row, Col, Well} from 'react-bootstrap';

class Error extends Component {
    
    render() {
        return (
            <Well>
                <Grid fluid>
                    <Row>
                        <Col lg={ 6 }>
                            <h1>Where are you ? :)</h1>
                        </Col>
                    </Row>
                </Grid>
            </Well>

        );
    }
}

export default Error;
