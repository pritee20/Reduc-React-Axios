/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Panel, Row, Col} from 'react-bootstrap';
import {getOperatorAppStatus, setUpOperatorAppTable} from '../actions';
import SelectorBox from './SelectorBox';
import Datatable from './Datatable.jsx';


class OperatorApp extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let columnData = [{
            data: 'operator_name'
        }, {
            data: 'parking_name'
        },{
            data: 'parking_lot_name'
        },{
            data: 'parking_sub_lot_name'
        }, {
            data: 'event_type'
        }, {
            data: 'event_time',
            render: function (data) {
                var date = new Date(data);
                let hours = (""+date.getHours()).length < 2 ? "0" + date.getHours() : date.getHours();
                let minutes = (""+date.getMinutes()).length < 2 ? "0" + date.getMinutes() : date.getMinutes();
                let seconds = (""+date.getSeconds()).length < 2 ? "0" + date.getSeconds() : date.getSeconds();
                let newDate = (""+date.getDate()).length < 2 ? "0" + date.getDate() : date.getDate();
                let month = date.getMonth() + 1;
                month = ("" + month).length < 2 ? "0" + month : month;
                let year =  date.getFullYear();

                return (hours + ":" + minutes + ":" + seconds + " - " + newDate + "/" + month + "/" + year);

            }
        }];

        let data = {
            selectedCompany : [],
            selectedParking : [],
            selectedParkingLot : [],
            selectedParkingSubLot : [],
            selectedType : "CHECKED_IN,CHECKED_OUT",
            onChange : false
        };

        for(var i = 0; i < this.props.companyAccess.length; i++){
            data.selectedCompany.push(this.props.companyAccess[i].id);

        }

        this.props.getOperatorAppStatus(data);

        this.props.setUpOperatorAppTable('#operatorApp', columnData);
    }


    render() {

        let rowsArr = [];

        rowsArr.push({style: {width: "5%"}, name: "Operator"});
        rowsArr.push({style: {width: "20%"}, name: "Parking"});
        rowsArr.push({style: {width: "20%"}, name: "Parking-Lot"});
        rowsArr.push({style: {width: "20%"}, name: "Parking-SubLot"});
        rowsArr.push({style: {width: "15%"}, name: "Event Type"});
        rowsArr.push({style: {width: "20%"}, name: "Event Time"});

        return (
            <div>
                <Panel header="Operator App Status">
                    <Row>
                        <SelectorBox />
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Datatable id="operatorApp" rows={rowsArr}/>
                        </Col>
                    </Row>
                </Panel>
            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        companyAccess: state.user.userAccessNamed.companyAccess,
        parkingAccess: state.user.userAccessNamed.parkingAccess,
        parkingLotsAccess: state.user.userAccessNamed.parkingLotsAccess,
        parkingSubLotsAccess: state.user.userAccessNamed.parkingSubLotsAccess,
        selectedCompany: state.reports.operatorAppStatus.selectedCompany,
        selectedParking: state.reports.operatorAppStatus.selectedParking,
        selectedParkingLot: state.reports.operatorAppStatus.selectedParkingLot,
        selectedParkingSubLot: state.reports.operatorAppStatus.selectedParkingSubLot
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getOperatorAppStatus, setUpOperatorAppTable}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatorApp);