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
        
        if (this.props.changeListener){
            this.props.changeListener(event.target.value);
        }
    }

    render() {
        return (
            <select className="form-control" onBlur={this.blurEvent} onChange={this.onChangeEvent}
                    id={this.props.id}
                    value={this.props.value}>

                {
                    this.props.defaultValue && this.props.defaultText ?
                        <option key={_.random(0, 1000000)} value={this.props.defaultValue}>{this.props.defaultText}</option>
                        : ""
                }
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
    id: React.PropTypes.string,
    changeListener: React.PropTypes.func
};


