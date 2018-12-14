/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import { Row, Col, Panel, FormGroup, Button } from 'react-bootstrap';
import DateTimeRangePicker from '../../core/components/DateTimeRangePicker/DateTimeRangePicker'
import CompanyFilter from './CompanyFilter';
import PaymentModeFilter from './PaymentModeFilter';
import BookingModeFilter from './BookingModeFilter';
import CostumerTypeFilter from './CostumerTypeFilter';
import EventTypeFilter from './EventTypeFilter';
import {
    onChangePaymentModeFilter,
    onChangeCustomerTypeFilter,
    onChangeEventTypeFilter,
    onChangeBookingModeFilter,
    onChangeRevenueReportByVehicleTypeSubmit,
    sendRevenueReportByVehicleTypeViaMail,
    getValueCardReportOnSubmit,
    onChangeDateTimePicker,
    setCurrentMonthDateRange,
    getValueCardReportAndSubFilters
} from '../actions';
import {
    convertNumberToTwoDecimal
} from '../helper';

/**
 * React Component that contains Value Card Report.
 */
class ValueCardReport extends Component {

    constructor(props) {
        super(props);
    }

    // Component Did Mount call on load
    componentDidMount(){
        // Setting current month date range from the beginning of the month till now
        this.props.setCurrentMonthDateRange();
        // Get Value Card Report Function called
        this.props.getValueCardReportAndSubFilters();
    }

    
    render() {
        
        let outerThis = this;

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <h3>Value Card </h3>
                </div>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            {
                                this.props.dateRange && this.props.dateRange.fromDate && this.props.dateRange.toDate ?
                                    <DateTimeRangePicker
                                        fromDate={this.props.dateRange.fromDate}
                                        toDate={this.props.dateRange.toDate}
                                        onChangeDateTimePicker={this.props.onChangeDateTimePicker}
                                    /> :
                                    <h3>Loading Date Time Picker...</h3>
                            }
                            <CompanyFilter
                                subFilter={this.props.subFilter}
                                selectedCompanyId={this.props.selectedCompanyId}
                                selectedParkingId={this.props.selectedParkingId}
                                selectedParkingLotId={this.props.selectedParkingLotId}
                                selectedParkingSubLotId={this.props.selectedParkingSubLotId}
                                selectedUsername={this.props.selectedUsername}
                            />
                            {
                                this.props.subFilter ?
                                    <Row>
                                        <form className="form-horizontal">
                                            <FormGroup>
                                                {
                                                    this.props.subFilter.payment_mode ?
                                                        <PaymentModeFilter
                                                            options={this.props.subFilter.payment_mode}
                                                            selectedPaymentMode={this.props.selectedPaymentMode}
                                                            onChangePaymentModeFilter={this.props.onChangePaymentModeFilter}
                                                        /> :
                                                        ""
                                                }

                                                {
                                                    this.props.subFilter.booking_mode ?
                                                        <BookingModeFilter
                                                            options={this.props.subFilter.booking_mode}
                                                            selectedBookingMode={this.props.selectedBookingMode}
                                                            onChangeBookingModeFilter={this.props.onChangeBookingModeFilter}
                                                        /> :
                                                        ""
                                                }

                                                {
                                                    this.props.subFilter.customer_type ?
                                                        <CostumerTypeFilter
                                                            options={this.props.subFilter.customer_type}
                                                            selectedCustomerType={this.props.selectedCustomerType}
                                                            onChangeCustomerTypeFilter={this.props.onChangeCustomerTypeFilter}
                                                        /> :
                                                        ""
                                                }

                                                {
                                                    this.props.subFilter.event_type ?
                                                        <EventTypeFilter
                                                            options={this.props.subFilter.event_type}
                                                            selectedEventType={this.props.selectedEventType}
                                                            onChangeEventTypeFilter={this.props.onChangeEventTypeFilter}
                                                        /> :
                                                        ""
                                                }

                                            </FormGroup>
                                        </form>
                                    </Row> :
                                    ""
                            }
                            <Row>
                                <Col xs={ 12 }>
                                    <Button bsStyle="success" onClick={this.props.getValueCardReportOnSubmit}>Submit</Button>
                                </Col>
                            </Row>
                        </Panel>
                    </Col>
                </Row>
                { /* START row */ }
                {

                    this.props.valueCardReport && (
                        this.props.valueCardReport.hasOwnProperty("average_ticket_value") ||
                        this.props.valueCardReport.hasOwnProperty("average_parked_time") ||
                        this.props.valueCardReport.hasOwnProperty("average_rotation") ||
                        this.props.valueCardReport.hasOwnProperty("average_check_in_per_day")

                    )
                    ?
                        <Row className="text-center">
                            {
                                this.props.valueCardReport.hasOwnProperty("average_ticket_value") ?
                                    <Col lg={ 4 }>
                                        <div id="panelDemo7" className="panel panel-success">
                                            <div className="panel-heading">
                                                <h4>Avg. Ticket Value</h4>
                                            </div>
                                            <div className="panel-body">
                                                <h1 className="display-1">
                                                    <sup className="small">&#8377; </sup>
                                                     {convertNumberToTwoDecimal(outerThis.props.valueCardReport.average_ticket_value)}
                                                </h1>
                                            </div>
                                        </div>
                                    </Col> :
                                    ""
                            }

                            {
                                this.props.valueCardReport.hasOwnProperty("average_parked_time") ?
                                    <Col lg={ 4 }>
                                        { /* START panel */ }
                                        <div id="panelDemo8" className="panel panel-warning">
                                            <div className="panel-heading">
                                                <h4>Average Parked Time</h4>
                                            </div>
                                            <div className="panel-body">
                                                <h1 className="display-1">
                                                    {outerThis.props.valueCardReport.average_parked_time}
                                                    <small className="text-md"> min</small>
                                                </h1>
                                            </div>
                                        </div>
                                        { /* END panel */ }
                                    </Col> :
                                    ""
                            }

                            {
                                this.props.valueCardReport.hasOwnProperty("average_rotation") ?
                                    <Col lg={ 4 }>
                                        { /* START panel */ }
                                        <div id="panelDemo9" className="panel panel-info">
                                            <div className="panel-heading">
                                                <h4>Avg Rotation per Space/Day</h4>
                                            </div>
                                            <div className="panel-body">
                                                <h1 className="display-1">
                                                    {convertNumberToTwoDecimal(outerThis.props.valueCardReport.average_rotation)}
                                                    <small className="text-md"> vehicle</small>
                                                </h1>
                                            </div>
                                        </div>
                                        { /* END panel */ }
                                    </Col> :
                                    ""
                            }

                            {
                                this.props.valueCardReport.hasOwnProperty("average_check_in_per_day") ?
                                    <Col lg={ 4 }>
                                        { /* START panel */ }
                                        <div id="panelDemo9" className="panel panel-primary">
                                            <div className="panel-heading">
                                                <h4>Avg Check-In/Day</h4>
                                            </div>
                                            <div className="panel-body">
                                                <h1 className="display-1">
                                                    {convertNumberToTwoDecimal(outerThis.props.valueCardReport.average_check_in_per_day)}
                                                    <small className="text-md"> vehicle</small>
                                                </h1>
                                            </div>
                                        </div>
                                        { /* END panel */ }
                                    </Col> :
                                    ""
                            }

                        </Row>
                        :
                        <Row>
                            <Col xs={12} className="content-heading">
                                <h3>Fetching Values, Please Wait...</h3>
                            </Col>
                        </Row>
                }
                { /* END row */ }
            </ContentWrapper>
        );
    }
}


ValueCardReport.propTypes = {
    dateRange: React.PropTypes.object,
    subFilter : React.PropTypes.object
};

function mapStateToProps(state) {

    if(!state.advanceReports){
        return {}
    }

    return {
        dateRange: state.advanceReports.dateRange ? state.advanceReports.dateRange : {},
        subFilter: state.advanceReports.subFilter ? state.advanceReports.subFilter : {},
        valueCardReport: state.advanceReports.valueCardReport ? state.advanceReports.valueCardReport : {},
        selectedCompanyId : state.advanceReports.selectedCompanyId,
        selectedParkingId : state.advanceReports.selectedParkingId,
        selectedParkingLotId : state.advanceReports.selectedParkingLotId,
        selectedParkingSubLotId : state.advanceReports.selectedParkingSubLotId,
        selectedUsername : state.advanceReports.selectedUsername,
        selectedPaymentMode : state.advanceReports.selectedPaymentMode,
        selectedCustomerType : state.advanceReports.selectedCustomerType,
        selectedEventType : state.advanceReports.selectedEventType,
        selectedBookingMode : state.advanceReports.selectedBookingMode,
        selectedTimeDuration : state.advanceReports.selectedTimeDuration
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangePaymentModeFilter,
        onChangeCustomerTypeFilter,
        onChangeEventTypeFilter,
        onChangeBookingModeFilter,
        onChangeRevenueReportByVehicleTypeSubmit,
        sendRevenueReportByVehicleTypeViaMail,
        getValueCardReportOnSubmit,
        onChangeDateTimePicker,
        setCurrentMonthDateRange,
        getValueCardReportAndSubFilters
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ValueCardReport);


