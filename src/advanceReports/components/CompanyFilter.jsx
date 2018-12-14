/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, FormGroup } from 'react-bootstrap';
import { DropDownWithDefaultValue } from '../../core';
import {
    convertNameIdIntoValueAndTextForDropDown,
    convertUsernameIntoValueAndTextForDropDown,
    getValueAndTextObjectFromArrayOfString
} from '../helper';
import {
    onChangeCompanyFilter,
    onChangeParkingFilter,
    onChangeParkingLotFilter,
    onChangeParkingSubLotFilter,
    onChangeUserFilter
} from '../actions'

/**
 * React Component that contains CompanyFilter Based on Company, Parking, Parking Lot and User
 */
class CompanyFilter extends Component {

    constructor(props) {
        super(props);

    }

    render() {

        let outerThis = this;

        return (

            <Row>
                <form className="form-horizontal">
                    <FormGroup className="col-lg-12">
                        {
                            this.props.subFilter && (this.props.subFilter.companies || this.props.subFilter.parkings || this.props.subFilter.parkingLots || this.props.subFilter.users) ?
                                <label className="col-sm-1 col-xs-6 control-label">Filter</label> :
                                <h3 className="col-sm-12">Loading Filters...</h3>
                        }
                        {
                            this.props.subFilter && this.props.subFilter.companies ?

                                <Col xs={6} sm={2}>
                                    {
                                        outerThis.props.subFilter.companies.length === 1 ?
                                            <DropDownWithDefaultValue
                                                options={convertNameIdIntoValueAndTextForDropDown(outerThis.props.subFilter.companies)}
                                                value={outerThis.props.selectedCompanyId}
                                                changeListener={outerThis.props.onChangeCompanyFilter}
                                            /> :
                                            <DropDownWithDefaultValue
                                                options={convertNameIdIntoValueAndTextForDropDown(outerThis.props.subFilter.companies)}
                                                defaultValue="all"
                                                defaultText="All Companies"
                                                value={outerThis.props.selectedCompanyId}
                                                changeListener={outerThis.props.onChangeCompanyFilter}
                                            />
                                    }

                                </Col>

                                : ""
                        }
                        {
                            this.props.subFilter && this.props.subFilter.parkings ?

                                <Col xs={6} sm={2}>
                                    {
                                        outerThis.props.subFilter.parkings.length === 1 ?
                                            <DropDownWithDefaultValue
                                                options={convertNameIdIntoValueAndTextForDropDown(outerThis.props.subFilter.parkings)}
                                                value={outerThis.props.selectedParkingId}
                                                changeListener={outerThis.props.onChangeParkingFilter}
                                            /> :
                                            <DropDownWithDefaultValue
                                                options={convertNameIdIntoValueAndTextForDropDown(outerThis.props.subFilter.parkings)}
                                                defaultValue="all"
                                                defaultText="All Parkings"
                                                value={outerThis.props.selectedParkingId}
                                                changeListener={outerThis.props.onChangeParkingFilter}
                                            />
                                    }
                                </Col>

                                : ""
                        }
                        {
                            this.props.subFilter && this.props.subFilter.parkingLots ?

                                <Col xs={6} sm={2}>
                                    {
                                        outerThis.props.subFilter.parkingLots.length === 1 ?
                                            <DropDownWithDefaultValue
                                                options={convertNameIdIntoValueAndTextForDropDown(outerThis.props.subFilter.parkingLots)}
                                                value={outerThis.props.selectedParkingLotId}
                                                changeListener={outerThis.props.onChangeParkingLotFilter}
                                            /> :
                                            <DropDownWithDefaultValue
                                                options={convertNameIdIntoValueAndTextForDropDown(outerThis.props.subFilter.parkingLots)}
                                                defaultValue="all"
                                                defaultText="All Parking Lots"
                                                value={outerThis.props.selectedParkingLotId}
                                                changeListener={outerThis.props.onChangeParkingLotFilter}
                                            />
                                    }
                                </Col>

                                : ""
                        }
                        {
                            this.props.subFilter && this.props.subFilter.subLots ?

                                <Col xs={6} sm={2}>
                                    {
                                        outerThis.props.subFilter.subLots.length === 1 ?
                                            <DropDownWithDefaultValue
                                                options={getValueAndTextObjectFromArrayOfString(outerThis.props.subFilter.subLots)}
                                                value={outerThis.props.selectedParkingSubLotId}
                                                changeListener={outerThis.props.onChangeParkingSubLotFilter}
                                            /> :
                                            <DropDownWithDefaultValue
                                                options={getValueAndTextObjectFromArrayOfString(outerThis.props.subFilter.subLots)}
                                                defaultValue="all"
                                                defaultText="All Vehicle Type"
                                                value={outerThis.props.selectedParkingSubLotId}
                                                changeListener={outerThis.props.onChangeParkingSubLotFilter}
                                            />
                                    }
                                </Col>

                                : ""
                        }
                        {
                            this.props.subFilter && this.props.subFilter.users && this.props.subFilter.users.length > 0 ?

                                <Col xs={6} sm={2}>
                                    {
                                        outerThis.props.subFilter.users.length === 1 ?
                                            <DropDownWithDefaultValue
                                                options={convertUsernameIntoValueAndTextForDropDown(outerThis.props.subFilter.users)}
                                                value={outerThis.props.selectedUsername}
                                                changeListener={outerThis.props.onChangeUserFilter}
                                            /> :
                                            <DropDownWithDefaultValue
                                                options={convertUsernameIntoValueAndTextForDropDown(outerThis.props.subFilter.users)}
                                                defaultValue="all"
                                                defaultText="All Users"
                                                value={outerThis.props.selectedUsername}
                                                changeListener={outerThis.props.onChangeUserFilter}
                                            />
                                    }
                                </Col>

                                : ""
                        }
                    </FormGroup>
                </form>
            </Row>

        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeCompanyFilter,
        onChangeParkingFilter,
        onChangeParkingLotFilter,
        onChangeParkingSubLotFilter,
        onChangeUserFilter
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(CompanyFilter);


