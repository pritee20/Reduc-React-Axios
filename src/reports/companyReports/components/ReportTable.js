/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import { getParkingLName } from '../../helpers';
import { initializeUserDataTable } from '../helpers';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'react-bootstrap';

/**
 * React Component for rendering user wise reports
 */
class ReportTable extends React.Component {

	constructor(props){
		super(props);
	}

    componentDidMount(){
        initializeUserDataTable(this.props.reports);
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }

	render(){
		return(
			<Row>
				<Col lg={12}>
				<h5>{getParkingLName(this.props.reports[0].parkingLotId, this.props.userAccess.parkingLotsAccess)}</h5>
					<Table id="companyUserReports" responsive striped>
					<thead>
					  <tr>
						  <th>Vehicle Type</th>
						  <th>In<em>(Count)</em></th>
						  <th>Out<em>(Count)</em></th>
						  <th>FOC<em>(Count)</em></th>
						  <th>TT<em>(Count)</em></th>
                          <th>AC<em>(Count)</em></th>
						  <th>Total<em>(Rs.)</em></th>
					  </tr>
					</thead>
					
					</Table>
				</Col>
			</Row>
		);
	}
}
function mapStateToProps(state) {
	return {
		userAccess: state.user.userAccessNamed
	};
}
export default connect(mapStateToProps)(ReportTable);
