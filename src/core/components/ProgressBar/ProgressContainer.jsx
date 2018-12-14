/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';


class ProgressContainer extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            this.props.show ? <div>
                <div className="ball-pulse text-center">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <br/>
                <p>{this.props.message}</p>
            </div>
                : <div></div>

        );
    }

}

ProgressContainer.propTypes = {
    show: React.PropTypes.bool.isRequired,
    message: React.PropTypes.string
};

export default ProgressContainer;
