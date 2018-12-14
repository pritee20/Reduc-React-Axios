import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col, Panel, FormGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import {pieChartOptionSelected, barChartOptionSelected} from '../action';
import {BarChart, PieChart, DropDown} from '../../../core';
import {es6BindAll} from '../../../manage/helper';

class ParkingRevenueReportGraph extends Component {

    constructor(props) {
        super(props);
        es6BindAll(this, ['pieChartDropDownSelected', 'barChartDropDownSelected', 'getChartStyle']);
    }

    pieChartDropDownSelected(value) {
        this.props.pieChartOptionSelected(value);
    }

    barChartDropDownSelected(value) {
        this.props.barChartOptionSelected(value);
    }

    getChartStyle() {
        return {
            width: 450,
            height: 350
        };
    }

    render() {
        return (<div>
            <Row>
                <Col xs={4}/>
                <Col xs={2}>
                    <DropDown options={this.props.data.options} changeListener={this.barChartDropDownSelected}/>
                </Col>
                <Col xs={4}/>

                <Col xs={2}>
                    <DropDown options={this.props.data.options} changeListener={this.pieChartDropDownSelected}/>
                </Col>
            </Row>

            <Row>

                <Col xs={4}>
                    <BarChart data={this.props.data.barChart.data} xAxisKey={this.props.data.barChart.xAxisKey}
                              bars={this.props.data.barChart.bars} style={this.getChartStyle()}/>
                </Col>
                <Col xs={1}/>
                <Col xs={4}>
                    <PieChart data={this.props.data.pieChart.data} style={this.getChartStyle()}
                              cells={this.props.data.pieChart.colors}/>
                </Col>

            </Row>
        </div>);
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({pieChartOptionSelected, barChartOptionSelected}, dispatch);
}

exports.ParkingRevenueReportGraph = connect(null, mapDispatchToProps)(ParkingRevenueReportGraph);
