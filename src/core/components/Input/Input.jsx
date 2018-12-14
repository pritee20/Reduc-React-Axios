/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {convertType} from '../../../utils/utils.js';


class Input extends Component {

    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
    }


    onBlur(event) {
        console.log(event.target.value);
        this.props.onBlur(convertType(event.target.value));
    }

    render() {
        return (
            <div>
                <input type={this.props.valueType} defaultValue={this.props.value}
                       className={this.props.styleClass}
                       onBlur={this.onBlur}/>
            </div>);
    }

}

Input.propTypes = {
    styleClass: React.PropTypes.string.isRequired,
    onBlur: React.PropTypes.func.isRequired,
    valueType: React.PropTypes.string.isRequired
};


export default Input;

