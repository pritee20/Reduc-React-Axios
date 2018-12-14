/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PricingSlot from './PricingSlot.jsx';
import CreatePricingSlotsModal from './CreatePricingSlotsModal.jsx';
import {
    getPricingSlotsBySubLotId,
    createOnePricingSlotForAllDays,
    createSevenPricingSlots,
    clearPricingState
} from '../actions';
import {Button, Grid} from 'react-bootstrap';


class Pricing extends Component {

    constructor(props) {
        super(props);

        this.showNewPricingSlotsModal = this.showNewPricingSlotsModal.bind(this);
        this.hideNewPricingSlotsModal = this.hideNewPricingSlotsModal.bind(this);
        this.createSinglePricingSlotForAllDays = this.createSinglePricingSlotForAllDays.bind(this);
        this.createDifferentPricingSlotsForAllDays = this.createDifferentPricingSlotsForAllDays.bind(this);

        this.state = {
            showCreatePricingSlotModal: false
        };
    }

    showNewPricingSlotsModal() {
        this.setState({
            showCreatePricingSlotModal: true
        });
    }

    hideNewPricingSlotsModal() {
        console.log('Hello beautiful');
        this.setState({
            showCreatePricingSlotModal: false
        });

    }

    createSinglePricingSlotForAllDays() {
        this.props.createOnePricingSlotForAllDays(this.props.location.query.parkingSubLotId, this.hideNewPricingSlotsModal);
    }

    createDifferentPricingSlotsForAllDays() {
        this.props.createSevenPricingSlots(this.props.location.query.parkingSubLotId, this.hideNewPricingSlotsModal);
    }

    
    creationRequestCompletePostListener() {
        
    }
    

    componentDidMount() {
        if (this.props.pricingData && this.props.pricingData.length != 0
            && this.props.pricingData[0].pricingSlot.parkingSubLotId != this.props.location.query.parkingSubLotId) {
            this.props.clearPricingState();
        }
        this.props.getPricingSlotsBySubLotId(this.props.location.query.parkingSubLotId);
    }

    render() {
        return (
            <Grid fluid>
                <br/>
                {
                    this.props.pricingData
                        ? <PricingSlot data={this.props.pricingData}/>
                        : "No data"
                }
                {
                    this.props.pricingData && this.props.pricingData.length == 0
                        ? <Button onClick={this.showNewPricingSlotsModal}> Add new Pricing Slots</Button>
                        : ""
                }

                <CreatePricingSlotsModal show={this.state.showCreatePricingSlotModal}
                                         hideCallback={this.hideNewPricingSlotsModal}
                                         createOnePricingSlot={this.createSinglePricingSlotForAllDays}
                                         createSevenPricingSlots={this.createDifferentPricingSlotsForAllDays}/>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        pricingData: state.manage.pricing.data
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPricingSlotsBySubLotId,
        createOnePricingSlotForAllDays,
        createSevenPricingSlots,
        clearPricingState
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Pricing);
