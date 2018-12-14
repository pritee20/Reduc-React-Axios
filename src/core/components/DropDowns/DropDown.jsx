/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import _ from 'lodash';


export default class DropDown extends Component {

    constructor(props) {
        super(props);
        this.blurEvent = this.blurEvent.bind(this);
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.state = {
            value: props.value
        };


    }

    blurEvent(event) {
        if (this.props.blurListener)
            this.props.blurListener(event.target.value);
    }

    onChangeEvent(event) {
        this.setState({
            value: event.target.value
        });
        if (this.props.changeListener)
            this.props.changeListener(event.target.value);
    }

    render() {
        return (
            <select className="form-control" onBlur={this.blurEvent} onChange={this.onChangeEvent}
                    id={this.props.id}
                    value={this.state.value}>

                {
                    this.props.options.map(function (item) {
                        return (
                            <option key={_.random(0, 1000000)} value={item.value}>{item.text}</option>
                        );

                    })
                }
            </select>
        );
    }

}

DropDown.propTypes = {
    options: React.PropTypes.array.isRequired, // array of objects, object must have two keys value and text
    defaultValue : React.PropTypes.string,
    defaultText : React.PropTypes.string,
    id: React.PropTypes.string,
    blurListener: React.PropTypes.func,
    changeListener: React.PropTypes.func
};


