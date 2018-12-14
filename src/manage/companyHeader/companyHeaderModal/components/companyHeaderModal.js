/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Row,
    Col,
    Button,
    FormControl,
    FormGroup,
    Modal
} from 'react-bootstrap';

import {
    closeEditCompanyDispatch,
    setCompanyName,
    setCompanyAddress,
    setCompanyCity,
    setCompanyContractor,
    setCompanyEmail,
    setCompanyContact,
    setCompanyWebsite,
    updateCompanyInformation,
    setFreechargeMerchantId
} from '../actions';


class EditCompanyModal extends Component {


    constructor(props) {
        super(props);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
        this.onChangeCompanyAddress = this.onChangeCompanyAddress.bind(this);
        this.onChangeCompanyCity = this.onChangeCompanyCity.bind(this);
        this.onChangeCompanyContractor = this.onChangeCompanyContractor.bind(this);
        this.onChangeCompanyEmail = this.onChangeCompanyEmail.bind(this);
        this.onChangeCompanyContactNumber = this.onChangeCompanyContactNumber.bind(this);
        this.onChangeCompanyWebsite = this.onChangeCompanyWebsite.bind(this);
        this.onSubmitCompanyInformation = this.onSubmitCompanyInformation.bind(this);
        this.onChangeFreechargeMerchantId = this.onChangeFreechargeMerchantId.bind(this);
    }

    onChangeCompanyName(event) {
        console.log('change company event ', event.target.value);
        this.props.setCompanyName(event.target.value);
    }

    onChangeCompanyAddress(event) {
        this.props.setCompanyAddress(event.target.value);
    }

    onChangeCompanyCity(event) {
        this.props.setCompanyCity(event.target.value);
    }

    onChangeCompanyContractor(event) {
        this.props.setCompanyContractor(event.target.value);
    }

    onChangeCompanyEmail(event) {
        this.props.setCompanyEmail(event.target.value);
    }

    onChangeCompanyContactNumber(event) {
        this.props.setCompanyContact(event.target.value);
    }

    onChangeCompanyWebsite(event) {
        this.props.setCompanyWebsite(event.target.value);
    }

    onChangeFreechargeMerchantId(event) {
        this.props.setFreechargeMerchantId(event.target.value);
    }

    onSubmitCompanyInformation(event) {
        event.preventDefault();
        this.props.updateCompanyInformation(this.props.companyData);

    }


    render() {
        return (<Modal show={ this.props.showModal } onHide={ this.props.closeEditCompanyDispatch }>
                <form className="form-horizontal" onSubmit={this.onSubmitCompanyInformation}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Company Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col lg={ 12 }>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Name</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Name" className="form-control"
                                                     value={this.props.companyData.name}
                                                     onChange={this.onChangeCompanyName}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Address</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Address" className="form-control"
                                                     value={this.props.companyData.address}
                                                     onChange={this.onChangeCompanyAddress}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">City</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="City" className="form-control"
                                                     value={this.props.companyData.city}
                                                     onChange={this.onChangeCompanyCity}
                                                     required="required"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Contractor</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Contractor" className="form-control"
                                                     value={this.props.companyData.contractor}
                                                     onChange={this.onChangeCompanyContractor}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Email</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="email" placeholder="Email" className="form-control"
                                                     value={this.props.companyData.email}
                                                     onChange={this.onChangeCompanyEmail}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Contact</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" minLength="10" placeholder="Contact Number"
                                                     className="form-control"
                                                     value={this.props.companyData.contactNumber}
                                                     onChange={this.onChangeCompanyContactNumber}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Website</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Website" className="form-control"
                                                     value={this.props.companyData.website}
                                                     onChange={this.onChangeCompanyWebsite}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <label className="col-lg-2 control-label">Freecharge Merchant Id</label>
                                    <Col lg={ 10 }>
                                        <FormControl type="text" placeholder="Enter merchant id"
                                                     className="form-control"
                                                     value={this.props.companyData.merchantId}
                                                     onChange={this.onChangeFreechargeMerchantId}/>
                                    </Col>
                                </FormGroup>

                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={ this.props.closeEditCompanyDispatch }>Close</Button>
                        <Button type="submit" className="btn btn-primary">Update</Button>
                    </Modal.Footer>
                </form>
            </Modal>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeEditCompanyDispatch,
        setCompanyName,
        setCompanyAddress,
        setCompanyCity,
        setCompanyContractor,
        setCompanyEmail,
        setCompanyContact,
        setCompanyWebsite,
        updateCompanyInformation,
        setFreechargeMerchantId
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(EditCompanyModal);


