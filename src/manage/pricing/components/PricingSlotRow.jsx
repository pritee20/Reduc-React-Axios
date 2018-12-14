/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import PriceGrid from './PriceGrid.jsx';
import PriceTable from './PriceTable.jsx';
import {Panel, Row, Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    updatePriceGrid,
    deletePriceGrids,
    createNewPriceGrid,
    hideAddPriceGridButton,
    deletePricingSlot
} from '../actions';
import {isPriceGridDataInValid, getOptionsArrayForDayDropDown, convertNumericDayToString} from '../helpers';
import {DropDown, Button, ProgressContainer} from './../../../core';
class PricingSlotRow extends Component {

    constructor(props) {
        super(props);
        this.copyPriceGridsBtnClick = this.copyPriceGridsBtnClick.bind(this);
        this.dayOfTheWeekSelected = this.dayOfTheWeekSelected.bind(this);
        this.createNewPriceGridForPricingSlot = this.createNewPriceGridForPricingSlot.bind(this);
        let outerThis = this;
        this.showProgressIndicator = this.showProgressIndicator.bind(this);
        this.hideProgressIndicator = this.hideProgressIndicator.bind(this);
        this.deletePricingSlot = this.deletePricingSlot.bind(this);
        this.state = {
            errorMessage: outerThis.props.errorMessage,
            showError: outerThis.props.showError,
            showProgress: false
        };
    }

    onSlotUpdateClick(event) {
        let validityObject = isPriceGridDataInValid(this.props.data.pricingSlot.priceGrids, this.props.data.durationData);
        if (validityObject.invalid) {
            this.setState({
                showError: true,
                errorMessage: validityObject.message
            });
        } else {
            this.setState({
                showError: false
            });
            this.showProgressIndicator();
            this.props.updatePriceGrid(this.props.position, this.hideProgressIndicator);
        }
    }

    showProgressIndicator() {
        this.setState({showProgress: true});
    }

    hideProgressIndicator() {
        this.setState({showProgress: false});
    }

    copyPriceGridsBtnClick() {
        let selectId = 'selectedDay' + this.props.position;
        let e = document.getElementById(selectId);
        let selectedDay = e.options[e.selectedIndex].value;
        this.showProgressIndicator();
        this.props.deletePriceGrids(this.props.position, selectedDay, this.hideProgressIndicator);
    }

    dayOfTheWeekSelected(value) {
    }

    deletePricingSlot() {
        if (confirm("Are you sure you want to delete pricing slot")) {
            console.log('pricing slot position is ', this.props.position);
            this.setState({
                showProgress: true,
                errorMessage: "Deleting pricing slot don't touch anything"
            });
            this.props.deletePricingSlot(this.props.position, this.hideProgressIndicator);
        }
    }

    createNewPriceGridForPricingSlot() {
        this.showProgressIndicator();
        let outerThis = this;
        let postUpdateListener = function () {
            outerThis.props.hideAddPriceGridButton(outerThis.props.position);
            outerThis.hideProgressIndicator();
        };
        let postNewPriceGridCreatedListener = function () {
            outerThis.props.updatePriceGrid(outerThis.props.position, postUpdateListener);
        };
        this.props.createNewPriceGrid(this.props.position, postNewPriceGridCreatedListener);
    }

    render() {
        let outerThis = this;
        let selectId = 'selectedDay' + this.props.position;
        let newOptions = this.props.options.filter(function (item) {
            return item.value != outerThis.props.data.pricingSlot.day;
        });
        let numericDay = parseInt(outerThis.props.data.pricingSlot.day);
        let dayText = convertNumericDayToString(numericDay);
        return (
            <div>
                <Panel>
                    <Row>
                        <Col xs={3}>
                            {
                                this.props.data
                                    ?
                                    <p>Pricing Slot For the
                                        day {dayText}</p>
                                    : ""
                            }
                        </Col>
                        <Col xs={3}>
                            {
                                this.props.data
                                    ?
                                    <p>Total duration {outerThis.props.data.durationData}</p>
                                    : ""
                            }
                        </Col>
                        <Col xs={4}/>
                        <Col xs={2}>
                            <Button clickListener={this.deletePricingSlot} text="Delete price slot"/>
                        </Col>

                    </Row>

                    <Row>
                        <Col xs={9}>
                            {
                                this.props.data.pricingSlot && this.props.data.pricingSlot.priceGrids && this.props.data.durationData && this.props.data.pricingSlot.priceGrids.length != 0
                                    ? <PriceGrid priceGrid={this.props.data.pricingSlot.priceGrids}
                                                 slotIndex={this.props.position}
                                                 durationData={this.props.data.durationData}/>
                                    : "No price grids data"
                            }
                        </Col>
                        <Col xs={3}>
                            {
                                this.props.data.priceTable && this.props.data.priceTable.length != 0
                                    ? ""
                                    // <PriceTable priceTable={this.props.data.priceTable}/>
                                    : ""
                            }
                        </Col>
                    </Row>
                    {
                        this.props.data.showAddPriceGridOption
                            ? <Row>
                            <Button clickListener={this.createNewPriceGridForPricingSlot} text="Add new price grid"/>
                        </Row>
                            : ""
                    }
                    {
                        this.props.data.pricingSlot && this.props.data.pricingSlot.priceGrids
                        && this.props.data.pricingSlot.priceGrids.length != 0
                            ?
                            <Row>
                                <Button clickListener={this.onSlotUpdateClick.bind(this, this.props)}
                                        text="Update Pricing Grids"/>
                            </Row>
                            : ""
                    }
                    {
                        this.props.showDuplicateOption
                            ?
                            <Row>
                                <Col xs={3}>
                                    <p>Delete existing price grids and copy data from </p>
                                    <DropDown
                                        id={selectId}
                                        value={this.props.data.pricingSlot.day + ''}
                                        options={newOptions}
                                        blurListener={this.dayOfTheWeekSelected}
                                    />
                                    <br/>
                                    <Button clickListener={this.copyPriceGridsBtnClick} text="GO"/>
                                </Col>
                                <Col xs={9}/>
                            </Row>
                            : ""
                    }
                    {
                        this.state.showError ? <p>{this.state.errorMessage}</p>
                            : ""
                    }
                    <ProgressContainer type="fancy" show={this.state.showProgress} message="Making request"/>
                </Panel>
            </div>
        );
    }
}

PricingSlotRow.propTypes = {
    showError: React.PropTypes.bool.isRequired,
    errorMessage: React.PropTypes.string.isRequired
};


function mapStateToProps(state) {
    return state;
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updatePriceGrid,
        deletePricingSlot,
        createNewPriceGrid,
        deletePriceGrids,
        hideAddPriceGridButton
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PricingSlotRow);
