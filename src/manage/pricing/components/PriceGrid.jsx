/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Panel, Row, Col} from 'react-bootstrap';
import PriceGridRow from './PriceGridRow.jsx';
import _ from 'lodash';
class PriceGrid extends Component {

    render() {
        let slotIndex = this.props.slotIndex;
        let outerThis = this;
        return (
            <div>
                {
                    this.props.priceGrid && this.props.durationData && this.props.priceGrid.length != 0
                        ? <Row>
                        <Col xs={12}>
                            <Row>
                                <Col xs={3}><b>Duration</b></Col>
                                <Col xs={3}><b>Type</b></Col>
                                <Col xs={3}><b>Cost</b></Col>
                            </Row>
                        </Col>
                    </Row> : ""
                }
                <br/>
                {
                    this.props.priceGrid && this.props.durationData && this.props.priceGrid.length != 0
                        ? this.props.priceGrid.map(function (item, index) {
                        return (
                            <PriceGridRow key={_.random(0, 1000000)} priceGrid={item} slotIndex={slotIndex}
                                          gridIndex={index} errorMessage="Say something nice"
                                          showError={false}/>
                        );
                    })
                        : "No price Grid"
                }
            </div>
        );
    }
}
function mapStateToProps(state) {
    return state;
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PriceGrid);
