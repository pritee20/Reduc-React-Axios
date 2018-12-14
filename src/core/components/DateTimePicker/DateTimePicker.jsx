/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Button, FormControl, FormGroup } from 'react-bootstrap';
import DateTimePickerRun from './DateTimePicker.run';
/**
 * React Component that contains container for both type of reports.
 */
class DateTimePicker extends Component {

    constructor(props) {
        super(props);

        

    }

    componentDidMount() {
        DateTimePickerRun(this.props.fromDate, this.props.toDate);

        $(`#${this.props.id}`).on('dp.change',(event)=>{
            this.setState({
                fromDate: event.date.toString()
            });
        }).bind(this);
        
    }


    render() {

        return (
            <Row>
                <form className="form-horizontal">
                    <FormGroup className="col-lg-12">
                        <label className="col-lg-1 control-label">From</label>
                        <Col lg={ 5 }>
                            <div id="from-date" className="input-group date">
                                <input type="text" className="form-control" />
                                    <span className="input-group-addon">
                                        <span className="fa fa-calendar"></span>
                                    </span>
                            </div>
                        </Col>
                        <label className="col-lg-1 control-label">To</label>
                        <Col lg={ 5 }>
                            <div id="to-date" className="input-group date">
                                <input type="text" className="form-control" />
                                    <span className="input-group-addon">
                                        <span className="fa fa-calendar"></span>
                                    </span>
                            </div>
                        </Col>
                    </FormGroup>
                </form>
            </Row>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(null, mapDispatchToProps)(DateTimePicker);


