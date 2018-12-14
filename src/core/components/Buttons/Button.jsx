/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Button as BootstrapButton} from 'react-bootstrap';

class Button extends Component {


    constructor(props) {
        super(props);
        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent(event) {
        if (this.props.stopEventPropagation) {
            event.stopPropagation();
        }
        this.props.clickListener();
    }

    render() {
        return (
            <BootstrapButton onClick={this.clickEvent}>{this.props.text}</BootstrapButton>
        );
    }
}

Button.propTypes = {
    clickListener: React.PropTypes.func,
    text: React.PropTypes.string
};

export default Button;
