/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import SelectorBox from './SelectorBox';
import {connect} from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import companyReports from '../companyReports';
import dayWiseReports from '../dayWiseReports';

/**
 * React Component that renders the Selector Component along with rendering of reports data
 * depending upon the type of reports.
 */
class DisplayReportContainer extends Component {
    constructor(props) {
        super(props);
        this.renderReports = this.renderReports.bind(this);
    }

    renderReports() {

        switch (this.props.reportType) {
            case companyReports.constants.NAME:
                return <companyReports.components.ReportContainer reportType={this.props.reportType}/>;
            case dayWiseReports.constants.NAME:
                return <dayWiseReports.components.GraphContainer reportType={this.props.reportType}/>;
            default:
                return <h3>No reports found</h3>;
        }

    }

    render() {
        return (
            <Row>
                <Col lg={ 12 }>
                    {
                        this.props.isFetchingReports ?
                            <div className="ball-pulse text-center">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            : this.props.isReportsData ?
                                <div>
                                    <SelectorBox reportType={this.props.reportType}/>
                                    {this.renderReports()}
                                </div>
                                : ''
                    }
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return ({
        isReportsData: state.reports[ownProps.reportType].isReportsData,
        isFetchingReports: state.reports[ownProps.reportType].isFetchingReports
    });
}

export default connect(mapStateToProps)(DisplayReportContainer);
