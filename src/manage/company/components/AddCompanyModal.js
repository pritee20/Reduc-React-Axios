/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Row, Col, Button, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {hideAddCompanyModal, createNewCompany} from '../action';
import {processAddEntityRequestBody} from '../../helper';

class AddCompanyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            city: '',
            contractor: '',
            email: '',
            contact: '',
            website: '',
            merchantId: ''
        };
        this.onFreeChargeMerchantIdChange = this.onFreeChargeMerchantIdChange.bind(this);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangeCompanyAddress = this.onChangeCompanyAddress.bind(this);
        this.onChangeCompanyCity = this.onChangeCompanyCity.bind(this);
        this.onChangeCompanyContractor = this.onChangeCompanyContractor.bind(this);
        this.onChangeCompanyEmail = this.onChangeCompanyEmail.bind(this);
        this.onChangeCompanyContactNumber = this.onChangeCompanyContactNumber.bind(this);
        this.onChangeCompanyWebsite = this.onChangeCompanyWebsite.bind(this);
        this.onSubmitCompanyInformation = this.onSubmitCompanyInformation.bind(this);

    }

    clearFormState() {
        this.setState({
            name: '',
            address: '',
            city: '',
            contractor: '',
            email: '',
            contact: '',
            website: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.showAddCompanyModal) {
            this.clearFormState();
        }
    }

    onChangeCompanyName(event) {
        this.setState({
            name: event.target.value
        })
    }

    onChangeCompanyAddress(event) {
        this.setState({
            address: event.target.value
        })
    }

    onChangeCompanyCity(event) {
        this.setState({
            city: event.target.value
        })
    }

    onChangeCompanyContractor(event) {
        this.setState({
            contractor: event.target.value
        })
    }

    onChangeCompanyEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    onChangeCompanyContactNumber(event) {
        this.setState({
            contact: event.target.value
        });
    }

    onChangeCompanyWebsite(event) {
        this.setState({
            website: event.target.value
        });
    }

    onFreeChargeMerchantIdChange(event) {
        this.setState({
            merchantId: event.target.value
        });
    }

    onSubmitCompanyInformation(event) {
        event.preventDefault();
        const {name, address, email, contact, city, contractor, website} = this.state;
        this.props.hideAddModal();
        this.props.createNewCompany(processAddEntityRequestBody({
            name,
            address,
            email,
            city,
            contractor,
            website,
            contactNumber: contact
        }), this.state.merchantId);
    }

    render() {
        return (
            <Modal show={ this.props.showAddCompanyModal } onHide={ this.props.hideAddModal }>
                <form className="form-horizontal" onSubmit={this.onSubmitCompanyInformation}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Company</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={ 12 }>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Name</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Name" className="form-control"
                                                     value={this.state.name} onChange={this.onChangeCompanyName}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Address</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Address" className="form-control"
                                                     value={this.state.address} onChange={this.onChangeCompanyAddress}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">City</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="City" className="form-control"
                                                     value={this.state.city} onChange={this.onChangeCompanyCity}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Contractor</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Contractor" className="form-control"
                                                     value={this.state.contractor}
                                                     onChange={this.onChangeCompanyContractor}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Email</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="email" placeholder="Email" className="form-control"
                                                     value={this.state.email} onChange={this.onChangeCompanyEmail}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Contact</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" minLength="10" placeholder="Contact Number"
                                                     className="form-control" value={this.state.contact}
                                                     onChange={this.onChangeCompanyContactNumber}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Website</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Website" className="form-control"
                                                     value={this.state.website} onChange={this.onChangeCompanyWebsite}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Freecharge Merchant Id</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Merchant Id" className="form-control"
                                                     value={this.state.merchantId} onChange={this.onFreeChargeMerchantIdChange}/>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.props.hideAddModal }>Close</Button>
                        <Button type="submit" className="btn btn-primary">Add Company</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}
export default connect(null, {createNewCompany})(AddCompanyModal);

