/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import ReportTable from './ReportTable';
import { processUserSumReports } from '../helpers';
import companyReportsSelector from '../selectors';
import AllReportTable from './AllReportTable';

/**
 * React Component responsible for rendering Company Reports table.
 */
class ReportContainer extends React.Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){

	}
	
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }

	render(){
		return(
				<div>
					{
						this.props.companyReports.length > 0 ?
							this.props.isUserWise ?
							this.props.companyReports.map((userRep)=>{
								return(
									userRep.reports.length>0 ?
									<ReportTable key={userRep.username+_.random(0, 200)} reports={userRep.reports}/>
									:
									<h4 key={userRep.username+_.random(0, 200)} className="text-center">No Reports Found</h4>
								);
							})							
							:
							<AllReportTable companyReports={processUserSumReports(this.props.companyReports, this.props.userAccess.parkingSubLotsAccess)}/>
						:
						<h4 className="text-center">No Reports Found</h4>
					}
				</div>
			);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		companyReports: companyReportsSelector(state),
		userAccess: state.user.userAccessNamed,
		isUserWise: state.reports[ownProps.reportType].isUserWise
	};
}
export default connect(mapStateToProps)(ReportContainer);
