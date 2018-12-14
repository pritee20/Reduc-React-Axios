/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';

class BasePage extends React.Component {

    render() {
        return (
            <div className="wrapper">
                {this.props.children}
            </div>
        );
    }

}

export default BasePage;
