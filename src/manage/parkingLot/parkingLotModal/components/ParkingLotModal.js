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

import {TimeInput} from '../../../../core';

// import { closeEditCompanyDispatch } from '../../companyHeaderModal/actions';

import {updateParkingLotModal, updateParkingLotInformation} from '../actions';
import {hideEditParkingLotModal} from '../../action';
import {es6BindAll} from '../../../helper';
class EditParkingLotModal extends Component {


    constructor(props) {
        super(props);
        this.onChangeParkingLotName = this.onChangeParkingLotName.bind(this);
        this.onChangeParkingLotParkingType = this.onChangeParkingLotParkingType.bind(this);
        this.onChangeParkingLotParkingOwner = this.onChangeParkingLotParkingOwner.bind(this);
        this.onChangeParkingLotOpenTime = this.onChangeParkingLotOpenTime.bind(this);
        this.onChangeParkingLotCloseTime = this.onChangeParkingLotCloseTime.bind(this);
        this.onChangeParkingLotFrontPhoto = this.onChangeParkingLotFrontPhoto.bind(this);
        this.onChangeParkingLotLeftPhoto = this.onChangeParkingLotLeftPhoto.bind(this);
        this.onChangeParkingLotRightPhoto = this.onChangeParkingLotRightPhoto.bind(this);
        this.onChangeParkingLotTicketingSystem = this.onChangeParkingLotTicketingSystem.bind(this);
        this.onChangeParkingLotAverageParkingWeekday = this.onChangeParkingLotAverageParkingWeekday.bind(this);
        this.onChangeParkingLotAverageParkingWeekend = this.onChangeParkingLotAverageParkingWeekend.bind(this);
        this.onChangeParkingLotExtraNotes = this.onChangeParkingLotExtraNotes.bind(this);
        this.onSubmitUpdateParkingLotInformation = this.onSubmitUpdateParkingLotInformation.bind(this);
        this.onChangeParkingLotAreaType = this.onChangeParkingLotAreaType.bind(this);
        es6BindAll(this, ['onChangeParkingLotName', 'onChangeParkingLotParkingType', 'onChangeParkingLotParkingOwner',
            'onChangeParkingLotOpenTime', 'onChangeParkingLotCloseTime', 'onChangeParkingLotFrontPhoto',
            'onChangeParkingLotLeftPhoto', 'onChangeParkingLotRightPhoto', 'onChangeParkingLotTicketingSystem',
            'onChangeParkingLotAverageParkingWeekday', 'onChangeParkingLotAverageParkingWeekend',
            'onChangeParkingLotExtraNotes', 'onSubmitUpdateParkingLotInformation', 'onChangeParkingLotAreaType',
            'onChangeCollectionAt']);
    }

    onChangeParkingLotName(event) {
        this.props.updateParkingLotModal("name", event.target.value);

    }

    onChangeParkingLotParkingType(event) {
        this.props.updateParkingLotModal("parkingType", event.target.value);
    }

    onChangeCollectionAt(event) {
        this.props.updateParkingLotModal("collectionAt", event.target.value);
    }

    onChangeParkingLotParkingOwner(event) {
        this.props.updateParkingLotModal("parkingOwner", event.target.value);
    }

    onChangeParkingLotOpenTime(value) {
        console.log('hey there open time is ', value);
        this.props.updateParkingLotModal("openTime", value);
    }

    onChangeParkingLotCloseTime(value) {
        console.log('hey there close time is ', value);
        this.props.updateParkingLotModal("closeTime", value);
    }

    onChangeParkingLotFrontPhoto(event) {
        this.props.updateParkingLotModal("frontPhoto", event.target.value);
    }

    onChangeParkingLotLeftPhoto(event) {
        this.props.updateParkingLotModal("leftPhoto", event.target.value);
    }

    onChangeParkingLotRightPhoto(event) {
        this.props.updateParkingLotModal("rightPhoto", event.target.value);
    }

    onChangeParkingLotTicketingSystem(event) {
        this.props.updateParkingLotModal("ticketingSystem", event.target.value);
    }

    onChangeParkingLotAreaType(event) {
        this.props.updateParkingLotModal("parkingAreaType", event.target.value);
    }

    onChangeParkingLotAverageParkingWeekday(event) {
        this.props.updateParkingLotModal("avgParkingWeekday", event.target.value);
    }

    onChangeParkingLotAverageParkingWeekend(event) {
        this.props.updateParkingLotModal("avgParkingWeekend", event.target.value);
    }

    onChangeParkingLotExtraNotes(event) {
        this.props.updateParkingLotModal("extraNotes", event.target.value);
    }


    onSubmitUpdateParkingLotInformation(event) {
        event.preventDefault();
        this.props.updateParkingLotInformation(this.props.parkingLotData);
    }

    render() {

        return (
            <Modal show={ this.props.show} onHide={ this.props.hideEditParkingLotModal }>
                <form className="form-horizontal" onSubmit={ this.onSubmitUpdateParkingLotInformation }>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Parking Lot Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={ 12 }>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Name</label>
                                    <Col lg={ 9 }>
                                        <FormControl type="text" placeholder="Enter Name" className="form-control"
                                                     value={this.props.parkingLotData.name}
                                                     onChange={this.onChangeParkingLotName}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Open Time</label>
                                    <Col lg={ 9 }>
                                        <TimeInput
                                            datePickerId="parkingLotOpenTimePicker"
                                            changeListener={this.onChangeParkingLotOpenTime}
                                            placeholder="Enter Open Time"
                                            required="true"
                                            value={this.props.parkingLotData.openTime}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Close Time</label>
                                    <Col lg={ 9 }>
                                        <TimeInput
                                            datePickerId="parkingLotCloseTimePicker"
                                            changeListener={this.onChangeParkingLotCloseTime}
                                            placeholder="Enter Close Time"
                                            value={this.props.parkingLotData.closeTime}
                                            required="true"/>

                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Left Photo</label>
                                    <Col lg={ 9 }>
                                        <FormControl type="text" placeholder="Enter Left Photo Url"
                                                     className="form-control"
                                                     value={this.props.parkingLotData.leftPhoto}
                                                     onChange={this.onChangeParkingLotLeftPhoto}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Right Photo</label>
                                    <Col lg={ 9 }>
                                        <FormControl type="text" placeholder="Enter Right Photo Url"
                                                     className="form-control"
                                                     value={this.props.parkingLotData.rightPhoto}
                                                     onChange={this.onChangeParkingLotRightPhoto}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Front Photo</label>
                                    <Col lg={ 9 }>
                                        <FormControl type="text" placeholder="Enter Front Photo Url"
                                                     className="form-control"
                                                     value={this.props.parkingLotData.frontPhoto}
                                                     onChange={this.onChangeParkingLotFrontPhoto}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Parking Type</label>
                                    <Col lg={ 9 }>
                                        <FormControl componentClass="select" name="account" className="form-control m-b"
                                                     value={`${this.props.parkingLotData.parkingType}`}
                                                     onChange={this.onChangeParkingLotParkingType} required="required">
                                            <option value="" defaultValue>Select Parking Type</option>
                                            {
                                                (this.props.parkingTypes) ?
                                                    this.props.parkingTypes.map(function (parkingType) {
                                                        return (<option key={parkingType}
                                                                        value={parkingType}>{parkingType}</option>)
                                                    }) : ''

                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Ticketing System</label>
                                    <Col lg={ 9 }>
                                        <FormControl componentClass="select" name="account" className="form-control m-b"
                                                     value={`${this.props.parkingLotData.ticketingSystem}`}
                                                     onChange={this.onChangeParkingLotTicketingSystem}
                                                     required>
                                            <option value="" defaultValue>Select Ticketing System</option>
                                            {
                                                (this.props.ticketingSystems) ?
                                                    this.props.ticketingSystems.map(function (ticketingSystem) {
                                                        return (<option key={ticketingSystem}
                                                                        value={ticketingSystem}>{ticketingSystem}</option>)
                                                    }) : ''

                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Parking Area Type</label>
                                    <Col lg={ 9 }>
                                        <FormControl componentClass="select" name="account" className="form-control m-b"
                                                     value={`${this.props.parkingLotData.parkingAreaType}`}
                                                     onChange={this.onChangeParkingLotAreaType}
                                        >
                                            <option value="" defaultValue>Select Parking Area Type</option>
                                            {
                                                (this.props.parkingAreaTypes) ?
                                                    this.props.parkingAreaTypes.map(function (parkingAreaType) {
                                                        return (<option key={parkingAreaType}
                                                                        value={parkingAreaType}>{parkingAreaType}</option>)
                                                    }) : ''

                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Average Parking Weekday</label>
                                    <Col lg={ 9 }>
                                        <FormControl type="text" placeholder="Enter Average Parking Weekday"
                                                     className="form-control"
                                                     value={this.props.parkingLotData.avgParkingWeekday}
                                                     onChange={this.onChangeParkingLotAverageParkingWeekday}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Average Parking Weekend</label>
                                    <Col lg={ 9 }>
                                        <FormControl type="text" placeholder="Enter Average Parking Weekend"
                                                     className="form-control"
                                                     value={this.props.parkingLotData.avgParkingWeekend}
                                                     onChange={this.onChangeParkingLotAverageParkingWeekend}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-3 control-label">Parking Owner</label>
                                    <Col lg={ 9 }>
                                        <FormControl type="text" placeholder="Enter Parking Owner"
                                                     className="form-control"
                                                     value={this.props.parkingLotData.parkingOwner}
                                                     onChange={this.onChangeParkingLotParkingOwner}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <label className="col-lg-3 control-label">Collection At</label>
                                    <Col lg={ 9 }>
                                        <FormControl type="text" placeholder="Enter Collection At"
                                                     className="form-control"
                                                     value={this.props.parkingLotData.collectionAt}
                                                     onChange={this.onChangeCollectionAt}/>
                                    </Col>
                                </FormGroup>


                                <FormGroup>
                                    <label className="col-lg-3 control-label">Extra Notes</label>
                                    <Col lg={ 9 }>
                                        <FormControl type="text" placeholder="Enter Extra Notes"
                                                     className="form-control"
                                                     value={this.props.parkingLotData.extraNotes}
                                                     onChange={this.onChangeParkingLotExtraNotes}/>
                                    </Col>
                                </FormGroup>

                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.props.hideEditParkingLotModal }>Close</Button>
                        <Button className="btn btn-primary" type="submit">Update</Button>
                    </Modal.Footer>
                </form>
            </Modal>

        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({hideEditParkingLotModal, updateParkingLotModal, updateParkingLotInformation}, dispatch);
}

export default connect(null, mapDispatchToProps)(EditParkingLotModal);


