/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Grid, Row, Col, Panel, Accordion, Well, Jumbotron, Button, Tabs, Tab, Table} from 'react-bootstrap';

import ContentWrapper from '../../../components/Layout/ContentWrapper';
import {getCompany} from '../../../manage/companyHeader/action';
import {push} from 'react-router-redux';

import {
    getParkingLots,
    getParkingAreaTypes,
    getParkingTypes,
    getTicketingSystems,
    showAddParkingLotModal,
    getParkingLotsCount,
    hideProgressParkingLot,
    showProgressParkingLot,
    showEditParkingLotModal,
    parkingLotSearchSuggestionsClear
} from '../action';

import {setEditParkingLotModal} from '../parkingLotModal/actions';

import {GMPTable, AutocompleteSearchBox, Button as TableButton, ActionableSearchItem} from '../../../core';
import {constants} from '../../../constants';
import {selector} from '../selector';
import  CompanyHeader  from '../../companyHeader/components/CompanyHeader';
import {es6BindAll} from '../../helper';

import EditParkingLotModal from '../parkingLotModal/components/ParkingLotModal';
import AddParkingLotModal from './AddParkingLotModal';


export class ParkingLotTable extends Component {

    constructor(props) {
        super(props);
        this.showEditModal = this.showEditModal.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        es6BindAll(this, ['showEditModal', 'showAddModal', 'getParkingLotColumns',
            'onPageSelectedListener', 'onRowSelectedListener', 'fetchSearchSuggestions'
            , 'clearSearchSuggestions', 'renderSuggestion']);
    }


    componentDidMount() {
        if (!this.props.location) {
            this.props.getParkingLotsCount();
        } else {
            this.props.getParkingLotsCount(this.props.location.query.parkingId);
            this.props.getCompany(this.props.location.query.companyId);
        }
        this.props.getParkingTypes();
        this.props.getTicketingSystems();
        this.props.getParkingAreaTypes();
    }


    renderSuggestion(suggestion) {
        let outerThis = this;
        let clickListener = function (suggestion) {
            outerThis.props.setEditParkingLotModal(suggestion);
            outerThis.props.showEditParkingLotModal();
        };
        return (
            <ActionableSearchItem displayText={suggestion.id + " - " + suggestion.name} data={suggestion} actionListener={clickListener}
                                  actionText="Edit"/>
        );
    }

    fetchSearchSuggestions(value) {
        let parkingId = this.props.location ? (this.props.location.query ? this.props.location.query.parkingId : undefined) : undefined;
        this.props.getParkingLots(5, 0, parkingId, value);
    }

    clearSearchSuggestions() {
        this.props.parkingLotSearchSuggestionsClear();
    }


    showEditModal() {
        // TODO: show the edit modal and set the state
    }


    showAddModal() {
        this.props.showAddParkingLotModal();
    }

    onRowSelectedListener(row) {
        let path = constants.pathConstants.PARKING_SUBLOT + "?companyId=" +
            row.parkings.companyId + "&parkingId=" + row.parkingId + "&parkingLotId=" + row.id;
        this.props.push(path);
    }

    onPageSelectedListener(pageNo) {
        let skip = (pageNo - 1) * 10;
        if (this.props.location && this.props.location.query && this.props.location.query.parkingId) {
            this.props.getParkingLots(10, skip, this.props.location.query.parkingId);
        } else {
            this.props.getParkingLots(10, skip);
        }
    }


    getParkingLotColumns() {
        let outerThis = this;
        return [{
            property: 'id',
            header: {
                label: 'ID'
            }
        }, {
            property: 'name',
            header: {
                label: 'Name'
            }
        }, {
            property: 'parkingType',
            header: {
                label: 'Parking Type'
            }
        }, {
            property: 'parkingOwner',
            header: {
                label: 'Parking Owner'
            }
        }, {
            property: 'createdAt',
            header: {
                label: 'EDIT'
            },
            cell: {
                formatters: [
                    (name, args) => {
                        let onClickListener = function () {
                            outerThis.props.setEditParkingLotModal(args.rowData);
                            outerThis.props.showEditParkingLotModal();

                        };
                        return (
                            <TableButton text="Edit" stopEventPropagation={true}
                                         clickListener={onClickListener}/>
                        );
                    }
                ]
            }
        }
        ];

    }


    render() {
        return (
            <Grid fluid>
                <ContentWrapper>
                    {
                        (this.props.location && !this.props.isTab && this.props.companyData && this.props.companyData.id) ?
                            <CompanyHeader companyData={this.props.companyData} showModal={this.props.showEditCompanyModal}
                                           editCompanyData={this.props.editCompanyData}/> : ""
                    }

                        { /* START row */ }
                        <Row>
                            {this.props.parkingLotData
                            && this.props.totalParkingLots !== undefined ?
                                <Col lg={ 12 }>
                                    {
                                        this.props.isTab ?
                                            <div>
                                                <AutocompleteSearchBox id="parkingLotAutoComplete"
                                                                       searchSuggestions={this.props.parkingLotSearchSuggestions}
                                                                       placeholder="Enter parking lot name to search"
                                                                       fetchSuggestions={this.fetchSearchSuggestions}
                                                                       renderSuggestion={this.renderSuggestion}
                                                                       clearSuggestions={this.clearSearchSuggestions}
                                                                       objKey="name"
                                                                       suggestionSelectedListener={this.onRowSelectedListener}/>

                                                <GMPTable totalPages={this.props.totalPages}
                                                          totalEntries={this.props.totalParkingLots}
                                                          rows={this.props.parkingLotData}
                                                          columns={this.getParkingLotColumns()}
                                                          showProgress={this.props.showProgress}
                                                          rowSelected={this.onRowSelectedListener}
                                                          pageSelectedListener={this.onPageSelectedListener}
                                                />
                                            </div>
                                            :
                                            <Well>
                                                <AutocompleteSearchBox id="parkingLotAutoComplete"
                                                                       searchSuggestions={this.props.parkingLotSearchSuggestions}
                                                                       placeholder="Enter parking lot name to search"
                                                                       fetchSuggestions={this.fetchSearchSuggestions}
                                                                       renderSuggestion={this.renderSuggestion}
                                                                       clearSuggestions={this.clearSearchSuggestions}
                                                                       objKey="name"
                                                                       suggestionSelectedListener={this.onRowSelectedListener}/>
                                                <GMPTable totalPages={this.props.totalPages}
                                                          totalEntries={this.props.totalParkingLots}
                                                          rows={this.props.parkingLotData}
                                                          columns={this.getParkingLotColumns()}
                                                          showProgress={this.props.showProgress}
                                                          rowSelected={this.onRowSelectedListener}
                                                          pageSelectedListener={this.onPageSelectedListener}
                                                />
                                            </Well>
                                    }
                                </Col> : ''}
                            {
                                this.props.isTab ? '' :
                                    <Col lg={ 12 }>
                                        <Button onClick={this.showAddModal}>Add Parking Lot</Button>
                                    </Col>
                            }
                        </Row>
                    {
                        !this.props.isTab && this.props.companyData && this.props.companyData.id ?
                            <AddParkingLotModal show={this.props.shouldShowAddParkingLotModal}
                                                companyId={this.props.companyData.id}
                                                parkingId={this.props.location.query.parkingId}
                                                ticketingSystems={this.props.ticketingSystems}
                                                parkingTypes={this.props.parkingTypes}
                                                parkingAreaTypes={this.props.parkingAreaTypes}/> : ''
                    }
                    {this.props.shouldShowEditParkingLotModal && this.props.editParkingLotModal ?
                        <EditParkingLotModal show={this.props.shouldShowEditParkingLotModal}
                                             parkingLotData={this.props.editParkingLotModal}
                                             ticketingSystems={this.props.ticketingSystems}
                                             parkingTypes={this.props.parkingTypes}
                                             parkingAreaTypes={this.props.parkingAreaTypes}/> : ''}
                </ContentWrapper>
            </Grid>
        );
    }
}


function mapStateToProps(state) {
    return {
        parkingLotSearchSuggestions: state.manage.parkingLot.parkingLotSearchSuggestions,
        parkingLotData: state.manage.parkingLot.parkingLotData,
        companyData: state.manage.companyHeader,
        editCompanyData: state.manage.companyHeaderModal,
        showEditCompanyModal: state.manage.companyHeaderModal.showModal,
        ticketingSystems: state.manage.parkingLot.ticketingSystems,
        parkingAreaTypes: state.manage.parkingLot.parkingAreaTypes,
        showProgress: state.manage.parkingLot.showProgress,
        totalParkingLots: state.manage.parkingLot.count,
        totalPages: selector.parkingLotPages(state),
        parkingTypes: state.manage.parkingLot.parkingTypes,
        shouldShowAddParkingLotModal: state.manage.parkingLot.showAddParkingLotModal,
        shouldShowEditParkingLotModal: state.manage.parkingLot.showEditParkingLotModal,
        editParkingLotModal: state.manage.editParkingLotModal
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getParkingLots,
        getCompany,
        getParkingTypes,
        getTicketingSystems,
        getParkingAreaTypes,
        showAddParkingLotModal,
        getParkingLotsCount,
        hideProgressParkingLot,
        showProgressParkingLot,
        showEditParkingLotModal,
        setEditParkingLotModal,
        parkingLotSearchSuggestionsClear,
        push
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLotTable);

