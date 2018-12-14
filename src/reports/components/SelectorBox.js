/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import { selectCompany, selectParking, selectParkingLot, selectParkingSubLot, selectUser, selectSublot, selectPaymentMode } from '../actions';
import { connect } from 'react-redux';
import { checkCompanyAccessLevel } from '../helpers';
import { convertType } from '../../utils/utils.js';
import _ from 'lodash';
import dayWiseReports from '../dayWiseReports';
import { Row, Col } from 'react-bootstrap';
import { fetchReportsForPaymentMode, fetchReportsData } from  '../actions';

/**
 * React Component for selecting the user(incase of userwise),companies,parkings,parkinglots,etc.
 */
class SelectorBox extends React.Component {

	constructor(props){
		super(props);
		
		this.state = {
			companies: props.companyAccess,
			parkings: props.parkingAccess,
			parkingLots: props.parkingLotsAccess,
			parkingSubLots: props.parkingSubLotsAccess,
            paymentMode : props.paymentMode,
            paymentModeOptions : ["freecharge", "offline_cash"],
			selectedCid: null,
			selectedPid: null,
			selectedPLid: null,
			selectedPSLid: null,
			selectedUser: props.usernames[0],
			selectedSublot: null,
            selectedPaymentMode : props.paymentMode
		};

		this.changeCompanySelect = this.changeCompanySelect.bind(this);
		this.changeParkingSelect = this.changeParkingSelect.bind(this);
		this.changeParkingLotSelect = this.changeParkingLotSelect.bind(this);
		this.changeParkingSubLotSelect = this.changeParkingSubLotSelect.bind(this);
		this.changeUserSelect = this.changeUserSelect.bind(this);
		this.changeSublotSelect = this.changeSublotSelect.bind(this);
        this.changePaymentModeSelect = this.changePaymentModeSelect.bind(this);

	}

	componentWillReceiveProps(nextProps){

		this.setState({
			selectedCid: nextProps.selectedIds.companyId,
			selectedPid: nextProps.selectedIds.parkingId,
			selectedPLid: nextProps.selectedIds.parkingLotId,
			selectedPSLid: nextProps.selectedIds.parkingSubLotId,
			selectedSublot: nextProps.selectedIds.subLotType
		});

	}

	componentDidMount(){

	}

	changeCompanySelect(event){
		
		let selectedId = convertType(event.target.value);

		if (selectedId === null) {

			let allC = this.props.companyAccess;
			let allP = this.props.parkingAccess;
			let allPL = this.props.parkingLotsAccess;
			let allPSL = this.props.parkingSubLotsAccess;

			this.setState({
				companies: allC,
				parkings: allP,
				parkingLots: allPL,
				parkingSubLots: allPSL
			});			

		} else {
			
			let selectedCompany = _.find(this.props.companyAccess,(company)=>company.id==selectedId);
			
			this.setState({
				parkings: selectedCompany.parkings,
				parkingLots: selectedCompany.parkingLots,
				parkingSubLots: selectedCompany.parkingSubLots
			});

		}

		this.setState({
			selectedCid: selectedId,
			selectedPid: null,
			selectedPLid: null,
			selectedPSLid: null
		});

		let {reportType} = this.props;

		this.props.selectCompany(selectedId,reportType);
		this.props.selectParking(null,reportType);
		this.props.selectParkingLot(null,reportType);
		this.props.selectParkingSubLot(null,reportType);
	}

	changeParkingSelect(event){

		let selectedId = convertType(event.target.value);

		if (selectedId === null) {

			if(this.state.selectedCid === null){

				this.setState({
					parkings: this.props.parkingAccess,
					parkingLots: this.props.parkingLotsAccess,
					parkingSubLots: this.props.parkingSubLotsAccess,
					selectedPLid: null,
					selectedPSLid: null
				});

			} else{
				
				let selectedCompany = _.find(this.props.companyAccess,(company)=>company.id==this.state.selectedCid);
				let stateP = selectedCompany.parkings;
				let statePL = selectedCompany.parkingLots;
				let statePSL = selectedCompany.parkingSubLots;
				
				this.setState({
					parkings: stateP,
					parkingLots: statePL,
					parkingSubLots: statePSL
				});

			}	

		} else {
			
			let selectedParking = _.find(this.props.parkingAccess,(parking)=> parking.id==selectedId);
			
			this.setState({
				parkingLots: selectedParking.parkingLots
			});

		}
		
		this.setState({
			selectedPid: selectedId,
			selectedPLid: null,
			selectedPSLid: null
		});

		let { reportType } = this.props;

		this.props.selectParking(selectedId,reportType);
		this.props.selectParkingLot(null,reportType);
		this.props.selectParkingSubLot(null,reportType);

	}

	changeParkingLotSelect(event){

		let selectedId = convertType(event.target.value);

		if (selectedId === null) {

			if (this.state.selectedPid === null) {

				if (this.state.selectedCid === null) {

					this.setState({
						parkingLots: this.props.parkingLotsAccess,
						parkingSubLots: this.props.parkingSubLotsAccess,
						selectedPSLid: null
					});

				} else {
					
					let selectedCompany = _.find(this.props.companyAccess,(company)=>company.id==this.state.selectedCid);
					
					this.setState({
						parkingSubLots: selectedCompany.parkingSubLots
					});

				}

			} else {
				
				let selectedParking = _.find(this.props.parkingAccess,(parking)=> parking.id==this.state.selectedPid);
				let statePL = selectedParking.parkingLots;
				
				this.setState({
					parkingLots: statePL
				});

			}		
		}

		this.setState({
			selectedPLid: selectedId,
			selectedPSLid: null
		});

		let {reportType} = this.props;

		this.props.selectParkingLot(selectedId,reportType);
		this.props.selectParkingSubLot(null,reportType);
	}

	changeParkingSubLotSelect(event){

		let selectedId = convertType(event.target.value);

		if (selectedId === null) {

			if (this.state.selectedPLid === null) {

				if (this.state.selectedPid === null) {

					if (this.state.selectedCid === null) {

						this.setState({
							parkingSubLots: this.props.parkingSubLotsAccess
						});

					} else {
						
						let selectedCompany = _.find(this.props.companyAccess,(company)=>company.id==this.state.selectedCid);
						
						this.setState({
							parkingSubLots: selectedCompany.parkingSubLots
						});

					}

				}
			} else {
				
				let selectedParkingLot = _.find(this.props.parkingLotsAccess,(parking)=> parking.id==this.state.selectedPLid);
				let statePSL = selectedParkingLot.parkingSubLots;
				
				this.setState({
					parkingSubLots: statePSL
				});

			}		
		}

		this.setState({
			selectedPSLid: selectedId
		});

		let { reportType } = this.props;

		this.props.selectParkingSubLot(selectedId,reportType);
	}

	changeUserSelect(event){

		let selectedUser = event.target.value;

		this.setState({
			selectedUser
		});

		let {reportType} = this.props;

		this.props.selectUser(selectedUser,reportType);

	}

	changeSublotSelect(event){

		let selectedSublot = convertType(event.target.value);

		this.setState({
			selectedSublot
		});

		let {reportType} = this.props;

		this.props.selectSublot(selectedSublot,reportType);
	}

    changePaymentModeSelect(event){
        console.log(event.target.value);
        let selectedPaymentMode = convertType(event.target.value);
        
        this.setState({
            selectedPaymentMode
        });

        let {reportType} = this.props;
        console.log(this.props);

        this.props.selectPaymentMode(selectedPaymentMode, reportType);

        if(selectedPaymentMode == null){
            this.props.fetchReportsData(this.props.startDate, this.props.endDate, this.props.isUserWise, reportType);
        }else {
            this.props.fetchReportsForPaymentMode(this.props.startDate, this.props.endDate, this.props.isUserWise, reportType, selectedPaymentMode);
        }
        
    }

	render() {
		return (
			<Row>
			<form>
			<Col xs={6} sm={2}>
				<div className="form-group">
					<label className="valignLabel">Select Filter</label>
				</div>
			</Col>	
			{
				this.props.isUserWise ?
				<Col xs={6} sm={2}>
					<div className="form-group">
						<select value={this.state.selectedUser} className="form-control" onChange={this.changeUserSelect}>
							{
								this.props.usernames.map(function (username) {
									return (<option key={username} value={username}>{username}</option>);
								})
							}
						</select>
					</div>
				</Col>
				:''
			}
			{	
				
				checkCompanyAccessLevel(this.props.userAccesses) ?	
					<Col xs={6} sm={2}>
						<div className="form-group">
							<select value={`${this.state.selectedCid}`} className="form-control" onChange={this.changeCompanySelect}>
								<option value="null">All Companies</option>
								{
									this.state.companies.map(function (option) {
										return (<option key={option.id} value={option.id}>{option.name}</option>)
									})
								}
							</select>
						</div>
					</Col>
				:''					
			}
			<Col xs={6} sm={2}>
				<div className="form-group">
					<select value={`${this.state.selectedPid}`} className="form-control" onChange={this.changeParkingSelect}>
						<option value="null" >All Parkings</option>
						{
							this.state.parkings.map(function (option) {
								return (<option key={option.id} value={option.id}>{option.name}</option>)
							})
						}
					</select>
				</div>
			</Col>
			<Col xs={6} sm={2}>
				<div className="form-group">
					<select value={`${this.state.selectedPLid}`} className="form-control" onChange={this.changeParkingLotSelect}>
						<option value="null">All ParkingLots</option>
						{
							this.state.parkingLots.map(function (option) {
								return (<option key={option.id} value={option.id}>{option.name}</option>)
							})
						}
					</select>
				</div>
			</Col>
			<Col xs={6} sm={2}>
				<div className="form-group">
					<select value={`${this.state.selectedPaymentMode}`} className="form-control" onChange={this.changePaymentModeSelect}>
						<option value="null">All Payment Mode</option>
						{
							this.state.paymentModeOptions.map(function (option) {
								return (<option key={option} value={option}>{option}</option>)
							})
						}
					</select>
				</div>
			</Col>
			
			{
				(this.props.reportType === dayWiseReports.constants.NAME) ?
				<Col xs={6} sm={2}>
					<div className="form-group">
						<select value={`${this.state.selectedPSLid}`} className="form-control" onChange={this.changeParkingSubLotSelect}>
							<option value="null" defaultValue>All Sublots</option>
							{
								this.state.parkingSubLots.map(function (sublot) {
									return (<option key={sublot.id} value={sublot.id}>{sublot.type}</option>)
								})
							}
						</select>
					</div>
				</Col>
				:''
			}
			</form>
			</Row>

		);
	}	
}	

function mapStateToProps(state, ownProps) {
	return ({
		companyAccess: state.user.userAccessNamed.companyAccess,
		userAccesses : state.user.userAccess.userAccesses,
		parkingAccess: state.user.userAccessNamed.parkingAccess,
		parkingLotsAccess: state.user.userAccessNamed.parkingLotsAccess,
		parkingSubLotsAccess: state.user.userAccessNamed.parkingSubLotsAccess,
		isUserWise: state.reports[ownProps.reportType].isUserWise,
		usernames: state.reports[ownProps.reportType].usernames,
		selectedIds: state.reports[ownProps.reportType].selectedConfig,
        startDate : state.reports[ownProps.reportType].fromDate,
        endDate : state.reports[ownProps.reportType].toDate,
        paymentMode : state.reports[ownProps.reportType].paymentMode
	});
}

export default connect(mapStateToProps, { selectCompany, selectParking, selectParkingLot, selectParkingSubLot, selectUser, selectSublot, selectPaymentMode, fetchReportsForPaymentMode, fetchReportsData })(SelectorBox);



