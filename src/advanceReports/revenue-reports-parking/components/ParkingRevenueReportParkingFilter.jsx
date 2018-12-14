import
    React, {
    Component
} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col, Panel, FormGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import {DropDown, DateTimeInput} from  '../../../core';
import {
    setToDuration,
    setFromDuration,
    setBookingMode,
    setCustomerType,
    setPaymentType,
    getRevenueReportParkingData
} from '../action';
import {es6BindAll} from '../../../manage/helper';

export class ParkingRevenueReportFilter extends Component {

    constructor(props) {
        super(props);
        es6BindAll(this, ['fromDateChangedListener', 'toDateChangedListener', 'paymentTypeChangedListener',
            'bookingModeChangedListener', 'customerTypeChangedListener', 'filtersChanged']);
    }


    fromDateChangedListener(value) {
        this.props.setFromDuration(value);
    }

    toDateChangedListener(value) {
        this.props.setToDuration(value);
    }

    paymentTypeChangedListener(value) {
        this.props.setPaymentType(value);
    }

    bookingModeChangedListener(value) {
        this.props.setBookingMode(value);
    }

    customerTypeChangedListener(value) {
        this.props.setCustomerType(value);
    }

    filtersChanged(event) {
        console.log('filters changed oh boy so exciting cannot use slanderous debug messages because of the puritans.');
        this.props.getRevenueReportParkingData(false);
    }

    render() {
        return (
            <Panel>
                <Row>
                    <label className="col-lg-1 control-label">From</label>
                    <div className="col-lg-3">
                        <DateTimeInput id="fromDate" value={this.props.data.fromDate}
                                       onChangeListener={this.fromDateChangedListener}/></div>
                    <label className="col-lg-1 control-label">To</label>
                    <div className="col-lg-3">
                        <DateTimeInput id="toDate" value={this.props.data.toDate}
                                       onChangeListener={this.toDateChangedListener}/>
                    </div>

                    <div className="col-lg-3">
                        <Button bsStyle="success" onClick={this.filtersChanged}>Submit</Button>
                    </div>

                </Row>

                <br/>

                <Row>
                    <label className="col-lg-1 control-label">Payment Type</label>
                    <div className="col-lg-2">
                        <DropDown changeListener={this.paymentTypeChangedListener}
                                  options={this.props.data.paymentModeOptions}/></div>
                    <label className="col-lg-1 control-label">Booking Mode</label>
                    <div className="col-lg-2">
                        <DropDown options={this.props.data.bookingModeOptions}
                                  changeListener={this.bookingModeChangedListener}/>
                    </div>
                    <label className="col-lg-1 control-label">Customer Type</label>
                    <div className="col-lg-2">
                        <DropDown options={this.props.data.customerTypeOptions}
                                  changeListener={this.customerTypeChangedListener}/>
                    </div>

                </Row>

            </Panel>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setToDuration,
        setFromDuration,
        setBookingMode,
        setCustomerType,
        setPaymentType,
        getRevenueReportParkingData
    }, dispatch);
}

exports.ParkingRevenueReportFilter = connect(null, mapDispatchToProps)(ParkingRevenueReportFilter);
