/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Row, Col, FormControl, FormGroup, InputGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    setGridCost,
    setGridDuration,
    setGridStructure,
    updatePricingTable,
    priceGridsHaveBeenChanged,
    deletePriceGrid
} from '../actions';
import {convertType} from '../../../utils/utils.js';
import {DropDown, Button, Input} from './../../../core';

class PriceGridRow extends Component {

    constructor(props) {
        super(props);
        this.onCostChange = this.onCostChange.bind(this);
        this.onPriceStructureSet = this.onPriceStructureSet.bind(this);
        this.setStateToHideError = this.setStateToHideError.bind(this);
        this.setStateToShowError = this.setStateToShowError.bind(this);
        this.onDurationBlurred = this.onDurationBlurred.bind(this);
        this.deletePriceGrid = this.deletePriceGrid.bind(this);
        let outerThis = this;

        this.state = {
            errorMessage: outerThis.props.errorMessage,
            showError: outerThis.props.showError
        };

    }


    setStateToHideError() {
        console.log('set state to hide error');
        this.setState({
            showError: false
        });
    }

    setStateToShowError(errorMessage) {
        this.setState({
            showError: true,
            errorMessage
        });

    }

    onCostChange(event) {
        let newVal = convertType(event.target.value);
        console.log(newVal);
        this.props.setGridCost(this.props.slotIndex, this.props.gridIndex, newVal);
        this.props.priceGridsHaveBeenChanged(this.props.slotIndex);
        return true;
    }

    onDurationBlurred(value) {
        console.log('duration value is ', value);
        if (value > 0 && value <= 1440) {
            this.setStateToHideError();
            this.props.setGridDuration(this.props.slotIndex, this.props.gridIndex, value);
            this.props.priceGridsHaveBeenChanged(this.props.slotIndex);
        } else {
            this.setStateToShowError('Invalid value of duration');
        }
    }

    onPriceStructureSet(value) {
        console.log(' price Structure value ', value);
        this.props.setGridStructure(this.props.slotIndex, this.props.gridIndex, value);
        this.props.priceGridsHaveBeenChanged(this.props.slotIndex);
    }

    deletePriceGrid() {
        if (confirm("Are you sure you want to delete the price grid")) {
            this.props.deletePriceGrid(this.props.slotIndex, this.props.gridIndex);
        }
    }


    render() {
        let startTimeDatePickerId = 'openTime' + this.props.slotIndex + "" + this.props.gridIndex;
        let endTimeDatePickerId = 'endTime' + this.props.slotIndex + "" + this.props.gridIndex;
        let firstOption = {"value": "INCREMENTAL", "text": "Incremental"};
        let secondOption = {"value": "FLAT", "text": "Flat"};
        let options = [firstOption, secondOption];
        return (
            <div>
                {
                    this.props.priceGrid
                        ?
                        <div>
                            <Row>
                                <Col xs={12}>
                                    <Row>
                                        <Col xs={3}>
                                            <Input valueType="number" styleClass="form-control"
                                                   onBlur={this.onDurationBlurred}
                                                   value={this.props.priceGrid.duration}/>
                                        </Col>
                                        <Col xs={3}>
                                            <DropDown options={options} blurListener={this.onPriceStructureSet}
                                                      value={this.props.priceGrid.priceStructure}
                                            />
                                        </Col>
                                        <Col xs={3}><input type="number" defaultValue={this.props.priceGrid.cost}
                                                           className="form-control"
                                                           onBlur={this.onCostChange}/></Col>
                                        <Col xs={3}>
                                            <Button clickListener={this.deletePriceGrid} text="Delete Price Grid"/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <br/>
                            {
                                this.state.showError
                                    ? <p>{this.state.errorMessage}</p>
                                    : ""
                            }
                        </div>
                        : "No data"

                }

            </div>
        );
    }
}

PriceGridRow.propTypes = {
    priceGrid: React.PropTypes.object.isRequired,
    showError: React.PropTypes.bool.isRequired,
    errorMessage: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {};
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setGridCost,
        setGridDuration,
        setGridStructure,
        updatePricingTable,
        priceGridsHaveBeenChanged,
        deletePriceGrid
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PriceGridRow);
