/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {
    Component
} from 'react';
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
import {GMPDatatable, DropDown, PieChart, BarChart} from '../../core';
import Path from '../../../config/project.config';
import {es6BindAll} from '../../manage/helper';
import {
    onChangeDateTimePicker,
    onChangePaymentModeFilter,
    onChangeCustomerTypeFilter,
    onChangeEventTypeFilter,
    onChangeBookingModeFilter,
    onChangeRevenueReportByModeOfPaymentSubmit,
    sendRevenueReportByModeOfPaymentViaMail,
    setCurrentMonthDateRange,
    getRevenueReportByModeOfPaymentAndSubFilters,
    revenueReportPieChartDataChanged,
    revenueReportBarChartDataChanged
} from '../actions';

import {
    processRevenueReportByVehicleTypeData
} from '../helper';
import {revenueReportPaymentModeDropDownOptions, revenueReportPaymentModeGraphData} from '../selector';
/**
 * React Component that contains revenue report by mode of payment
 */

// Styling object for Bar chart
const barChartStyle = {
    height: 300, width: 500, marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 5
};

// Styling object for Pie chart
const pieChartStyle = {
    height: 300, width: 500, marginLeft: 5, marginRight: 25, marginTop: 20, marginBottom: 5, x : 50
};
class RevenueReportByModeOfPayment extends Component {

    constructor(props) {
        super(props);

        // Initializing state for Mail Report Modal
        this.state = {
            showMailReportModal: false
        };

        es6BindAll(this, ['renderDropdownButton', 'showMailReportModal', 'hideMailReportModal', 'barGraphDropDownChanged', 'pieChartDropDownChanged']);

    }

    // Component Did Mount call on load
    componentDidMount() {
        // Setting current month date range in state from the beginning of the month till now
        this.props.setCurrentMonthDateRange();
        // Get Revenue Report By Mode Of Payment Function called
        this.props.getRevenueReportByModeOfPaymentAndSubFilters();
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
    showMailReportModal(event) {
        this.setState({
            showMailReportModal: true
        });
    }

    // Function to hide mail report modal
    hideMailReportModal(event) {
        this.setState({
            showMailReportModal: false
        });
    }

    pieChartDropDownChanged(value) {
        console.log('pie chart value changed ', value);
        this.props.revenueReportPieChartDataChanged(value);
    }

    barGraphDropDownChanged(value) {
        console.log('graph chart value is ', value);
        this.props.revenueReportBarChartDataChanged(value);
    }

    render() {

        const BUTTONS = ['Success'];

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <h3>Revenue Report by Mode of Payment</h3>
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
                                            onClick={this.props.onChangeRevenueReportByModeOfPaymentSubmit}>Submit</Button>
                                </Col>
                            </Row>

                        </Panel>
                    </Col>
                    {
                        this.props.excelFileName && this.props.excelFileName !== null ?
                            <Col xs={12} className="text-right" style={{paddingBottom: 20+"px"}}>
                                { BUTTONS.map(this.renderDropdownButton) }
                                <Button bsStyle="primary" style={{marginLeft: 10+"px"}}
                                        onClick={this.showMailReportModal}>Mail
                                    Report</Button>
                            </Col> :
                            <Col xs={12} className="content-heading">
                                <h3>Fetching Reports, Please Wait...</h3>
                            </Col>
                    }
                    {
                        this.props.revenueReportByModeOfPayment && this.props.revenueReportByModeOfPayment.headers ?
                            <Col xs={12}>
                                <Panel>
                                    <GMPDatatable
                                        tableId="by-mode-of-payment"
                                        headerData={this.props.revenueReportByModeOfPayment.headers}
                                        reportData={this.props.revenueReportByModeOfPayment.reportData}
                                        columnData={this.props.revenueReportByModeOfPayment.columnData}
                                        footerData={this.props.revenueReportByModeOfPayment.footers}
                                    />
                                </Panel>
                            </Col> :
                            ""
                    }

                </Row>


                {this.props.dropDownOptions && this.props.dropDownOptions.length ?
                    <Row>
                        <Col xs={12}>
                            <Row>
                                <Col xs={5}/>
                                <Col xs={1}>
                                    <DropDown
                                        changeListener={this.barGraphDropDownChanged}
                                        options={this.props.dropDownOptions}
                                    />
                                </Col>
                                <Col xs={5}/>
                                <Col xs={1}>
                                    <DropDown
                                        changeListener={this.pieChartDropDownChanged}
                                        options={this.props.dropDownOptions}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>&nbsp;</Col>
                    </Row>
                    : ''}


                {
                    this.props.graphInfo.dataExists ?
                        <Row>
                            <Col xs={6}>
                                <Panel>
                                    <BarChart
                                        style={barChartStyle}
                                        data={this.props.graphInfo.barChart.data}
                                        bars={this.props.graphInfo.barChart.bars}
                                        xAxisKey="type"
                                    />
                                </Panel>
                            </Col>

                            <Col xs={6}>
                                <Panel>
                                    <PieChart
                                        style={pieChartStyle}
                                        data={this.props.graphInfo.pieChart.data}
                                        cells={this.props.graphInfo.pieChart.colors}
                                    />
                                </Panel>
                            </Col>


                        </Row>
                        : ''
                }

                <MailReportModal
                    hideMailReportModal={this.hideMailReportModal}
                    showMailReportModal={this.state.showMailReportModal}
                    sendReport={this.props.sendRevenueReportByModeOfPaymentViaMail}
                />
            </ContentWrapper>
        );
    }
}


RevenueReportByModeOfPayment.propTypes = {
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
        revenueReportByModeOfPayment: state.advanceReports.revenueReportByModeOfPayment ? processRevenueReportByVehicleTypeData(state.advanceReports.revenueReportByModeOfPayment) : [],
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
        dropDownOptions: revenueReportPaymentModeDropDownOptions(state),
        graphInfo: revenueReportPaymentModeGraphData(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeDateTimePicker,
        onChangePaymentModeFilter,
        onChangeCustomerTypeFilter,
        onChangeEventTypeFilter,
        onChangeBookingModeFilter,
        onChangeRevenueReportByModeOfPaymentSubmit,
        sendRevenueReportByModeOfPaymentViaMail,
        setCurrentMonthDateRange,
        revenueReportPieChartDataChanged,
        revenueReportBarChartDataChanged,
        getRevenueReportByModeOfPaymentAndSubFilters
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RevenueReportByModeOfPayment);


