/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import {Row, Col, Panel, FormGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import DateTimeRangePicker from '../../core/components/DateTimeRangePicker/DateTimeRangePicker'
import CompanyFilter from './CompanyFilter';
import PaymentModeFilter from './PaymentModeFilter';
import BookingModeFilter from './BookingModeFilter';
import CostumerTypeFilter from './CostumerTypeFilter';
import EventTypeFilter from './EventTypeFilter';
import MailReportModal from './MailReportModal';
import {GMPDatatable, BarChart, PieChart, DropDown} from '../../core';
import {revenueReportDropDownOptions, revenueReportGraphData} from '../selector';
import {es6BindAll} from '../../manage/helper';
import Path from '../../../config/project.config';
import {
    onChangeDateTimePicker,
    onChangePaymentModeFilter,
    onChangeCustomerTypeFilter,
    onChangeEventTypeFilter,
    onChangeBookingModeFilter,
    onChangeRevenueReportByVehicleTypeSubmit,
    sendRevenueReportByVehicleTypeViaMail,
    setCurrentMonthDateRange,
    setGraphDataType,
    getRevenueReportByVehicleTypeAndSubFilters
} from '../actions';
import {
    processRevenueReportByVehicleTypeData
} from '../helper';


// Styling object for Bar chart
const barChartStyle = {
    height: 300, width: 500, marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 5
};

// Styling object for Pie chart
const pieChartStyle = {
    height: 300, width: 500, marginLeft: 5, marginRight: 25, marginTop: 20, marginBottom: 5, x : 50
};

/**
 * React Component that contains revenue report by vehicle type.
 */
class RevenueReportByVehicleType extends Component {

    constructor(props) {
        super(props);

        // Initializing state for Mail Report Modal
        this.state = {
            showMailReportModal: false
        };

        this.renderDropdownButton = this.renderDropdownButton.bind(this);
        this.showMailReportModal = this.showMailReportModal.bind(this);
        this.hideMailReportModal = this.hideMailReportModal.bind(this);
        es6BindAll(this, ['onGraphDataTypeChanged']);

    }

    // Component Did Mount call on load
    componentDidMount(){
        // Setting current month date range in state from the beginning of the month till now
        this.props.setCurrentMonthDateRange();
        // Get Revenue Report By Vehicle Type Function called
        this.props.getRevenueReportByVehicleTypeAndSubFilters();
    }

    // Function to fill drop-down for exporting excel file
    renderDropdownButton(title, i) {
        return (
            <DropdownButton bsStyle={ title.toLowerCase() } title="Save As" key={ i } id={ `dropdown-basic-${i}` }>
                <MenuItem eventKey="1"
                          href={`${Path.API_end}ParkingEvents/downloadExcelFile?access_token=${this.props.authToken}&fileName=${this.props.excelFileName}`}>EXCEL</MenuItem>
            </DropdownButton>
        );
    }

    // Function to show mail report modal
    showMailReportModal(event){
        this.setState({
            showMailReportModal: true
        });
    }

    // Function to hide mail report modal
    hideMailReportModal(event){
        this.setState({
            showMailReportModal: false
        });
    }

    onGraphDataTypeChanged(value) {
        this.props.setGraphDataType(value);
    }

    render() {

        const BUTTONS = ['Success'];

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <h3>Revenue Report by Vehicle Type</h3>
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
                                    <Button bsStyle="success"
                                            onClick={this.props.onChangeRevenueReportByVehicleTypeSubmit}>Submit</Button>
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
                        this.props.revenueReportByVehicleType && this.props.revenueReportByVehicleType.headers ?
                            <Col xs={12}>
                                <Panel>
                                    <GMPDatatable
                                        tableId="by-vehicle-type"
                                        headerData={this.props.revenueReportByVehicleType.headers}
                                        reportData={this.props.revenueReportByVehicleType.reportData}
                                        columnData={this.props.revenueReportByVehicleType.columnData}
                                        footerData={this.props.revenueReportByVehicleType.footers}
                                    />
                                </Panel>
                            </Col> :
                            <Col xs={12} className="content-heading">
                                <h3>Fetching Reports, Please Wait...</h3>
                            </Col>
                    }

                    {
                        this.props.graphDropDownOptions && this.props.graphDropDownOptions.length > 0 ?
                            <Col xs={2} xsOffset={5} style={{paddingBottom: 20+"px"}}>
                                <DropDown options={this.props.graphDropDownOptions}
                                          changeListener={this.onGraphDataTypeChanged}/>
                            </Col>
                            : ""
                    }

                    {
                        this.props.graphDataType && this.props.revenueReportByVehicleType
                        && this.props.revenueReportByVehicleType.reportData
                        && this.props.revenueReportByVehicleType.reportData.length > 0
                        && this.props.graphData.pies ?
                            <div>
                                <Col xs={6}>
                                    <Panel>
                                        <BarChart
                                            style={barChartStyle}
                                            data={this.props.revenueReportByVehicleType.reportData}
                                            bars={this.props.graphData.bars}
                                            xAxisKey="type"
                                        />
                                    </Panel>
                                </Col>
                                <Col xs={6}>
                                    <Panel>
                                        <PieChart
                                            style={pieChartStyle}
                                            cells={this.props.graphData.pies.colors}
                                            data={this.props.graphData.pies.data}
                                        />
                                    </Panel>
                                </Col>
                            </div>
                            : ''
                    }

                </Row>
                <MailReportModal
                    hideMailReportModal={this.hideMailReportModal}
                    showMailReportModal={this.state.showMailReportModal}
                    sendReport={this.props.sendRevenueReportByVehicleTypeViaMail}
                />
            </ContentWrapper>
        );
    }
}


RevenueReportByVehicleType.propTypes = {
    dateRange: React.PropTypes.object,
    subFilter: React.PropTypes.object
};

function mapStateToProps(state) {

    if (!state.advanceReports) {
        return {}
    }

    return {
        dateRange: state.advanceReports.dateRange ? state.advanceReports.dateRange : {},
        subFilter: state.advanceReports.subFilter ? state.advanceReports.subFilter : {},
        revenueReportByVehicleType: state.advanceReports.revenueReportByVehicleType ? processRevenueReportByVehicleTypeData(state.advanceReports.revenueReportByVehicleType) : [],
        excelFileName: state.advanceReports.excelFileName ? state.advanceReports.excelFileName : null,
        authToken: state.user.token,
        selectedCompanyId: state.advanceReports.selectedCompanyId,
        selectedParkingId: state.advanceReports.selectedParkingId,
        selectedParkingLotId: state.advanceReports.selectedParkingLotId,
        selectedParkingSubLotId: state.advanceReports.selectedParkingSubLotId,
        selectedUsername: state.advanceReports.selectedUsername,
        selectedPaymentMode: state.advanceReports.selectedPaymentMode,
        selectedCustomerType: state.advanceReports.selectedCustomerType,
        selectedEventType: state.advanceReports.selectedEventType,
        selectedBookingMode: state.advanceReports.selectedBookingMode,
        graphDropDownOptions: revenueReportDropDownOptions(state),
        graphDataType: state.advanceReports.revenueReportVehicleTypeGraph,
        graphData: revenueReportGraphData(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeDateTimePicker,
        onChangePaymentModeFilter,
        onChangeCustomerTypeFilter,
        onChangeEventTypeFilter,
        onChangeBookingModeFilter,
        onChangeRevenueReportByVehicleTypeSubmit,
        sendRevenueReportByVehicleTypeViaMail,
        setCurrentMonthDateRange,
        setGraphDataType,
        getRevenueReportByVehicleTypeAndSubFilters
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RevenueReportByVehicleType);


