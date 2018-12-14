/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {es6BindAll} from '../../../helper';
import {Row, Col, Button, FormControl, FormGroup, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addNewUser} from '../../actions';
import {hideAddUserModal} from '../action';

class AddNewUserModal extends Component {

    constructor(props) {
        super(props);

        let userName = props.parkingLotId ? '' + props.parkingLotId : '';

        this.state = {
            username: userName,
            name: "",
            contactNumber: "",
            password: "",
            expectedVersion: 1
        };

        es6BindAll(this, [
            'onSubmitAddNewUserModal',
            'onChangeUserUsername',
            'onChangeUserName',
            'onChangeUserContactNumber',
            'onChangeUserPassword'
        ]);

    }

    componentWillReceiveProps(nextProps) {

    }

    onChangeUserUsername(event) {
        this.setState({
            username: event.target.value
        });
    }

    onChangeUserName(event) {
        this.setState({
            name: event.target.value
        });
    }

    onChangeUserContactNumber(event) {
        this.setState({
            contactNumber: event.target.value
        });
    }

    onChangeUserPassword(event) {
        this.setState({
            password: event.target.value
        });
    }

    onSubmitAddNewUserModal(event) {
        event.preventDefault();
        this.props.addNewUser(this.state);
        this.setState({
            username: "",
            name: "",
            contactNumber: "",
            password: "",
            expectedVersion: 1
        });
    }

    render() {

        return (
            <Modal show={ this.props.show} onHide={ this.props.hideAddUserModal}>
                <form className="form-horizontal" onSubmit={this.onSubmitAddNewUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={ 12 }>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Id</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Id" className="form-control"
                                                     value={this.state.username} onChange={this.onChangeUserUsername}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Name</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Name" className="form-control"
                                                     value={this.state.name} onChange={this.onChangeUserName}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Mobile</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Mobile" className="form-control"
                                                     value={this.state.contactNumber}
                                                     onChange={this.onChangeUserContactNumber} required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Password</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="password" placeholder="Password" className="form-control"
                                                     value={this.state.password} onChange={this.onChangeUserPassword}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>

                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.props.hideAddUserModal }>Close</Button>
                        <Button type="submit" className="btn btn-primary">Add User</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addNewUser, hideAddUserModal}, dispatch);
}

export default connect(null, mapDispatchToProps)(AddNewUserModal);
