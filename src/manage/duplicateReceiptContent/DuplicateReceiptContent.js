/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getRCParkingLots} from './action';
import ContentWrapper from '../../components/Layout/ContentWrapper';

import {Grid, Row, Col, Well, Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';


class DuplicateReceiptContent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getRCParkingLots(this.props.location.query.companyId, this.props.location.query.parkingId, this.props.location.query.parkingLotId, this.props.location.query.parkingSubLotId);
    }

    render() {
        return (
            <ContentWrapper>
                <Grid fluid>
                    { /* START row */ }
                    <Row>
                        <Col lg={ 12 }>
                            <Well>
                                <Table id="rcParkingLotsDataTable" responsive striped>
                                    <thead>
                                    <tr>
                                        <th style={{width:"20%"}}>Parking Lot Name</th>
                                        <th style={{width:"20%"}}>Parking Name</th>
                                        <th style={{width:"20%"}}>Parking Sub Lot ID</th>
                                        <th style={{width:"20%"}}>Parking Sub Lot Name</th>
                                        <th style={{width:"10%"}}></th>
                                        

                                    </tr>
                                    </thead>
                                    <tbody></tbody>
                                </Table>
                            </Well>
                        </Col>
                    </Row>
                </Grid>

            </ContentWrapper>
        );
    }

}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getRCParkingLots}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateReceiptContent);
