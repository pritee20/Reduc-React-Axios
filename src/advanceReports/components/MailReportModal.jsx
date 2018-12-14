/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import { Row, Col, FormGroup, Button, Modal, FormControl } from 'react-bootstrap';

/**
 * React Component that contains Modal to input email and send.
 */

export default class MailReportModal extends Component {

    constructor(props) {
        super(props);

        // Initializing state for email input
        this.state = {
            emailInput : ""
        };

        this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
        this.onSubmitMailModalForm = this.onSubmitMailModalForm.bind(this);
    }

    // On change email
    onChangeEmailInput(event){
        this.setState({
            emailInput : event.target.value
        });
    }

    // Function called on submit of mail modal form
    onSubmitMailModalForm(event){
        event.preventDefault();

        // Send report function called to send mail
        this.props.sendReport(this.state.emailInput);

        // Reset mail modal form
        this.setState({
            emailInput : ""
        });

        // Hide modal callback function called
        this.props.hideMailReportModal();
    }


    render() {
        return (

            <Modal show={ this.props.showMailReportModal } onHide={ this.props.hideMailReportModal}>
                <form className="form-horizontal" onSubmit={this.onSubmitMailModalForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Mail Report </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={ 12 }>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Email</label>
                                    <Col lg={ 10 }>
                                        <FormControl
                                            type="text"
                                            placeholder="Email (Example - abc@xyz.com,xyz@abc.com)"
                                            className="form-control"
                                            required="required"
                                            value={this.props.emailInput}
                                            onChange={this.onChangeEmailInput}
                                        />
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.hideMailReportModal}>Close</Button>
                        <Button type="submit" className="btn btn-success">Mail Report</Button>
                    </Modal.Footer>
                </form>
            </Modal>

        );
    }

}

MailReportModal.propTypes = {

};


