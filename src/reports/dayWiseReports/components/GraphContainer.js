/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import dayWiseReportsSelector from '../selectors';
import LineChart from './LineChart';
import { Row,Col,Panel } from 'react-bootstrap';
/**
 * React Component that renders both revenue and transactions graphical components.
 */
class GraphContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			<Row>
				<Col lg= {12}>
					<LineChart isRev={false} containerName="transContainer" graphData={this.props.selectedDayWiseReports}/>
				</Col>
			</Row>
			<Row>
				<Col lg= {12}>
					<LineChart isRev={true} containerName="revenContainer" graphData={this.props.selectedDayWiseReports}/>
				</Col>
			</Row>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		selectedDayWiseReports: dayWiseReportsSelector(state)
	};
}
export default connect(mapStateToProps)(GraphContainer);

