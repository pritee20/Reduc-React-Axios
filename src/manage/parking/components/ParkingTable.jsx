/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {
    Component
} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import {
    getParkingsCount,
    showAddParkingModal,
    getParkings,
    getParkingCategories,
    getBookingState,
    showEditParkingModal,
    clearParkingSuggestions
} from '../action';
import {Grid, Row, Col, Well} from 'react-bootstrap';
import {getCompany} from '../../companyHeader/action';
import {setEditParkingModal} from '../parkingModal/actions';
import {es6BindAll} from '../../helper';
import {GMPTable, ProgressContainer, Button, AutocompleteSearchBox, ActionableSearchItem} from '../../../core';
import {constants} from '../../../constants';
import {selector} from '../selector';
import CompanyHeader  from '../../companyHeader/components/CompanyHeader';
import EditParkingModal from '../parkingModal/components/ParkingModal';
import AddParkingModal from './AddParkingModal';
import {fakeStore} from '../../../../src/store/fake_store';
import {push} from 'react-router-redux';

export class ParkingTable extends Component {

    constructor(props) {
        super(props);
        es6BindAll(this, ['onRowSelectedListener', 'onPageSelectedListener',
            'getParkingColumns', 'onAddParkingBtnClick', 'fetchSearchSuggestions',
            'clearSearchSuggestions', 'renderSuggestions']);
    }

    componentDidMount() {
        if (this.props.location && this.props.location.query && this.props.location.query.companyId) {
            this.props.getParkingsCount(this.props.location.query.companyId);
            this.props.getCompany(this.props.location.query.companyId);
            this.props.getBookingState();
            this.props.getParkingCategories();
        } else {

            // TODO change this to 404 page
            this.props.push(constants.pathConstants.ERROR_PATH);
        }
    }

    renderSuggestions(suggestion) {
        let outerThis = this;
        let onClickListener = function (suggestion) {
            outerThis.props.showEditParkingModal();
            outerThis.props.setEditParkingModal(suggestion);
        };

        return (<ActionableSearchItem data={suggestion} actionText="Edit" actionListener={onClickListener}
                                      displayText={suggestion.name}/>)

    }

    fetchSearchSuggestions(value) {
        this.props.getParkings(this.props.location.query.companyId, 5, 0, value);
    }

    clearSearchSuggestions() {
        this.props.clearParkingSuggestions();
    }

    onRowSelectedListener(row) {
        let path = constants.pathConstants.PARKING_LOT + "?companyId=" + row.companyId + "&parkingId=" + row.id;
        this.props.push(path);
    }

    onPageSelectedListener(pageNo) {
        let skip = (pageNo - 1) * 10;
        this.props.getParkings(this.props.location.query.companyId, 10, skip);
    }

    onAddParkingBtnClick(event) {
        this.props.showAddParkingModal();
    }

    getParkingColumns() {
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
            property: 'address',
            header: {
                label: 'Address'
            }
        }, {
            property: 'contactNumber',
            header: {
                label: 'Contact Number'
            }
        }, {
            property: 'city',
            header: {
                label: 'City'
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
                            outerThis.props.showEditParkingModal();
                            outerThis.props.setEditParkingModal(args.rowData);
                        };
                        return (
                            <Button text="Edit" stopEventPropagation={true}
                                    clickListener={onClickListener}/>
                        );
                    }
                ]
            }
        }
        ];
    }

    render() {
        const dataExists = this.props.companyData && this.props.parkingData && this.props.totalParkings != undefined &&
            this.props.companyData.id && this.props.parkingCategories && this.props.parkingBookingStates &&
            this.props.parkingCategories.length > 0 && this.props.parkingBookingStates.length > 0;
        return (
            <Grid fluid>
            <ContentWrapper>
                {dataExists ? <div>
                    {this.props.isTesting ?
                        <CompanyHeader
                            store={fakeStore({})}
                            companyData={this.props.companyData}
                            showModal={this.props.showEditCompanyModal}
                            editCompanyData={this.props.editCompanyData}/>
                        :
                        <CompanyHeader companyData={this.props.companyData} showModal={this.props.showEditCompanyModal}
                                       editCompanyData={this.props.editCompanyData}/>}
                        <Row>
                            <Col lg={ 12 }>
                                <Well>
                                    {this.props.parkingSearchSuggestions ?
                                        <AutocompleteSearchBox id="parkingAutoComplete"
                                                               searchSuggestions={this.props.parkingSearchSuggestions}
                                                               placeholder="Enter parking name to search"
                                                               fetchSuggestions={this.fetchSearchSuggestions}
                                                               renderSuggestion={this.renderSuggestions}
                                                               clearSuggestions={this.clearSearchSuggestions}
                                                               objKey="name"
                                                               suggestionSelectedListener={this.onRowSelectedListener}/> : ''}

                                    <GMPTable totalPages={this.props.totalPages} totalEntries={this.props.totalParkings}
                                              rows={this.props.parkingData} columns={this.getParkingColumns()}
                                              showProgress={this.props.showProgress}
                                              rowSelected={this.onRowSelectedListener}
                                              pageSelectedListener={this.onPageSelectedListener}
                                    />
                                </Well>
                            </Col>
                        </Row>

                    <Button text="Add New Parking" clickListener={this.onAddParkingBtnClick}/>

                    {this.props.shouldShowAddParkingModal ?
                        <AddParkingModal companyId={this.props.companyData.id}
                                         parkingBookingStates={this.props.parkingBookingStates}
                                         parkingCategories={this.props.parkingCategories}
                                         showAddParkingModal={this.props.shouldShowAddParkingModal}/> : ''}
                    {this.props.editParkingData ?
                        <EditParkingModal
                            editParkingData={this.props.editParkingData}
                            parkingBookingStates={this.props.parkingBookingStates}
                            parkingCategories={this.props.parkingCategories}
                            showEditParkingModal={this.props.shouldShowEditParkingModal}/>
                        : ''}
                </div> : <ProgressContainer show={true} message={constants.placeHolderConstants.loadingData}/>}
            </ContentWrapper>
            </Grid>
        );
    }
}


function mapStateToProps(state) {
    // console.log(JSON.stringify(state));
    return {
        parkingSearchSuggestions: state.manage.parking.parkingSearchSuggestions,
        parkingData: state.manage.parking.parkingData,
        companyData: state.manage.companyHeader,
        editCompanyData: state.manage.companyHeaderModal,
        showEditCompanyModal: state.manage.companyHeaderModal.showModal,
        totalParkings: state.manage.parking.count,
        totalPages: selector.parkingPages(state),
        showProgress: state.manage.parking.showProgress,
        parkingCategories: state.manage.parking.parkingCategories,
        parkingBookingStates: state.manage.parking.parkingBookingStates,
        shouldShowAddParkingModal: state.manage.parking.showAddParkingModal,
        editParkingData: state.manage.editParkingModal,
        shouldShowEditParkingModal: state.manage.parking.showEditParkingModal
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getParkingsCount,
        getCompany,
        getParkings,
        showAddParkingModal,
        getParkingCategories,
        getBookingState,
        setEditParkingModal,
        showEditParkingModal,
        clearParkingSuggestions,
        push
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingTable);
