/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import { Row, Col, Panel, FormGroup, Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import DateTimeRangePicker from '../../core/components/DateTimeRangePicker/DateTimeRangePicker'
import CompanyFilter from './CompanyFilter';
import PaymentModeFilter from './PaymentModeFilter';
import BookingModeFilter from './BookingModeFilter';
import CostumerTypeFilter from './CostumerTypeFilter';
import EventTypeFilter from './EventTypeFilter';
import MailReportModal from './MailReportModal';
import { GMPDatatable } from '../../core';
import {
    onChangeDateTimePicker,
    onChangePaymentModeFilter,
    onChangeBookingModeFilter,
    onChangeCustomerTypeFilter,
    onChangeEventTypeFilter,
    onClickDataDumpSubmit,
    sendDataDumpReportViaMail,
    setDataDumpDateTimeRange,
    getDataDumpReportAndSubFilter,
    getDataDumpReportExcel
} from '../actions';

/**
 * React Component that contains Data Dump Reports.
 */
    
class DataDumpReport extends Component {

    constructor(props) {
        super(props);
        // Initializing state for Mail Report Modal
        this.state = {
            showMailReportModal : false,
            showSaveAndMailButton : false
        };

        this.renderDropdownSplitButton = this.renderDropdownSplitButton.bind(this);
        this.showMailReportModal = this.showMailReportModal.bind(this);
        this.hideMailReportModal = this.hideMailReportModal.bind(this);
        this.showSaveAndMailButton = this.showSaveAndMailButton.bind(this);
        this.hideSaveAndMailButton = this.hideSaveAndMailButton.bind(this);
    }

    // Component Did Mount call on load
    componentDidMount(){
        // Setting current three months date range by now
        this.props.setDataDumpDateTimeRange();
        // Get Data Dump Report Function called
        this.props.getDataDumpReportAndSubFilter();
    }
    
    
    // Function to fill drop-down for exporting excel file 
    renderDropdownSplitButton(title, i) {
        return (
            <DropdownButton bsStyle={ title.toLowerCase() } title="Save As" key={ i } id={ `dropdown-basic-${i}` }>
                <MenuItem eventKey="1" onClick={this.props.getDataDumpReportExcel}>EXCEL</MenuItem>
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

    showSaveAndMailButton(e){
        this.setState({
            showSaveAndMailButton : true
        })
    }

    hideSaveAndMailButton(e){
        this.setState({
            showSaveAndMailButton : false
        })
    }

    render() {

        const BUTTONS = ['Success'];

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <h3>Data Dump</h3>
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
                            {
                                this.props.subFilter && (this.props.subFilter.companies || this.props.subFilter.parkings || this.props.subFilter.parkingLots || this.props.subFilter.users) ?
                                    <Row>
                                        <form className="form-horizontal">
                                            <FormGroup className="col-lg-12">
                                                <Col lg={ 2 }>
                                                    <Button bsStyle="success" bsSize="large" onClick={this.showSaveAndMailButton}>Get Report</Button>
                                                </Col>
                                            </FormGroup>
                                        </form>
                                    </Row> :
                                    ""
                            }

                        </Panel>
                    </Col>
                    {
                        this.props.dataDumpReport && this.props.dataDumpReport.headers ?
                            <Col xs={12}>
                                <Panel>
                                    <GMPDatatable
                                        tableId="data-dump-report"
                                        headerData={this.props.dataDumpReport.headers}
                                        reportData={this.props.dataDumpReport.reportData}
                                        columnData={this.props.dataDumpReport.columnData}
                                        footerData={this.props.dataDumpReport.footers}
                                    />
                                </Panel>
                            </Col> :
                            ""
                    }
                    {
                        this.state.showSaveAndMailButton ?
                            <Col xs={12}>
                                <Panel>
                                    <label className="col-xs-3">Report Generated Successfully : </label>
                                    <Col xs={ 2 }>
                                        { BUTTONS.map(this.renderDropdownSplitButton) }
                                    </Col>
                                    <Col xs={ 2 }>
                                        <Button bsStyle="primary" onClick={this.showMailReportModal}>Mail Report</Button>
                                    </Col>
                                </Panel>
                            </Col> :
                            ""

                    }
                </Row>
                <MailReportModal
                    hideMailReportModal={this.hideMailReportModal}
                    showMailReportModal={this.state.showMailReportModal}
                    sendReport={this.props.sendDataDumpReportViaMail}
                />
            </ContentWrapper>
        );
    }
}

DataDumpReport.propTypes = {};

function mapStateToProps(state) {

    if(!state.advanceReports){
        return {}
    }
    
    return {
        dateRange: state.advanceReports.dateRange ? state.advanceReports.dateRange : {},
        subFilter: state.advanceReports.subFilter ? state.advanceReports.subFilter : {},
        authToken: state.user.token,
        selectedCompanyId : state.advanceReports.selectedCompanyId,
        selectedParkingId : state.advanceReports.selectedParkingId,
        selectedParkingLotId : state.advanceReports.selectedParkingLotId,
        selectedParkingSubLotId : state.advanceReports.selectedParkingSubLotId,
        selectedUsername : state.advanceReports.selectedUsername,
        selectedPaymentMode : state.advanceReports.selectedPaymentMode,
        selectedCustomerType : state.advanceReports.selectedCustomerType,
        selectedEventType : state.advanceReports.selectedEventType,
        selectedBookingMode : state.advanceReports.selectedBookingMode
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeDateTimePicker,
        onChangePaymentModeFilter,
        onChangeBookingModeFilter,
        onChangeCustomerTypeFilter,
        onChangeEventTypeFilter,
        onClickDataDumpSubmit,
        sendDataDumpReportViaMail,
        setDataDumpDateTimeRange,
        getDataDumpReportAndSubFilter,
        getDataDumpReportExcel
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataDumpReport);


