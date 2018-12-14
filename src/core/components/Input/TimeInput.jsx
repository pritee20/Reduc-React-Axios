/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


/**
 * TimeInput is a dumb component, to enter time in 24 hour format,
 * onBlur i.e. after user is done setting the value the callback passed
 * from the parent is executed.
 */


import React, {Component} from 'react';
import {FormControl, InputGroup} from 'react-bootstrap';
import {es6BindAll} from '../../../manage/helper';

class TimeInput extends Component {

    constructor(props) {
        super(props);
        es6BindAll(this, ['componentBlurred', 'componentChanged']);
    }

    componentDidMount() {
        let outerThis = this;
        let id = '#' + this.props.datePickerId;
        $(id).datetimepicker({
            format: 'HH:mm'
        });
        $(id).on('dp.change', (event)=> {
            if (outerThis.props.changeListener) {
                let openMoment = event.date;
                outerThis.props.changeListener(openMoment.format("HH:mm"));
            }
        }).bind(this);

    }

    componentBlurred(event) {
        if (this.props.blurListener) {
            this.props.blurListener(event.target.value);
        }
    }

    componentChanged(event) {
        if (this.props.changeListener) {
            this.props.changeListener(event.target.value);
        }
    }

    render() {
        return (
            <div>
                <InputGroup id={this.props.datePickerId} onBlur={this.componentBlurred}
                >
                    {this.props.required ?
                        <FormControl type="text" className="form-control"
                                     placeholder={this.props.placeholder? this.props.placeholder :''}
                                     onChange={this.componentChanged}
                                     defaultValue={this.props.value} required/> :
                        <FormControl type="text" className="form-control"
                                     onChange={this.componentChanged}
                                     placeholder={this.props.placeholder? this.props.placeholder :''}
                                     defaultValue={this.props.value}/>}
                    <InputGroup.Addon><span
                        className="fa fa-clock-o"/></InputGroup.Addon>
                </InputGroup>
            </div>
        );
    }

}

TimeInput.propTypes = {
    value: React.PropTypes.string.isRequired,
    blurListener: React.PropTypes.func,
    datePickerId: React.PropTypes.string
};

export default TimeInput;