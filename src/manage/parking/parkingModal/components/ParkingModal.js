/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Grid,
    Row,
    Col,
    Panel,
    Button,
    FormControl,
    FormGroup,
    InputGroup,
    DropdownButton,
    MenuItem,
    Modal
} from 'react-bootstrap';

// import { closeEditCompanyDispatch } from '../../companyHeaderModal/actions';

import {updateParkingModal, updateParkingInformation} from '../actions';
import {hideEditParkingModal} from '../../action';
import {es6BindAll} from '../../../helper';
class EditParkingModal extends Component {


    constructor(props) {
        super(props);

        es6BindAll(this, ['onChangeParkingName', 'onChangeParkingAddress', 'onChangeParkingCity', 'onChangeParkingLandmark',
            'onChangeParkingContantNumber', 'onChangeParkingCategory', 'onChangeParkingBookingState',
            'onChangeNFactor', 'onChangeNFactorCount', 'onSubmitUpdateParkingInformation']);
    }

    onChangeParkingName(event) {
        this.props.updateParkingModal("name", event.target.value);

    }

    onChangeParkingAddress(event) {
        this.props.updateParkingModal("address", event.target.value);
    }

    onChangeParkingCity(event) {
        this.props.updateParkingModal("city", event.target.value);
    }

    onChangeParkingLandmark(event) {
        this.props.updateParkingModal("landmark", event.target.value);
    }

    onChangeParkingContantNumber(event) {
        this.props.updateParkingModal("contactNumber", event.target.value);
    }

    onChangeParkingCategory(event) {
        this.props.updateParkingModal("category", event.target.value);
    }

    onChangeParkingBookingState(event) {
        this.props.updateParkingModal("bookingState", event.target.value);
    }

    onChangeNFactor(event) {
        this.props.updateParkingModal("nFactor", event.target.value);
    }

    onChangeNFactorCount(event) {
        this.props.updateParkingModal("nFactorCount", event.target.value);
    }

    onSubmitUpdateParkingInformation(event) {
        event.preventDefault();
        this.props.hideEditParkingModal();
        this.props.updateParkingInformation(this.props.editParkingData);
    }

    render() {

        return (
            <Modal show={ this.props.showEditParkingModal } onHide={ this.props.hideEditParkingModal }>
                <form className="form-horizontal" onSubmit={ this.onSubmitUpdateParkingInformation }>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Parking Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={ 12 }>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Name</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Enter Name" className="form-control"
                                                     value={this.props.editParkingData.name}
                                                     onChange={this.onChangeParkingName}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Address</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Enter Address" className="form-control"
                                                     value={this.props.editParkingData.address}
                                                     onChange={this.onChangeParkingAddress}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">City</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Enter City" className="form-control"
                                                     value={this.props.editParkingData.city}
                                                     onChange={this.onChangeParkingCity}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Contact</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Enter Contact Number"
                                                     className="form-control"
                                                     value={this.props.editParkingData.contactNumber}
                                                     onChange={this.onChangeParkingContantNumber} minLength="10"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Category</label>
                                    <Col lg={ 10 }>
                                        <FormControl componentClass="select" name="account" className="form-control m-b"
                                                     value={`${this.props.editParkingData.category}`}
                                                     onChange={this.onChangeParkingCategory}>
                                            <option value="" defaultValue>Select Category</option>
                                            {
                                                (this.props.parkingCategories) ?
                                                    this.props.parkingCategories.map(function (category) {
                                                        return (<option key={category}
                                                                        value={category}>{category}</option>)
                                                    }) : ''

                                            }

                                        </FormControl>

                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Booking State</label>
                                    <Col lg={ 10 }>
                                        <FormControl componentClass="select" name="account" className="form-control m-b"
                                                     value={`${this.props.editParkingData.bookingState}`}
                                                     onChange={this.onChangeParkingBookingState} required="required">
                                            <option value="" defaultValue>Select Booking State</option>
                                            {
                                                (this.props.parkingBookingStates) ?
                                                    this.props.parkingBookingStates.map(function (bookingState) {
                                                        return (<option key={bookingState}
                                                                        value={bookingState}>{bookingState}</option>)
                                                    }) : ''

                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Landmark</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Enter Landmark" className="form-control"
                                                     value={this.props.editParkingData.landmark}
                                                     onChange={this.onChangeParkingLandmark}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">N Factor</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" placeholder="Enter N Factor"
                                                     className="form-control" min="0" max="1"
                                                     step="0.1"
                                                     value={this.props.editParkingData.nFactor}
                                                     onChange={this.onChangeNFactor}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">N Factor Count</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" placeholder="Enter N Factor Count"
                                                     className="form-control"
                                                     min="0" max="1" step="0.1"
                                                     value={this.props.editParkingData.nFactorCount}
                                                     onChange={this.onChangeNFactorCount}/>
                                    </Col>
                                </FormGroup>

                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.props.hideEditParkingModal }>Close</Button>
                        <Button className="btn btn-primary" type="submit">Update</Button>
                    </Modal.Footer>
                </form>
            </Modal>

        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({updateParkingModal, updateParkingInformation, hideEditParkingModal}, dispatch);
}

export default connect(null, mapDispatchToProps)(EditParkingModal);
