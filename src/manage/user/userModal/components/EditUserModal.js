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
import {updateUser} from '../../actions';


class EditUserModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            name: "",
            contactNumber: ""
        };

        es6BindAll(this, ['onSubmitEditUserModal', 'onChangeUserUsername', 'onChangeUserName', 'onChangeUserContactNumber']);

    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.user);
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

    onSubmitEditUserModal(event) {
        event.preventDefault();
        this.props.updateUser(this.state, this.props.hideEditUserModal);
    }

    render() {

        return (
            <Modal show={ this.props.showEditUserModal } onHide={ this.props.hideEditUserModal }>
                <form className="form-horizontal" onSubmit={this.onSubmitEditUserModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={ 12 }>
                                <FormGroup>
                                    <Col lg={ 10 }>
                                        <h3>User ID : {this.state.username}</h3>
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

                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.props.hideEditUserModal }>Close</Button>
                        <Button type="submit" className="btn btn-primary">Update User</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);
