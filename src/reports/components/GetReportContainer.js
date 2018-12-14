/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, { Component } from 'react';
import { Row, Col,Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import { fetchReportsData, fetchReportsForPaymentMode } from '../actions';
/**
 * React Component for selecting dates and toggling user wise option.
 * User can fetch reports by clicking 'Get Reports' button.
 */
class GetReportContainer extends Component {

	constructor(props) {

		super(props);

		let temp1 = new Date();
		temp1.setHours(0);
		temp1.setMinutes(0);
		temp1.setSeconds(0);
		let temp2 = new Date();

		this.state = {
			fromDate: temp1.toISOString(),
			toDate: temp2.toISOString(),
			userWise: false
		};
		
		this.handleUserToggle = this.handleUserToggle.bind(this);
		this.handleReportsClick = this.handleReportsClick.bind(this);
	}

	componentDidMount() {

		let startDate = new Date();
		startDate.setHours(0);
		startDate.setMinutes(0);
		startDate.setSeconds(0);


		$(`#datetimepicker1${this.props.reportType}`).datetimepicker({
			icons: {
				time: 'fa fa-clock-o',
				date: 'fa fa-calendar',
				up: 'fa fa-chevron-up',
				down: 'fa fa-chevron-down',
				previous: 'fa fa-chevron-left',
				next: 'fa fa-chevron-right',
				today: 'fa fa-crosshairs',
				clear: 'fa fa-trash'
			},
			defaultDate: startDate,
			viewMode: 'years',
			format: 'DD/MM/YYYY'
		});


		$(`#datetimepicker2${this.props.reportType}`).datetimepicker({
			icons: {
				time: 'fa fa-clock-o',
				date: 'fa fa-calendar',
				up: 'fa fa-chevron-up',
				down: 'fa fa-chevron-down',
				previous: 'fa fa-chevron-left',
				next: 'fa fa-chevron-right',
				today: 'fa fa-crosshairs',
				clear: 'fa fa-trash'
			},
			defaultDate: new Date(),
			viewMode: 'years',
			format: 'DD/MM/YYYY'
		});



		$(`#datetimepicker1${this.props.reportType}`).on('dp.change',(event)=>{
			this.setState({
				fromDate: event.date.toISOString()
			});
		}).bind(this);

		$(`#datetimepicker2${this.props.reportType}`).on('dp.change',(event)=>{
			this.setState({
				toDate: event.date.toISOString()
			});
		}).bind(this);
	}

	handleUserToggle(){
		let {reportType} = this.props;
		this.setState({
			userWise: $(`#userWise${reportType}`).prop('checked')
		});
	}

	handleReportsClick(){
        if(this.props.paymentMode == null){
            this.props.fetchReportsData(this.state.fromDate,this.state.toDate,this.state.userWise,this.props.reportType);
        }else {
            this.props.fetchReportsForPaymentMode(this.state.fromDate,this.state.toDate,this.state.userWise,this.props.reportType, this.props.paymentMode);
        }

	}

	render() {
		return (			
				<Row>	
					<form className="form-inline">					
							<Col xs={12} sm={4}>
								<div className="form-group">
									<label className="control-label mb valignLabel">From &nbsp; &nbsp; &nbsp;</label>
									{' '}
									<div id={`datetimepicker1${this.props.reportType}`} className="input-group date">
										<input type="text" className="form-control" />
										<span className="input-group-addon">
										<span className="fa fa-calendar"></span>
										</span>
									</div>
								</div>
							</Col>
							<Col xs={12} sm={4}>
								<div className="form-group">
									<label className="control-label mb valignLabel">To &nbsp; &nbsp; &nbsp;</label>
									{' '}
									<div id={`datetimepicker2${this.props.reportType}`} className="input-group date">
										<input type="text" className="form-control" />
										<span className="input-group-addon">
										<span className="fa fa-calendar"></span>
										</span>
									</div>
								</div>
							</Col>
							<Col xs={6} sm={ 2 }>
								<div className="form-group">								
									<label className="control-label">User Wise &nbsp; </label>
									{' '}
									<label className="switch">
										<input type="checkbox" id={`userWise${this.props.reportType}`} onChange={this.handleUserToggle}/>
										<em></em>
									</label>
								</div>
							</Col>
							<Col xs={6} sm={ 2 }>
								<div className="input-group pull-right">
									<span className="input-group-btn">	
									<Button bsClass="btn btn-green" className="mb-sm" onClick={this.handleReportsClick}>Get Reports</Button>
									</span>
								</div>	
							</Col>	
					</form>								
				</Row>			          
		);
	}
}


function mapStateToProps(state, ownProps) {
	return ({
		paymentMode : state.reports[ownProps.reportType].paymentMode
	});
}

export default connect(mapStateToProps,{ fetchReportsData, fetchReportsForPaymentMode })(GetReportContainer);
