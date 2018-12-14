/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import PricingSlotRow from './PricingSlotRow.jsx';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getOptionsArrayForDayDropDown} from '../helpers';

class PricingSlot extends Component {

    render() {
        let optionsArray = getOptionsArrayForDayDropDown();
        let showDuplicatePriceGrids = this.props.data.length != 1 || (this.props.data.length == 1 && this.props.data[0].pricingSlot.day != 0);
        return (
            <div>
                {
                    this.props.data
                        ? this.props.data.map(function (item, index) {
                        return (
                            <div key={_.random(0, 1000000)}>
                                <PricingSlotRow position={index} data={item}
                                                showError={false} errorMessage="Duration data is invalid"
                                                options={optionsArray}
                                                showDuplicateOption={showDuplicatePriceGrids}/>
                            </div>
                        );
                    })
                        : ""
                }
            </div>
        );
    }
}

export default connect(state => state)(PricingSlot);

