/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Grid, Row, Col, Button, FormControl, FormGroup, Well, InputGroup} from 'react-bootstrap';
import {es6BindAll} from '../../helper';
import {DropDown, ProgressContainer, InlineCheckboxList, AutocompleteSearchBox} from '../../../core';

const renderSuggestion = suggestion => (<span>{suggestion.name}</span>);

class AddUserAccessForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };

        es6BindAll(this, ['onSubmitUserAccessForm']);

    }

    onSubmitUserAccessForm(event) {
        event.preventDefault();
        this.props.addAccesses();
    }

    render() {
        return (
            <Well>
                <Grid fluid>
                    <Row>
                        <Col lg={ 12 }>
                            <form className="form-horizontal">
                                <fieldset>
                                    <FormGroup>
                                        <label className="col-lg-2">Company Name</label>
                                        <Col lg={ 10 }>
                                            <AutocompleteSearchBox id="companyAutoCompleteInUsers"
                                                                   searchSuggestions={this.props.searchSuggestions}
                                                                   placeholder="Enter company name to search"
                                                                   fetchSuggestions={this.props.fetchSuggestions}
                                                                   clearSuggestions={this.props.clearSuggestions}
                                                                   renderSuggestion={renderSuggestion}
                                                                   objKey="name"
                                                                   suggestionSelectedListener={this.props.onCompanySelected}/>
                                        </Col>
                                    </FormGroup>
                                </fieldset>
                                {this.props.parkingOptions && this.props.parkingOptions.length > 0 && this.props.selectedParkingId ?
                                    <FormGroup>
                                        <label className="col-lg-2">Parking</label>
                                        <Col lg={ 10 }>
                                            <Row>
                                                <DropDown options={this.props.parkingOptions} id="parkingDropDown"
                                                          value={this.props.selectedParkingId}
                                                          changeListener={this.props.onParkingSelected}/>
                                            </Row>
                                        </Col>
                                    </FormGroup>
                                    : ""}
                                {this.props.parkingLotOptions && this.props.parkingLotOptions.length > 0 && this.props.selectedParkingLotId ?
                                    <FormGroup>
                                        <label className="col-lg-2">Parking Lot</label>
                                        <Col lg={ 10 }>
                                            <Row>
                                                <DropDown options={this.props.parkingLotOptions} id="parkingLotDropDown"
                                                          value={this.props.selectedParkingLotId}
                                                          changeListener={this.props.onParkingLotSelected}/>
                                            </Row>
                                        </Col>
                                    </FormGroup>
                                    : ""}
                                {this.props.parkingSubLotOptions && this.props.parkingSubLotOptions.length > 0 ?
                                    <FormGroup>
                                        <label className="col-lg-2">Parking SubLot</label>
                                        <Col lg={ 10 }>
                                            <InlineCheckboxList
                                                checkboxListOptions={this.props.parkingSubLotOptions}
                                                checkboxToggledListener={this.props.checkboxToggledListener}/>
                                        </Col>
                                    </FormGroup>
                                    : ""}
                                <FormGroup>
                                    <Col lgOffset={ 1 } lg={ 10 }>
                                        <Button type="submit" bsClass="btn btn-square btn-primary"
                                                disabled={!this.props.enableAddButton}
                                                onClick={this.onSubmitUserAccessForm}>Save</Button>
                                    </Col>
                                </FormGroup>
                            </form>
                            <ProgressContainer show={this.props.showProgress}
                                               message="Adding New Parking SubLot Access"/>
                        </Col>

                    </Row>
                </Grid>
            </Well>
        );
    }
}

export default AddUserAccessForm;

