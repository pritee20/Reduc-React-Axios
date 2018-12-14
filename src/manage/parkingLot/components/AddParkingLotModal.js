/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Row, Col, Button, FormControl, FormGroup, InputGroup, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {
    hideAddParkingLotModal,
    getParkingAreaTypes,
    getParkingTypes,
    getTicketingSystems,
    createNewParkingLot
} from '../action';
import {es6BindAll, processAddEntityRequestBody, setLocationPrecision} from '../../helper';

class AddParkingLotModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            openTime: "00:00",
            closeTime: "23:59",
            parkingId: props.parkingId,
            companyId: props.companyId,
            leftPhoto: '',
            rightPhoto: '',
            frontPhoto: '',
            parkingType: '',
            parkingOwner: '',
            collectionAt: '',
            avgParkingWeekday: 0,
            avgParkingWeekend: 0,
            ticketingSystem: '',
            extraNotes: '',
            parkingAreaType: '',
            geoLocation: null
        };

        es6BindAll(this, ['onModalShow', 'onChangeParkingLotName', 'onChangeParkingLotLeftPhoto', 'onChangeParkingLotRightPhoto',
            'onChangeParkingLotFrontPhoto', 'onChangeParkingLotPType', 'onChangeParkingLotTSystem', 'onChangeParkingLotAreaType',
            'onChangeParkingLotOwner', 'onChangeParkingLotCollAt', 'onChangeParkingLotAvgWeekday', 'onChangeParkingLotAvgWeekend',
            'onChangeParkingLotNotes', 'onSubmitParkingLotInfo', 'onMapExited']);

    }

    clearFormState() {
        this.setState({
            name: '',
            openTime: "00:00",
            closeTime: "23:59",
            leftPhoto: '',
            rightPhoto: '',
            frontPhoto: '',
            parkingType: '',
            parkingOwner: '',
            collectionAt: '',
            avgParkingWeekday: 0,
            avgParkingWeekend: 0,
            ticketingSystem: '',
            extraNotes: '',
            parkingAreaType: '',
            geoLocation: null
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.showAddParkingModal) {
            this.clearFormState();
        }
    }

    onModalShow() {
        $('#openTime,#closeTime').datetimepicker({
            format: 'HH:mm'
        });
        $('#openTime').on('dp.change', (event)=> {
            let openMoment = event.date;
            this.setState({
                openTime: openMoment.format("HH:mm")
            });
        }).bind(this);
        $('#closeTime').on('dp.change', (event)=> {
            let closeMoment = event.date;
            this.setState({
                closeTime: closeMoment.format("HH:mm")
            });
        }).bind(this);
    }

    onSubmitParkingLotInfo(event) {
        event.preventDefault();
        const {
            name, openTime, closeTime, parkingId, companyId, leftPhoto, rightPhoto, frontPhoto, parkingType, parkingOwner,
            collectionAt, avgParkingWeekday, avgParkingWeekend, ticketingSystem, extraNotes, parkingAreaType, geoLocation
        } = this.state;
        this.props.createNewParkingLot(processAddEntityRequestBody({
            name,
            openTime,
            closeTime,
            parkingId,
            leftPhoto,
            rightPhoto,
            frontPhoto,
            parkingType,
            parkingOwner,
            collectionAt,
            avgParkingWeekday,
            avgParkingWeekend,
            ticketingSystem,
            extraNotes,
            parkingAreaType,
            geoLocation: setLocationPrecision(geoLocation)
        }), companyId);
    }

    onChangeParkingLotName(event) {
        this.setState({
            name: event.target.value
        })
    }

    onChangeParkingLotLeftPhoto(event) {
        this.setState({
            leftPhoto: event.target.value
        })
    }

    onChangeParkingLotRightPhoto(event) {
        this.setState({
            rightPhoto: event.target.value
        })
    }

    onChangeParkingLotFrontPhoto(event) {
        this.setState({
            frontPhoto: event.target.value
        })
    }

    onChangeParkingLotPType(event) {
        this.setState({
            parkingType: event.target.value
        })
    }

    onChangeParkingLotTSystem(event) {
        this.setState({
            ticketingSystem: event.target.value
        })
    }

    onChangeParkingLotAreaType(event) {
        this.setState({
            parkingAreaType: event.target.value
        })
    }

    onChangeParkingLotOwner(event) {
        this.setState({
            parkingOwner: event.target.value
        })
    }

    onChangeParkingLotCollAt(event) {
        this.setState({
            collectionAt: event.target.value
        })
    }

    onChangeParkingLotNotes(event) {
        this.setState({
            extraNotes: event.target.value
        })
    }

    onChangeParkingLotAvgWeekday(event) {
        this.setState({
            avgParkingWeekday: event.target.value
        })
    }

    onChangeParkingLotAvgWeekend(event) {
        this.setState({
            avgParkingWeekend: event.target.value
        })
    }

    onMapExited(latLngObj) {
        this.setState({
            geoLocation: latLngObj
        })
    }

    render() {
        return (
            <Modal show={ this.props.show} onEntered={this.onModalShow} onHide={ this.props.hideAddParkingLotModal}>
                <form className="form-horizontal" onSubmit={this.onSubmitParkingLotInfo}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Parking Lot</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={ 12 }>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Name</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Name" className="form-control"
                                                     value={this.state.name}
                                                     onChange={this.onChangeParkingLotName} required/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Open Time</label>
                                    <Col lg={ 10 }>
                                        <InputGroup id="openTime">
                                            <FormControl type="text" value={this.state.openTime}
                                                         className="form-control" required/>
                                            <InputGroup.Addon><span
                                                className="fa fa-clock-o"></span></InputGroup.Addon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Close Time</label>
                                    <Col lg={ 10 }>
                                        <InputGroup id="closeTime">
                                            <FormControl type="text" value={this.state.closeTime}
                                                         className="form-control" required/>
                                            <InputGroup.Addon><span
                                                className="fa fa-clock-o"></span></InputGroup.Addon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Left Photo</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="url" placeholder="Left Photo"
                                                     className="form-control" value={this.state.leftPhoto}
                                                     onChange={this.onChangeParkingLotLeftPhoto}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Right Photo</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="url" placeholder="Right Photo"
                                                     className="form-control" value={this.state.rightPhoto}
                                                     onChange={this.onChangeParkingLotRightPhoto}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Front Photo</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="url" placeholder="Front Photo"
                                                     className="form-control" value={this.state.frontPhoto}
                                                     onChange={this.onChangeParkingLotFrontPhoto}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Parking Type</label>
                                    <Col lg={ 10 }>
                                        <FormControl value={this.state.parkingType} componentClass="select"
                                                     name="parkingType" onChange={this.onChangeParkingLotPType}
                                                     className="form-control m-b" required>
                                            <option value="">Select Parking Type</option>
                                            {
                                                this.props.parkingTypes.map(function (option) {
                                                    return (
                                                        <option key={option} value={option}>{option}</option>)
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Ticketing System</label>
                                    <Col lg={ 10 }>
                                        <FormControl value={this.state.ticketingSystem} componentClass="select"
                                                     name="ticketingSystem"
                                                     onChange={this.onChangeParkingLotTSystem}
                                                     className="form-control m-b" required>
                                            <option value="">Select Ticketing System</option>
                                            {
                                                this.props.ticketingSystems.map(function (option) {
                                                    return (
                                                        <option key={option} value={option}>{option}</option>)
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Area Type</label>
                                    <Col lg={ 10 }>
                                        <FormControl value={this.state.parkingAreaType} componentClass="select"
                                                     name="parkingAreaType"
                                                     onChange={this.onChangeParkingLotAreaType}
                                                     className="form-control m-b">
                                            <option value="">Select Parking Area Type</option>
                                            {
                                                this.props.parkingAreaTypes.map(function (option) {
                                                    return (
                                                        <option key={option} value={option}>{option}</option>)
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Avg Weekday</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" className="form-control "
                                                     value={this.state.avgParkingWeekday}
                                                     onChange={this.onChangeParkingLotAvgWeekday}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Avg Weekend</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="number" className="form-control "
                                                     value={this.state.avgParkingWeekend}
                                                     onChange={this.onChangeParkingLotAvgWeekend}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Parking Owner</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Parking Owner"
                                                     className="form-control" value={this.state.parkingOwner}
                                                     onChange={this.onChangeParkingLotOwner}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Collection At</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Collection At"
                                                     className="form-control" value={this.state.collectionAt}
                                                     onChange={this.onChangeParkingLotCollAt}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Extra Notes</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Extra Notes"
                                                     className="form-control" value={this.state.extraNotes}
                                                     onChange={this.onChangeParkingLotNotes}/>
                                    </Col>
                                </FormGroup>
                                {
                                    /*
                                     <FormGroup>
                                     <label className="col-lg-2 control-label">Choose Location</label>
                                     <Col lg={ 10 }>
                                     <PickMapLocation onMapExited={this.onMapExited} geoLocation={this.state.geoLocation}/>
                                     </Col>
                                     </FormGroup>
                                     */
                                }

                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.props.hideAddParkingLotModal }>Close</Button>
                        <Button type="submit" className="btn btn-primary">Add Parking Lot</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default connect(null, {
    hideAddParkingLotModal,
    getParkingAreaTypes,
    getParkingTypes,
    getTicketingSystems,
    createNewParkingLot
})(AddParkingLotModal);


