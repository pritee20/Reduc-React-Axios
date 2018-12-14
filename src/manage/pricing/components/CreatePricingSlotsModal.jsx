/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Grid,
    Row,
    Col,
    Panel,
    FormControl,
    FormGroup,
    InputGroup,
    DropdownButton,
    MenuItem,
    Modal
} from 'react-bootstrap';
import {Button, ProgressContainer} from '../../../core';
class CreatePricingSlotsModal extends Component {


    constructor(props) {
        super(props);
        this.singlePricingSlot = this.singlePricingSlot.bind(this);
        this.sevenPricingSlots = this.sevenPricingSlots.bind(this);
        this.state = {
            showProgress: false
        };
    }


    singlePricingSlot() {
        if (confirm("Create single pricing slot for all days") == true) {
            this.setState({showProgress: true});
            this.props.createOnePricingSlot();
        }
    }

    sevenPricingSlots() {
        if (confirm("Create Different pricing slot for different days.") == true) {
            this.setState({showProgress: true});
            this.props.createSevenPricingSlots();
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.hideCallback}>

                <Modal.Header closeButton>
                    <Modal.Title>So you want to create new pricing slots buddy?</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Button clickListener={this.singlePricingSlot}
                            text="All days will have same pricing slots"/>

                    <br/>
                    <Button clickListener={this.sevenPricingSlots} text="Create different pricing slots for different
                        days"/>

                    <br/>
                    <ProgressContainer type="fancy" show={this.state.showProgress} text="marking request"/>

                </Modal.Body>
            </Modal>
        );
    }
}

export default CreatePricingSlotsModal;

