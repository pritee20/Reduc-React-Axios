/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import
    React, {
    Component
} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid} from 'react-bootstrap';
import ReportsDefaultView from './ReportsDefaultView';
import ValueCardReport from './ValueCardReport';
import RevenueReportByVehicleType from './RevenueReportByVehicleType';
import RevenueReportByTimeDuration from './RevenueReportByTimeDuration';
import RevenueReportByModeOfPayment from './RevenueReportByModeOfPayment';
import CurrentStatusReport from './CurrentStatusReport';
import DataDumpReport from './DataDumpReport';
import {ParkingRevenueReports} from '../revenue-reports-parking/components';
import {constants} from '../../constants';

/**
 * React Component that contains container for all type of reports.
 */

class ReportContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        // Switch statement return report according to the requested query url
        switch (this.props.location.query.reportType) {
            // Value Card report is returned
            case 'value-card' :
            {
                return (
                    <Grid fluid>
                        <ValueCardReport />
                    </Grid>
                );
            }
            // Data Dump report returned
            case 'data-dump' :
            {
                return (
                    <Grid fluid>
                        <DataDumpReport />
                    </Grid>
                );
            }
            // Revenue Report by Vehicle Type returned
            case 'by-vehicle-type' :
            {
                return (
                    <Grid fluid>
                        <RevenueReportByVehicleType />
                    </Grid>
                );
            }
            // Revenue Report by Time Duration returned
            case 'by-time-duration' :
            {
                return (
                    <Grid fluid>
                        <RevenueReportByTimeDuration />
                    </Grid>
                );
            }

            case constants.pathConstants.REVENUE_REPORTS.parking.query:
            {

                return (<Grid fluid>
                    <ParkingRevenueReports/>
                </Grid>);

            }
            // Revenue Report by Mode Of Payment returned
            case 'by-mode-of-payment' :
            {
                return (
                    <Grid fluid>
                        <RevenueReportByModeOfPayment />
                    </Grid>
                );
            }
            // Current Status returned
            case 'current-status' :
            {
                return (
                    <Grid fluid>
                        <CurrentStatusReport />
                    </Grid>
                );
            }
            // Default Page For Report
            default :
            {
                return (
                    <Grid fluid>
                        <ReportsDefaultView />
                    </Grid>
                );
            }
        }

    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(null, mapDispatchToProps)(ReportContainer);


