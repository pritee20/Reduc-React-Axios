/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col, Button, FormControl, FormGroup, Modal} from 'react-bootstrap';
import {DropDown, TimeInput} from '../../../../core';
import {updateParkingSubLotModal, updateParkingSubLotInformation} from '../actions';
import {hideEditParkingSubLotModal} from '../../action';
import {getParkingSubLotsOptionArray} from '../../helper';

class EditParkingSubLotModal extends Component {

    constructor(props) {
        super(props);
        this.onChangeParkingSubLotType = this.onChangeParkingSubLotType.bind(this);
        this.onChangeParkingSubLotCapacity = this.onChangeParkingSubLotCapacity.bind(this);
        this.onChangeParkingSubLotCollectionModel = this.onChangeParkingSubLotCollectionModel.bind(this);
        this.onChangeParkingSubLotTaxiTime = this.onChangeParkingSubLotTaxiTime.bind(this);
        this.onChangeParkingSubLotAutoCheckoutTime = this.onChangeParkingSubLotAutoCheckoutTime.bind(this);
        this.onChangeParkingSubLotAutoCheckoutCost = this.onChangeParkingSubLotAutoCheckoutCost.bind(this);
        this.onChangeParkingSubLotBookingSecurity = this.onChangeParkingSubLotBookingSecurity.bind(this);
        this.onChangeParkingSubLotConvenienceFee = this.onChangeParkingSubLotConvenienceFee.bind(this);
        this.onChangeParkingSubLotBookingNotes = this.onChangeParkingSubLotBookingNotes.bind(this);
        this.onChangeParkingSubLotPlateNumberType = this.onChangeParkingSubLotPlateNumberType.bind(this);
        this.onChangeParkingSubLotMobileReuired = this.onChangeParkingSubLotMobileReuired.bind(this);
        this.onChangeParkingSubLotValetName = this.onChangeParkingSubLotValetName.bind(this);
        this.onChangeParkingSubLotInsidePhoto = this.onChangeParkingSubLotInsidePhoto.bind(this);
        this.onChangeParkingSubLotLostTicketFee = this.onChangeParkingSubLotLostTicketFee.bind(this);
        this.onSubmitUpdateParkingSubLotInformation = this.onSubmitUpdateParkingSubLotInformation.bind(this);
        this.onChallanCostChangeEvent = this.onChallanCostChangeEvent.bind(this);
        this.autoCheckOutTimeBlurred = this.autoCheckOutTimeBlurred.bind(this);
        this.taxiTimeBlurred = this.taxiTimeBlurred.bind(this);
    }

    onChangeParkingSubLotType(value) {
        this.props.updateParkingSubLotModal("type", value);
    }

    onChangeParkingSubLotCapacity(event) {
        this.props.updateParkingSubLotModal("capacity", event.target.value);
    }

    onChangeParkingSubLotCollectionModel(event) {
        this.props.updateParkingSubLotModal("collectionModel", event.target.value);
    }

    onChangeParkingSubLotTaxiTime(event) {
        this.props.updateParkingSubLotModal("taxiTime", event.target.value);
    }

    onChangeParkingSubLotAutoCheckoutTime(event) {
        this.props.updateParkingSubLotModal("autoCheckoutTime", event.target.value);
    }

    onChangeParkingSubLotAutoCheckoutCost(event) {
        this.props.updateParkingSubLotModal("autoCheckoutCost", event.target.value);
    }

    onChangeParkingSubLotBookingSecurity(event) {
        this.props.updateParkingSubLotModal("bookingSecurity", event.target.value);
    }

    onChangeParkingSubLotConvenienceFee(event) {
        this.props.updateParkingSubLotModal("convenienceFee", event.target.value);
    }

    onChangeParkingSubLotBookingNotes(event) {
        this.props.updateParkingSubLotModal("bookingNotes", event.target.value);
    }

    onChangeParkingSubLotPlateNumberType(event) {
        this.props.updateParkingSubLotModal("plateNumberType", event.target.value);
    }

    onChangeParkingSubLotMobileReuired(event) {
        this.props.updateParkingSubLotModal("mobileRequired", event.target.value);
    }

    onChangeParkingSubLotValetName(event) {
        this.props.updateParkingSubLotModal("valetName", event.target.value);
    }

    onChangeParkingSubLotInsidePhoto(event) {
        this.props.updateParkingSubLotModal("insidePhoto", event.target.value);
    }

    onChangeParkingSubLotLostTicketFee(event) {
        this.props.updateParkingSubLotModal("lostTicketFee", event.target.value);
    }

    onChallanCostChangeEvent(event) {
        this.props.updateParkingSubLotModal("challanCost", event.target.value);
    }

    onSubmitUpdateParkingSubLotInformation(event) {
        event.preventDefault();
        this.props.updateParkingSubLotInformation(this.props.editSubLotData);
    }

    autoCheckOutTimeBlurred(value) {
        console.log('check out time value is ', value);
        if (value.length == 0) {
            console.log("send null");
            this.props.updateParkingSubLotModal("autoCheckoutTime", null);
        } else {
            console.log("append :00 to value ");
            this.props.updateParkingSubLotModal("autoCheckoutTime", value + ":00");
        }
    }

    taxiTimeBlurred(value) {
        console.log('taxi time value is ', value);
        if (value.length == 0) {
            console.log("send null as taxi time");
            this.props.updateParkingSubLotModal("taxiTime", null);
        } else {
            console.log("append :00 to value of taxiTime");
            this.props.updateParkingSubLotModal("taxiTime", value + ":00");
        }
    }

    render() {
        let taxiTime = this.props.editSubLotData.taxiTime != null ? this.props.editSubLotData.taxiTime.substring(0, this.props.editSubLotData.taxiTime.lastIndexOf(":")) : "";
        let autoCheckoutTime = this.props.editSubLotData.autoCheckoutTime != null ? this.props.editSubLotData.autoCheckoutTime.substring(0, this.props.editSubLotData.autoCheckoutTime.lastIndexOf(":")) : "";
        let optionsArray = getParkingSubLotsOptionArray(this.props.subLotTypes);
        return (
            <Modal show={ this.props.show} onHide={ this
            .props.hideEditParkingSubLotModal}>
                <form className="form-horizontal" onSubmit={ this.onSubmitUpdateParkingSubLotInformation }>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Parking Sub Lot Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={ 12 }>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Sub Lot Type</label>
                                    <Col lg={ 10 }>
                                        <DropDown id="subLotTypesDropDown"
                                                  blurListener={this.onChangeParkingSubLotType}
                                                  value={this.props.editSubLotData.type} options={optionsArray}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Capacity</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" placeholder="Enter Sub Lot Capacity"
                                                     className="form-control" value={this.props.editSubLotData.capacity}
                                                     onChange={this.onChangeParkingSubLotCapacity} min="0"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Collection Model</label>
                                    <Col lg={ 10 }>
                                        <FormControl componentClass="select" name="collectionModel"
                                                     className="form-control m-b"
                                                     value={`${this.props.editSubLotData.collectionModel}`}
                                                     onChange={this.onChangeParkingSubLotCollectionModel}
                                                     required="required">
                                            <option value="">Select Collection Model</option>
                                            {
                                                (this.props.collectionModels) ?
                                                    this.props.collectionModels.map(function (collectionModel) {
                                                        return (<option key={collectionModel}
                                                                        value={collectionModel}>{collectionModel}</option>)
                                                    }) : ''

                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Taxi Time</label>
                                    <Col lg={ 10 }>
                                        <TimeInput datePickerId="taxiTimeInput"
                                                   value={taxiTime}
                                                   blurListener={this.taxiTimeBlurred}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Auto Checkout Time</label>
                                    <Col lg={ 10 }>
                                        <TimeInput datePickerId="autoCheckOutTime"
                                                   value={autoCheckoutTime}
                                                   blurListener={this.autoCheckOutTimeBlurred}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Auto Checkout Cost</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" placeholder="Enter Auto Checkout Cost"
                                                     className="form-control"
                                                     value={this.props.editSubLotData.autoCheckoutCost}
                                                     onChange={this.onChangeParkingSubLotAutoCheckoutCost}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Booking Security</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" placeholder="Enter Booking Security"
                                                     className="form-control"
                                                     value={this.props.editSubLotData.bookingSecurity}
                                                     onChange={this.onChangeParkingSubLotBookingSecurity}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Convenience Fee</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" placeholder="Enter Convenience Fee"
                                                     className="form-control"
                                                     value={this.props.editSubLotData.convenienceFee}
                                                     onChange={this.onChangeParkingSubLotConvenienceFee}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Booking Notes</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Enter Booking Notes"
                                                     className="form-control"
                                                     value={this.props.editSubLotData.bookingNotes}
                                                     onChange={this.onChangeParkingSubLotBookingNotes}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Plate Number Type</label>
                                    <Col lg={ 10 }>
                                        <FormControl componentClass="select" name="plateNumberType"
                                                     className="form-control m-b"
                                                     value={`${this.props.editSubLotData.plateNumberType}`}
                                                     onChange={this.onChangeParkingSubLotPlateNumberType}
                                                     required="required">
                                            <option value="">Select Plate Number Type</option>
                                            {
                                                (this.props.plateNumberTypes) ?
                                                    this.props.plateNumberTypes.map(function (plateNumberType) {
                                                        return (<option key={plateNumberType}
                                                                        value={plateNumberType}>{plateNumberType}</option>)
                                                    }) : ''

                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Mobile Required</label>
                                    <Col lg={ 10 }>
                                        <FormControl componentClass="select" className="form-control m-b"
                                                     value={`${this.props.editSubLotData.mobileRequired}`}
                                                     onChange={this.onChangeParkingSubLotMobileReuired}
                                        >
                                            <option value="" defaultValue>Select Mobile Required Type</option>
                                            {
                                                (this.props.mobileRequiredTypes) ?
                                                    this.props.mobileRequiredTypes.map(function (mobileRequiredType) {
                                                        return (
                                                            <option key={mobileRequiredType}
                                                                    value={mobileRequiredType}>{mobileRequiredType}</option>
                                                        )
                                                    }) : ''

                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Valet Name</label>
                                    <Col lg={ 10 }>
                                        <FormControl componentClass="select" className="form-control m-b"
                                                     value={`${this.props.editSubLotData.valetName}`}
                                                     onChange={this.onChangeParkingSubLotValetName} required="required">
                                            <option value="">Select Valet Name</option>
                                            {
                                                (this.props.mobileRequiredTypes) ?
                                                    this.props.mobileRequiredTypes.map(function (mobileRequiredType) {
                                                        return (
                                                            <option key={mobileRequiredType}
                                                                    value={mobileRequiredType}>{mobileRequiredType}</option>
                                                        )
                                                    }) : ''

                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Inside Photo</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Enter Inside Photo URL"
                                                     className="form-control"
                                                     value={this.props.editSubLotData.insidePhoto}
                                                     onChange={this.onChangeParkingSubLotInsidePhoto}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Lost Ticket Fee</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" placeholder="Enter Lost Ticket Fee"
                                                     className="form-control"
                                                     value={this.props.editSubLotData.lostTicketFee}
                                                     onChange={this.onChangeParkingSubLotLostTicketFee}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Challan Cost</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" placeholder="Enter Challan Cost"
                                                     className="form-control"
                                                     value={this.props.editSubLotData.challanCost}
                                                     onChange={this.onChallanCostChangeEvent}/>
                                    </Col>
                                </FormGroup>

                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.props.hideEditParkingSubLotModal}>Close</Button>
                        <Button className="btn btn-primary" type="submit">Update</Button>
                    </Modal.Footer>
                </form>
            </Modal>

        )
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        hideEditParkingSubLotModal,
        updateParkingSubLotModal,
        updateParkingSubLotInformation
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(EditParkingSubLotModal);

