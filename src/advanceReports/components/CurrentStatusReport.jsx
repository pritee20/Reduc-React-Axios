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
import CompanyFilter from './CompanyFilter';
import MailReportModal from './MailReportModal';
import {GMPDatatable, BarChart, PieChart, DropDown} from '../../core';
import {currentStatusDropDownOptions, currentStatusReportGraphData} from '../selector';
import {es6BindAll} from '../../manage/helper';
import Path from '../../../config/project.config';
import {
    onChangeDateTimePicker,
    onChangePaymentModeFilter,
    onChangeCustomerTypeFilter,
    onChangeEventTypeFilter,
    onChangeBookingModeFilter,
    currentStatusReportSubmit,
    sendCurrentStatusReportViaMail,
    setCurrentMonthDateRange,
    setCurrentStatusSelectedParkingLot,
    getCurrentStatusReportAndSubFilters
} from '../actions';
import {
    processCurrentStatusReportData
} from '../helper';


// Styling object for Bar chart
const barChartStyle = {
    height: 300, width: 500, marginLeft: 5, marginRight: 5, marginTop: 5, marginBottom: 5
};

// Styling object for Pie chart
const pieChartStyle = {
    height: 200, width: 345, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10
};

/**
 * React Component that contains revenue report by vehicle type.
 */
class CurrentStatusReport extends Component {

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

    componentDidMount(){
        // Get Revenue Report By Vehicle Type Function called
        this.props.getCurrentStatusReportAndSubFilters();
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
        this.props.setCurrentStatusSelectedParkingLot(value);
    }

    render() {

        const BUTTONS = ['Success'];

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <h3>Current Status</h3>
                </div>
                <Row>
                    <Col xs={12}>
                        <Panel>
                            <CompanyFilter
                                subFilter={this.props.subFilter}
                                selectedCompanyId={this.props.selectedCompanyId}
                                selectedParkingId={this.props.selectedParkingId}
                            />
                            <Row>
                                <Col xs={ 12 }>
                                    <Button bsStyle="success"
                                            onClick={this.props.currentStatusReportSubmit}>Submit</Button>
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
                        this.props.currentStatusReport && this.props.currentStatusReport.headers ?
                            <Col xs={12}>
                                <Panel>
                                    <div style={{overflow: "scroll"}}>
                                        <GMPDatatable
                                            tableId="current-status"
                                            headerData={this.props.currentStatusReport.headers}
                                            reportData={this.props.currentStatusReport.reportData}
                                            columnData={this.props.currentStatusReport.columnData}
                                            footerData={this.props.currentStatusReport.footers}
                                        />
                                    </div>
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
                        this.props.graphData.dataExists && this.props.graphData.pieCharts.length > 0 ?
                            <Col xs={12}>
                                <Panel>
                                    {
                                        this.props.graphData.pieCharts.map(function(value){
                                            return (
                                                <Col xs={4} key={value.value} className="text-center">
                                                    <PieChart
                                                        style={pieChartStyle}
                                                        cells={value.colors}
                                                        data={value.data}
                                                        isLegend={true}
                                                    />
                                                    <h4>{value.value}</h4>
                                                </Col>
                                            )
                                        })
                                    }
                                </Panel>
                            </Col>
                            : ''
                    }

                </Row>
                <MailReportModal
                    hideMailReportModal={this.hideMailReportModal}
                    showMailReportModal={this.state.showMailReportModal}
                    sendReport={this.props.sendCurrentStatusReportViaMail}
                />
            </ContentWrapper>
        );
    }
}


CurrentStatusReport.propTypes = {
    dateRange: React.PropTypes.object,
    subFilter: React.PropTypes.object
};

function mapStateToProps(state) {

    if (!state.advanceReports) {
        return {}
    }

    return {
        subFilter: state.advanceReports.subFilter ? state.advanceReports.subFilter : {},
        currentStatusReport : state.advanceReports.currentStatusReport ? processCurrentStatusReportData(state.advanceReports.currentStatusReport) : [],
        excelFileName: state.advanceReports.excelFileName ? state.advanceReports.excelFileName : null,
        authToken: state.user.token,
        selectedCompanyId: state.advanceReports.selectedCompanyId,
        selectedParkingId: state.advanceReports.selectedParkingId,
        graphDropDownOptions: currentStatusDropDownOptions(state),
        graphData: currentStatusReportGraphData(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeDateTimePicker,
        onChangePaymentModeFilter,
        onChangeCustomerTypeFilter,
        onChangeEventTypeFilter,
        onChangeBookingModeFilter,
        currentStatusReportSubmit,
        sendCurrentStatusReportViaMail,
        setCurrentMonthDateRange,
        setCurrentStatusSelectedParkingLot,
        getCurrentStatusReportAndSubFilters
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentStatusReport);


