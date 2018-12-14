/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import { Row, Col, Panel, FormGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import { DropDownWithDefaultValue, LineChart } from '../../core';
import CompanyFilter from './CompanyFilter';
import PaymentModeFilter from './PaymentModeFilter';
import BookingModeFilter from './BookingModeFilter';
import CostumerTypeFilter from './CostumerTypeFilter';
import EventTypeFilter from './EventTypeFilter';
import MailReportModal from './MailReportModal';
import { GMPDatatable } from '../../core';
import Path from '../../../config/project.config';
import {
    onChangePaymentModeFilter,
    onChangeCustomerTypeFilter,
    onChangeEventTypeFilter,
    onChangeBookingModeFilter,
    onChangeRevenueReportByTimeDurationSubmit,
    sendRevenueReportByTimeDurationViaMail,
    getRevenueReportByTimeDurationAndSubFilters,
    onChangeTimeDurationFilter
} from '../actions';
import {
    getDurationOptions,
    processRevenueReportByTimeDurationData
} from '../helper';

// Styling object for Line chart
const lineChartStyle = {
    height: 500, width: 1000, marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 5
};

// Key and color stroke for line chart
const lines = [
    {
        key: "in",
        color: "#2ECC71"
    },
    {
        key: "out",
        color: "#E88664"
    },
    {
        key: "foc",
        color: "#3498DB"
    },
    {
        key: "tt",
        color: "#F1C40F"
    },
    {
        key: "ac",
        color: "#7F8C8D"
    }
];

/**
 * React Component that contains revenue report by time duration.
 */
class RevenueReportByTimeDuration extends Component {

    constructor(props) {
        super(props);

        // Initializing state for Mail Report Modal
        this.state = {
            showMailReportModal : false
        };

        this.renderDropdownButton = this.renderDropdownButton.bind(this);
        this.showMailReportModal = this.showMailReportModal.bind(this);
        this.hideMailReportModal = this.hideMailReportModal.bind(this);
    }

    // Component Did Mount call on load
    componentDidMount(){
        // Setting time duration to day by default in state
        this.props.onChangeTimeDurationFilter("day");
        // Get Revenue Report By Time Duration Function called
        this.props.getRevenueReportByTimeDurationAndSubFilters();
    }

    // Function to fill drop-down for exporting excel file
    renderDropdownButton(title, i) {
        return (
            <DropdownButton bsStyle={ title.toLowerCase() } title="Save As" key={ i } id={ `dropdown-basic-${i}` }>
                <MenuItem eventKey="1" href={`${Path.API_end}ParkingEvents/downloadExcelFile?access_token=${this.props.authToken}&fileName=${this.props.excelFileName}`}>EXCEL</MenuItem>
            </DropdownButton>
        );
    }

    // Function to show mail report modal
    showMailReportModal(event){
        this.setState({
            showMailReportModal : true
        });
    }

    // Function to hide mail report modal
    hideMailReportModal(event){
        this.setState({
            showMailReportModal : false
        });
    }

    render() {

        const BUTTONS = ['Success'];

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <h3>Revenue Report by Time Duration</h3>
                </div>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <Row>
                                <form className="form-horizontal">
                                    <FormGroup>
                                        <Col lg={ 3 }>
                                            <label className="col-lg-4 control-label">Duration</label>
                                            <Col lg={ 8 }>
                                                <DropDownWithDefaultValue
                                                    options={getDurationOptions()}
                                                    value={this.props.selectedTimeDuration}
                                                    changeListener={this.props.onChangeTimeDurationFilter}
                                                />
                                            </Col>
                                        </Col>
                                    </FormGroup>
                                </form>
                            </Row>
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
                                    <Button bsStyle="success" onClick={this.props.onChangeRevenueReportByTimeDurationSubmit}>Submit</Button>
                                </Col>
                            </Row>

                        </Panel>
                    </Col>
                    {
                        this.props.excelFileName && this.props.excelFileName !== null ?
                            <Col xs={12} className="text-right" style={{paddingBottom: 20+"px"}}>
                                { BUTTONS.map(this.renderDropdownButton) }
                                <Button bsStyle="primary" style={{marginLeft: 10+"px"}} onClick={this.showMailReportModal}>Mail
                                    Report</Button>
                            </Col>
                            : ""
                    }

                    {
                        this.props.revenueReportByTimeDuration && this.props.revenueReportByTimeDuration.headers ?
                            <Col xs={12}>
                                <Panel>
                                    <GMPDatatable
                                        tableId="by-time-duration"
                                        headerData={this.props.revenueReportByTimeDuration.headers}
                                        reportData={this.props.revenueReportByTimeDuration.reportData}
                                        columnData={this.props.revenueReportByTimeDuration.columnData}
                                        footerData={this.props.revenueReportByTimeDuration.footers}
                                    />
                                </Panel>
                            </Col> :
                            <Col xs={12} className="content-heading">
                                <h3>Fetching Reports, Please Wait...</h3>
                            </Col>
                    }
                    {
                        this.props.reportForLineChart && this.props.reportForLineChart.length > 0 ?
                            <Col xs={12}>
                                <Panel>
                                    <LineChart
                                        data={this.props.reportForLineChart}
                                        style={lineChartStyle}
                                        lines={lines}
                                        xAxisKey="type"
                                    />
                                </Panel>
                            </Col> :
                            ""
                    }


                </Row>
                <MailReportModal
                    hideMailReportModal={this.hideMailReportModal}
                    showMailReportModal={this.state.showMailReportModal}
                    sendReport={this.props.sendRevenueReportByTimeDurationViaMail}
                />
            </ContentWrapper>
        );
    }
}


RevenueReportByTimeDuration.propTypes = {
    subFilter : React.PropTypes.object
};

function mapStateToProps(state) {

    if(!state.advanceReports){
        return {}
    }

    return {
        subFilter: state.advanceReports.subFilter ? state.advanceReports.subFilter : {},
        revenueReportByTimeDuration : state.advanceReports.revenueReportByTimeDuration ? processRevenueReportByTimeDurationData(state.advanceReports.revenueReportByTimeDuration) : [],
        reportForLineChart : state.advanceReports.revenueReportByTimeDuration && state.advanceReports.revenueReportByTimeDuration.data ? state.advanceReports.revenueReportByTimeDuration.data : [],
        excelFileName: state.advanceReports.excelFileName ? state.advanceReports.excelFileName : null,
        authToken: state.user.token,
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
        onChangeRevenueReportByTimeDurationSubmit,
        sendRevenueReportByTimeDurationViaMail,
        getRevenueReportByTimeDurationAndSubFilters,
        onChangeTimeDurationFilter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RevenueReportByTimeDuration);


