/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {Component} from 'react';
import {Panel, Row, Col} from 'react-bootstrap';
import PriceTableRow from './PriceTableRow.jsx';
import _ from 'lodash';
class PriceTable extends Component {

    componentDidMount() {
    }

    render() {
        console.log('price table render called');
        return (
            <div>
                <Row>
                    <Col xs={12}><h4>Price Summary : </h4></Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        {
                            this.props.priceTable
                                ? this.props.priceTable.map(function (item, index) {
                                return (
                                    <PriceTableRow key={_.random(0, 1000000)} duration={item['text']}
                                                   cost={item['cost']}/>
                                );
                            })
                                : ""
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PriceTable);

