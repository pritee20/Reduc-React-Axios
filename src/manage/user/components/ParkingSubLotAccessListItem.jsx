/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Grid, Well, Button, Row, Col} from 'react-bootstrap';

class ParkingSubLotAccessListItem extends Component {

    constructor(props) {
        super(props);
        this.onDeleteParkingLotAccessClicked = this.onDeleteParkingLotAccessClicked.bind(this);
    }

    onDeleteParkingLotAccessClicked(event) {
        this.props.deleteClickedListener(this.props.accessObject);
    }

    render() {
        const parkingSubLotsArrayLength = this.props.accessObject.parkingSubLots.length;
        return (
            <Well>
                <Grid fluid>
                    <Row>
                        <Col lg={6}>
                            <h3>{this.props.accessObject.company.name}</h3>
                            <h4>{this.props.accessObject.parking.name}</h4>
                            <h5>{this.props.accessObject.parkingLot.name}</h5>
                            <strong>Parking Sub Lots : </strong>
                            {
                                this.props.accessObject.parkingSubLots.map(function (parkingSubLot, index) {
                                    if (index != parkingSubLotsArrayLength - 1) {
                                        return parkingSubLot.type + " | ";
                                    } else {
                                        return parkingSubLot.type;
                                    }
                                })
                            }
                        </Col>
                        <Col lg={6}>
                            <Button bsClass="btn btn-square btn-danger pull-right"
                                    onClick={this.onDeleteParkingLotAccessClicked}>Delete</Button>
                        </Col>
                    </Row>
                </Grid>
            </Well>
        );
    }
}

export default ParkingSubLotAccessListItem;

