/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import { } from '../actions';
import { connect } from 'react-redux';
import { checkCompanyAccessLevel } from '../../helpers';
import { getOperatorAppStatus } from '../actions';
import { convertType } from '../../../utils/utils.js';
import _ from 'lodash';
import { Panel, Row, Col, Grid } from 'react-bootstrap';
/**
 * React Component for selecting the user(incase of userwise),companies,parkings,parkinglots,etc.
 */
class SelectorBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            companyAccess: props.companyAccess,
            parkingAccess: props.parkingAccess,
            parkingLotsAccess: props.parkingLotsAccess,
            parkingSubLotsAccess: props.parkingSubLotsAccess,
            typeAccess: [{
                key : "Checked In / Check Out",
                value : "CHECKED_IN,CHECKED_OUT"
            },{
                key : "Checked In",
                value : "CHECKED_IN"
            },{
                key : "Checked Out",
                value : "CHECKED_OUT"
            },{
                key : "FOC",
                value : "FOC"
            },{
                key : "Payment",
                value : "PAYMENT"
            }]
        };

        this.onChangeCompanySelect = this.onChangeCompanySelect.bind(this);
        this.onChangeParkingSelect = this.onChangeParkingSelect.bind(this);
        this.onChangeParkingLotSelect = this.onChangeParkingLotSelect.bind(this);
        this.onChangeParkingSubLotSelect = this.onChangeParkingSubLotSelect.bind(this);
        this.onChangeTypeSelect = this.onChangeTypeSelect.bind(this);
    }

    onChangeCompanySelect(event) {

        let data = {
            selectedCompany: [],
            selectedParking : [],
            selectedParkingLot : [],
            selectedParkingSubLot : [],
            selectedType : this.props.selectedType,
            onChange: true
        };

        if(event.target.value == ""){
            for(var i = 0; i < this.props.companyAccess.length; i++){
                data.selectedCompany.push(this.props.companyAccess[i].id);
            }
        }else {
            for(i = 0; i < this.props.companyAccess.length; i++){
                if(this.props.companyAccess[i].id == event.target.value){
                    data.selectedCompany.push(event.target.value);
                    this.state.parkingAccess = this.props.companyAccess[i].parkings;
                }
            }
        }

        this.props.getOperatorAppStatus(data);
    }

    onChangeParkingSelect(event) {

        let data = {
            selectedParking: [],
            selectedParkingLot : [],
            selectedParkingSubLot : [],
            selectedType : this.props.selectedType,
            onChange: true
        };

        if(event.target.value == ""){

            if(this.props.companyAccess.length >= this.state.companyAccess.length){
                for(var i = 0; i < this.props.companyAccess.length; i++){

                    if(this.props.companyAccess[i].id == this.props.selectedCompany){
                        for(var j = 0;  j < this.props.companyAccess[i].parkings.length; j++){
                            data.selectedParking.push(this.props.companyAccess[i].parkings[j].id);
                        }

                        this.state.parkingSubLotsAccess = this.props.companyAccess[i].parkings;
                    }
                }

            }else {
                for(i = 0; i < this.props.parkingAccess.length; i++){
                    data.selectedParking.push(this.props.parkingAccess[i].id);
                }
            }

            if(data.selectedParking.length < 1){
                for(i = 0; i < this.props.parkingAccess.length; i++){
                    data.selectedParking.push(this.props.parkingAccess[i].id);
                }
            }

        }else {
            for(i = 0; i < this.props.parkingAccess.length; i++){
                if(this.props.parkingAccess[i].id == event.target.value){
                    data.selectedParking.push(event.target.value);
                    this.state.parkingLotsAccess = this.props.parkingAccess[i].parkingLots;
                }
            }
        }

        this.props.getOperatorAppStatus(data);
    }

    onChangeParkingLotSelect(event) {

        let data = {
            selectedParkingLot: [],
            selectedParkingSubLot : [],
            selectedType : this.props.selectedType,
            onChange: true
        };

        if(event.target.value == ""){

            if(this.props.parkingAccess.length >= this.state.parkingAccess.length){
                for(var i = 0; i < this.props.parkingAccess.length; i++){

                    if(this.props.parkingAccess[i].id == this.props.selectedParking){
                        for(var j = 0;  j < this.props.parkingAccess[i].parkingLots.length; j++){
                            data.selectedParkingLot.push(this.props.parkingAccess[i].parkingLots[j].id);
                        }

                        this.state.parkingSubLotsAccess = this.props.parkingAccess[i].parkingLots;
                    }
                }

            }else {
                for(i = 0; i < this.props.parkingLotsAccess.length; i++){
                    data.selectedParkingLot.push(this.props.parkingLotsAccess[i].id);
                }
            }

            if(data.selectedParkingLot.length < 1){
                for(i = 0; i < this.props.parkingLotsAccess.length; i++){
                    data.selectedParkingLot.push(this.props.parkingLotsAccess[i].id);
                }
            }


        }else {
            for(i = 0; i < this.props.parkingLotsAccess.length; i++){
                if(this.props.parkingLotsAccess[i].id == event.target.value){
                    data.selectedParkingLot.push(event.target.value);
                    this.state.parkingSubLotsAccess = this.props.parkingLotsAccess[i].parkingSubLots;
                }
            }

        }

        this.props.getOperatorAppStatus(data);
    }

    onChangeParkingSubLotSelect(event) {

        let data = {
            selectedParkingSubLot: [],
            selectedType : this.props.selectedType,
            onChange: true
        };

        if(event.target.value == ""){

            if(this.props.parkingLotsAccess.length >= this.state.parkingLotsAccess.length){
                for(var i = 0; i < this.props.parkingLotsAccess.length; i++){

                    if(this.props.parkingLotsAccess[i].id == this.props.selectedParkingLot){
                        for(var j = 0;  j < this.props.parkingLotsAccess[i].parkingSubLots.length; j++){
                            data.selectedParkingSubLot.push(this.props.parkingLotsAccess[i].parkingSubLots[j].id);
                        }

                        this.state.parkingSubLotsAccess = this.props.parkingLotsAccess[i].parkingSubLots;
                    }
                }

            }else {
                for(i = 0; i < this.props.parkingSubLotsAccess.length; i++){
                    data.selectedParkingSubLot.push(this.props.parkingSubLotsAccess[i].id);
                }
            }

            if(data.selectedParkingSubLot.length < 1){
                for(i = 0; i < this.props.parkingSubLotsAccess.length; i++){
                    data.selectedParkingSubLot.push(this.props.parkingSubLotsAccess[i].id);
                }
            }

        }else {
            data.selectedParkingSubLot.push(event.target.value);
        }

        this.props.getOperatorAppStatus(data);
    }

    onChangeTypeSelect(event) {

        let data = {
            selectedCompany: this.props.selectedCompany,
            selectedParking: this.props.selectedParking,
            selectedParkingLot: this.props.selectedParkingLot,
            selectedParkingSubLot: this.props.selectedParkingSubLot,
            selectedType: event.target.value,
            onChange: true
        };

        this.props.getOperatorAppStatus(data);
    }



    render() {
        return (

                <form>
                    <Col xs={6} sm={2}>
                        <div className="form-group">
                            <label className="valignLabel">Select Filter</label>
                        </div>
                    </Col>
                    {

                        checkCompanyAccessLevel(this.props.userAccesses) ?
                            <Col xs={6} sm={2}>
                                <div className="form-group">
                                    <select value={`${this.props.selectedCompany}`} className="form-control" onChange={this.onChangeCompanySelect}>
                                        <option value="">All Companies</option>
                                        {
                                            this.state.companyAccess.map(function (option) {
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
                            <select value={`${this.props.selectedParking}`} className="form-control" onChange={this.onChangeParkingSelect}>
                                <option value="" >All Parkings</option>
                                {
                                    this.state.parkingAccess.map(function (option) {
                                        return (<option key={option.id} value={option.id}>{option.name}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </Col>
                    <Col xs={6} sm={2}>
                        <div className="form-group">
                            <select value={`${this.props.selectedParkingLot}`} className="form-control" onChange={this.onChangeParkingLotSelect}>
                                <option value="">All ParkingLots</option>
                                {
                                    this.state.parkingLotsAccess.map(function (option) {
                                        return (<option key={option.id} value={option.id}>{option.name}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </Col>
                    <Col xs={6} sm={2}>
                        <div className="form-group">
                            <select value={`${this.props.selectedParkingSubLot}`} className="form-control" onChange={this.onChangeParkingSubLotSelect}>
                                <option value="" defaultValue>All Sublots</option>
                                {
                                    this.state.parkingSubLotsAccess.map(function (sublot) {
                                        return (<option key={sublot.id} value={sublot.id}>{sublot.type}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </Col>
                    <Col xs={6} sm={2}>
                        <div className="form-group">
                            <select value={`${this.props.selectedType}`} className="form-control" onChange={this.onChangeTypeSelect}>
                                {
                                    this.state.typeAccess.map(function (type) {
                                        return (<option key={type.key} value={type.value}>{type.key}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </Col>

                </form>

        );
    }
}

function mapStateToProps(state,ownProps) {
    return ({
        userAccesses: state.user.userAccess.userAccesses,
        companyAccess: state.user.userAccessNamed.companyAccess,
        parkingAccess: state.user.userAccessNamed.parkingAccess,
        parkingLotsAccess: state.user.userAccessNamed.parkingLotsAccess,
        parkingSubLotsAccess: state.user.userAccessNamed.parkingSubLotsAccess,
        selectedCompany: state.reports.operatorAppStatus.selectedCompany,
        selectedParking: state.reports.operatorAppStatus.selectedParking,
        selectedParkingLot: state.reports.operatorAppStatus.selectedParkingLot,
        selectedParkingSubLot: state.reports.operatorAppStatus.selectedParkingSubLot,
        selectedType: state.reports.operatorAppStatus.selectedType
    });
}

export default connect(mapStateToProps, { getOperatorAppStatus })(SelectorBox);


