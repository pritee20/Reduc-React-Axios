/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Row, Col, Button, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {
    hideAddParkingSubLotModal,
    createNewParkingSubLot
} from '../action';
import {es6BindAll, processAddEntityRequestBody} from '../../helper';
import {TimeInput} from '../../../core';


class AddParkingSubLotModal extends Component {
    constructor(props) {
        super(props);
        this.MobValOptions = ['NA', 'MANDATORY', 'OPTIONAL'];
        this.state = {
            type: '',
            capacity: 0,
            collectionModel: '',
            taxiTime: '00:00',
            autoCheckoutTime: '',
            autoCheckoutCost: '',
            parkingLotId: props.parkingLotId,
            bookingSecurity: 0,
            convenienceFee: 0,
            bookingNotes: '',
            plateNumberType: '',
            mobileRequired: '',
            valetName: '',
            insidePhoto: '',
            lostTicketFee: 0,
            challanCost: 0
        };
        es6BindAll(this, ['onChangeParkingSubLotType', 'onChangeParkingSubLotCapacity', 'onChangeParkingSubLotACCost', 'onChangeParkingSubLotCollModel',
            'onChangeParkingSubLotBookSec', 'onChangeParkingSubLotConvFee', 'onChangeParkingSubLotBookNotes', 'onChangeParkingSubLotPNType',
            'onChangeParkingSubLotValName', 'onChangeParkingSubLotMobReqd', 'onChangeParkingSubLotIPhoto', 'onChangeParkingSubLotLTFee',
            'onChangeParkingSubLotCCost', 'onSubmitParkingSubLotInfo', 'onPSLModalShow', 'autoCheckOutTimeBlurred', 'taxiTimeBlurred']);
    }

    clearFormState() {
        this.setState({
            type: '',
            capacity: 0,
            collectionModel: '',
            taxiTime: '00:00',
            autoCheckoutTime: '',
            autoCheckoutCost: '',
            bookingSecurity: 0,
            convenienceFee: 0,
            bookingNotes: '',
            plateNumberType: '',
            mobileRequired: '',
            valetName: '',
            insidePhoto: '',
            lostTicketFee: 0,
            challanCost: 0
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.show) {
            this.clearFormState();
        }
    }

    onChangeParkingSubLotType(event) {
        this.setState({
            type: event.target.value
        })
    }

    onChangeParkingSubLotCapacity(event) {
        this.setState({
            capacity: event.target.value
        })
    }

    onChangeParkingSubLotACCost(event) {
        this.setState({
            autoCheckoutCost: event.target.value
        })
    }

    onChangeParkingSubLotCollModel(event) {
        this.setState({
            collectionModel: event.target.value
        })
    }

    onChangeParkingSubLotBookSec(event) {
        this.setState({
            bookingSecurity: event.target.value
        })
    }

    onChangeParkingSubLotConvFee(event) {
        this.setState({
            convenienceFee: event.target.value
        })
    }

    onChangeParkingSubLotBookNotes(event) {
        this.setState({
            bookingNotes: event.target.value
        })
    }

    onChangeParkingSubLotPNType(event) {
        this.setState({
            plateNumberType: event.target.value
        })
    }

    onChangeParkingSubLotMobReqd(event) {
        this.setState({
            mobileRequired: event.target.value
        })
    }

    onChangeParkingSubLotValName(event) {
        this.setState({
            valetName: event.target.value
        })
    }

    onChangeParkingSubLotIPhoto(event) {
        this.setState({
            insidePhoto: event.target.value
        })
    }

    onChangeParkingSubLotLTFee(event) {
        this.setState({
            lostTicketFee: event.target.value
        })
    }

    onChangeParkingSubLotCCost(event) {
        this.setState({
            challanCost: event.target.value
        })
    }

    onPSLModalShow() {
        $('#taxiTime').datetimepicker({
            format: 'HH:mm',
        });
        $('#taxiTime').on('dp.change', (event)=> {
            let taxiMoment = event.date;
            this.setState({
                taxiTime: taxiMoment.format("HH:mm")
            });
        }).bind(this);

    }

    onSubmitParkingSubLotInfo(event) {
        event.preventDefault();
        const {
            type, capacity, collectionModel, taxiTime, autoCheckoutTime, autoCheckoutCost, parkingLotId, bookingSecurity,
            convenienceFee, bookingNotes, plateNumberType, insidePhoto, lostTicketFee, challanCost
        } = this.state;
        let {mobileRequired, valetName} = this.state;
        if (mobileRequired === '') {
            mobileRequired = 'NA'
        }
        if (valetName === '') {
            valetName = 'NA'
        }
        this.props.createNewParkingSubLot(processAddEntityRequestBody({
            type,
            capacity,
            collectionModel,
            taxiTime,
            autoCheckoutTime,
            autoCheckoutCost,
            parkingLotId,
            bookingSecurity,
            convenienceFee,
            bookingNotes,
            plateNumberType,
            mobileRequired,
            valetName,
            insidePhoto,
            lostTicketFee,
            challanCost
        }));
    }

    autoCheckOutTimeBlurred(value) {
        if (value.length == 0) {
            this.setState({
                autoCheckoutTime: ''
            })
        } else {
            this.setState({
                autoCheckoutTime: value + ":00"
            });
        }
    }

    taxiTimeBlurred(value) {
        if (value.length == 0) {
            this.setState({
                taxiTime: null
            });
        } else {
            this.setState({
                taxiTime: value + ":00"
            });
        }
    }

    render() {
        return (
            <Modal show={ this.props.show} onHide={ this.props.hideAddParkingSubLotModal}>
                <form className="form-horizontal" onSubmit={this.onSubmitParkingSubLotInfo}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Parking Sublot</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={ 12 }>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Sublot Type</label>
                                    <Col lg={ 10 }>
                                        <FormControl value={this.state.type} componentClass="select" name="subLotType"
                                                     onChange={this.onChangeParkingSubLotType}
                                                     className="form-control m-b" required>
                                            <option value="">Select Type</option>
                                            {
                                                this.props.subLotTypes.map(function (option) {
                                                    return (<option key={option} value={option}>{option}</option>)
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Capacity</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" className="form-control " value={this.state.capacity}
                                                     onChange={this.onChangeParkingSubLotCapacity} min="0"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Collection Model</label>
                                    <Col lg={ 10 }>
                                        <FormControl value={this.state.collectionModel} componentClass="select"
                                                     name="collectionModel"
                                                     onChange={this.onChangeParkingSubLotCollModel}
                                                     className="form-control m-b" required>
                                            <option value="">Select Collection Model</option>
                                            {
                                                this.props.collectionModels.map(function (option) {
                                                    return (<option key={option} value={option}>{option}</option>)
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Taxi Time</label>
                                    <Col lg={ 10 }>
                                        <TimeInput datePickerId="taxiTime"
                                                   value={this.state.taxiTime}
                                                   blurListener={this.taxiTimeBlurred}/>

                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Auto Checkout Time</label>
                                    <Col lg={ 10 }>

                                        <TimeInput datePickerId="autoCheckOutTime"
                                                   value={this.state.autoCheckoutTime}
                                                   blurListener={this.autoCheckOutTimeBlurred}/>


                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Auto Checkout Cost</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Auto Checkout Cost"
                                                     className="form-control" value={this.state.autoCheckoutCost}
                                                     onChange={this.onChangeParkingSubLotACCost}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Booking Security</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" className="form-control "
                                                     value={this.state.bookingSecurity}
                                                     onChange={this.onChangeParkingSubLotBookSec}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Convenience Fee</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" className="form-control "
                                                     value={this.state.convenienceFee}
                                                     onChange={this.onChangeParkingSubLotConvFee}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Booking Notes</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Booking Notes" className="form-control"
                                                     value={this.state.bookingNotes}
                                                     onChange={this.onChangeParkingSubLotBookNotes}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Plate Number Type</label>
                                    <Col lg={ 10 }>
                                        <FormControl value={this.state.plateNumberType} componentClass="select"
                                                     name="plateNumberType" onChange={this.onChangeParkingSubLotPNType}
                                                     className="form-control m-b" required>
                                            <option value="">Select Plate Number Type</option>
                                            {
                                                this.props.plateNumberTypes.map(function (option) {
                                                    return (<option key={option} value={option}>{option}</option>)
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Mobile Required</label>
                                    <Col lg={ 10 }>
                                        <FormControl value={this.state.mobileRequired} componentClass="select"
                                                     name="mobileRequired"
                                                     onChange={this.onChangeParkingSubLotMobReqd}
                                                     className="form-control m-b">
                                            <option value="">Select Mobile Required</option>
                                            {
                                                this.MobValOptions.map(function (option) {
                                                    return (<option key={option} value={option}>{option}</option>)
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Valet Name</label>
                                    <Col lg={ 10 }>
                                        <FormControl value={this.state.valetName} componentClass="select"
                                                     name="valetName" onChange={this.onChangeParkingSubLotValName}
                                                     className="form-control m-b">
                                            <option value="">Select Valet Name</option>
                                            {
                                                this.MobValOptions.map(function (option) {
                                                    return (<option key={option} value={option}>{option}</option>)
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Inside Photo</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="url" placeholder="Inside Photo" className="form-control"
                                                     value={this.state.insidePhoto}
                                                     onChange={this.onChangeParkingSubLotIPhoto}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Lost Ticket Fee</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" className="form-control "
                                                     value={this.state.lostTicketFee}
                                                     onChange={this.onChangeParkingSubLotLTFee}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Challan Cost</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" className="form-control "
                                                     value={this.state.challanCost}
                                                     onChange={this.onChangeParkingSubLotCCost}/>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.props.hideAddParkingSubLotModal}>Close</Button>
                        <Button type="submit" className="btn btn-primary">Add Parking Sublot</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default connect(null, {
    hideAddParkingSubLotModal,
    createNewParkingSubLot
})(AddParkingSubLotModal);
