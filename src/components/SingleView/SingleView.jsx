/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Grid, Row, Col } from 'react-bootstrap';

class SingleView extends React.Component {

    render() {
        return (
            <Grid fluid>
                <ContentWrapper>
                    <Row>
                        <Col xs={12} className="text-center">
                            <h2 className="text-thin">Welcome to Get My Parking Dashboard</h2>
                        </Col>
                    </Row>
                </ContentWrapper>
            </Grid>
        );
    }
}

export default SingleView;
