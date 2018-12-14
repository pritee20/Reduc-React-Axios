/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {es6BindAll} from '../../helper';
import ParkingSubLotAccessListItem from './ParkingSubLotAccessListItem.jsx';
import _ from 'lodash';

class ParkingSubLotAccessList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let outerThis = this;
        return (
            <div>
                {
                    this.props.parkingSubLotAccesses ?
                        this.props.parkingSubLotAccesses.map(function (accessObject) {
                            return <ParkingSubLotAccessListItem
                                deleteClickedListener={outerThis.props.deleteClickedListener} key={_.random(0, 1000000)}
                                accessObject={accessObject}/>
                        }) : ""
                }
            </div>
        );
    }
}

export default ParkingSubLotAccessList;
