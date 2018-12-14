/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Row, Col, Well, FormGroup, Button} from 'react-bootstrap';
import {ProgressContainer, InlineCheckboxList} from '../../../core';

class UserPermission extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Well>
                <Row>
                    <FormGroup>
                        <label className="col-lg-2 control-label">Select Permissions</label>
                        <Col lg={ 10 }>
                            <InlineCheckboxList
                                checkboxListOptions={this.props.userAccessOptions}
                                checkboxToggledListener={this.props.checkboxToggledListener}/>
                            <ProgressContainer show={this.props.showProgress} message="Adding New User Accesses"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col lgOffset={ 1 } lg={ 10 }>
                            <Button type="submit" bsClass="btn btn-square btn-primary"
                                    onClick={this.props.updateUserPermissionCallback}>Save</Button>
                        </Col>
                    </FormGroup>
                </Row>
            </Well>

        );
    }
}

export default UserPermission;
