/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from  'react';
import {Grid, Row, Col, Button, Well} from 'react-bootstrap';

class UserProfile extends Component {
    render() {
        return (
            <Well>
                <Row>
                    <Col lg={ 6 }>
                        <h3>User Id : {this.props.user.username}</h3>
                        <h4>Name : {this.props.user.name}</h4>
                        <h4>Mobile : {this.props.user.contactNumber}</h4>
                    </Col>
                    <Col lg={ 6 }>
                        <Button className="pull-right" onClick={this.props.updateProfile}>Edit</Button>
                    </Col>
                </Row>
            </Well>
        );
    }
}

export default UserProfile;
