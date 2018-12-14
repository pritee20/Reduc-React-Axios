/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Row, Col, Button, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hideAddParkingModal, createNewParking} from '../action';
import {processAddEntityRequestBody} from '../../helper';

class AddParkingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            city: '',
            companyId: props.companyId,
            contactNumber: '',
            category: '',
            bookingState: '',
            landmark: '',
            nFactor: 1,
            nFactorCount: 1
        };
        this.onChangeParkingName = this.onChangeParkingName.bind(this);
        this.onChangeParkingAddress = this.onChangeParkingAddress.bind(this);
        this.onChangeParkingCity = this.onChangeParkingCity.bind(this);
        this.onChangeParkingContactNumber = this.onChangeParkingContactNumber.bind(this);
        this.onChangeParkingCategory = this.onChangeParkingCategory.bind(this);
        this.onChangeParkingState = this.onChangeParkingState.bind(this);
        this.onChangeParkingLandmark = this.onChangeParkingLandmark.bind(this);
        this.onChangeParkingNF = this.onChangeParkingNF.bind(this);
        this.onChangeParkingNFC = this.onChangeParkingNFC.bind(this);
        this.onSubmitParkingInfo = this.onSubmitParkingInfo.bind(this);
        this.clearState = this.clearState.bind(this);
    }


    onChangeParkingName(event) {
        this.setState({
            name: event.target.value
        })
    }

    onChangeParkingAddress(event) {
        this.setState({
            address: event.target.value
        })
    }

    onChangeParkingCity(event) {
        this.setState({
            city: event.target.value
        })
    }

    onChangeParkingContactNumber(event) {
        this.setState({
            contactNumber: event.target.value
        })
    }

    onChangeParkingCategory(event) {
        this.setState({
            category: event.target.value
        })
    }

    onChangeParkingState(event) {
        this.setState({
            bookingState: event.target.value
        })
    }

    onChangeParkingLandmark(event) {
        this.setState({
            landmark: event.target.value
        })
    }

    onChangeParkingNF(event) {
        this.setState({
            nFactor: event.target.value
        })
    }

    onChangeParkingNFC(event) {
        this.setState({
            nFactorCount: event.target.value
        })
    }

    clearState() {
        this.setState({
            name: '',
            address: '',
            city: '',
            contactNumber: '',
            category: '',
            bookingState: '',
            landmark: '',
            nFactor: 1,
            nFactorCount: 1
        });
    }

    onSubmitParkingInfo(event) {
        event.preventDefault();
        const {name, address, city, companyId, contactNumber, category, bookingState, landmark, nFactor, nFactorCount} = this.state;
        this.clearState();
        this.props.hideAddParkingModal();
        this.props.createNewParking(processAddEntityRequestBody({
            name,
            address,
            city,
            companyId,
            contactNumber,
            category,
            bookingState,
            landmark,
            nFactor: parseFloat(nFactor),
            nFactorCount: parseFloat(nFactorCount)
        }));
    }

    render() {

        return (
            <Modal show={ this.props.showAddParkingModal } onHide={ this.props.hideAddParkingModal }>
                <form className="form-horizontal" onSubmit={this.onSubmitParkingInfo}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Parking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={ 12 }>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Name</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Name" className="form-control"
                                                     value={this.state.name} onChange={this.onChangeParkingName}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Address</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Address" className="form-control"
                                                     value={this.state.address} onChange={this.onChangeParkingAddress}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">City</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="City" className="form-control"
                                                     value={this.state.city} onChange={this.onChangeParkingCity}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Contact</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" minLength="10" placeholder="Contact Number"
                                                     className="form-control" value={this.state.contactNumber}
                                                     onChange={this.onChangeParkingContactNumber} required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Category</label>
                                    <Col lg={ 10 }>
                                        <FormControl value={this.state.category} componentClass="select" name="category"
                                                     onChange={this.onChangeParkingCategory}
                                                     className="form-control m-b" required>
                                            <option value="">Select Category</option>
                                            {
                                                this.props.parkingCategories.map(function (option) {
                                                    return (<option key={option} value={option}>{option}</option>)
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Booking State</label>
                                    <Col lg={ 10 }>
                                        <FormControl value={this.state.bookingState} componentClass="select"
                                                     name="bookingState" onChange={this.onChangeParkingState}
                                                     className="form-control m-b" required>
                                            <option value="">Select Booking State</option>
                                            {
                                                this.props.parkingBookingStates.map(function (option) {
                                                    return (<option key={option} value={option}>{option}</option>)
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Landmark</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Landmark" className="form-control"
                                                     value={this.state.landmark} onChange={this.onChangeParkingLandmark}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">nFactor</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" min="0" max="1" step="0.1" placeholder="nFactor"
                                                     className="form-control " value={this.state.nFactor}
                                                     onChange={this.onChangeParkingNF}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">nFactor Count</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" min="0" max="1" step="0.1"
                                                     placeholder="nFactor Count" className="form-control "
                                                     value={this.state.nFactorCount}
                                                     onChange={this.onChangeParkingNFC}/>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.props.hideAddParkingModal }>Close</Button>
                        <Button type="submit" className="btn btn-primary">Add Parking</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({hideAddParkingModal, createNewParking}, dispatch);
}
export default connect(null, mapDispatchToProps)(AddParkingModal);

