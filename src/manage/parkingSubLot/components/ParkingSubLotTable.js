/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Panel, Button, Table} from 'react-bootstrap';
import {GMPTable, Button as TableButton} from '../../../core';
import {getCompany} from '../../../manage/companyHeader/action';
import {constants} from '../../../constants';
import {selector} from '../selector';
import CompanyHeader  from '../../companyHeader/components/CompanyHeader';
import EditParkingSubLotModal from '../parkingSubLotModal/components/ParkingSubLotModal';
import AddParkingSubLotModal from './AddParkingSubLotModal';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import AddNewUserModal from '../../user/userModal/components/AddNewUserModal';
import {push} from 'react-router-redux';
import {es6BindAll} from '../../helper';
import {
    getParkingSubblotCount,
    showAddParkingSubLotModal,
    showEditParkingSubLotModal,
    getCollectionModelTypes,
    getPlateNumberTypes,
    getSubLotTypes, getParkingSubLots
} from '../action';
import {showAddUserModal} from '../../user/userModal/action';
import {setEditParkingSubLotModal} from '../parkingSubLotModal/actions';

export class ParkingSubLotTable extends Component {

    constructor(props) {
        super(props);
        this.showAddParkingSubLotModal = this.showAddParkingSubLotModal.bind(this);
        this.showAddNewUserModal = this.showAddNewUserModal.bind(this);
        this.hideAddNewUserModal = this.hideAddNewUserModal.bind(this);
        es6BindAll(this, ['showAddParkingSubLotModal',
            'showAddNewUserModal', 'hideAddNewUserModal', 'getParkingSubLotColumns',
            'onRowSelectedListener', 'onPageSelectedListener']);
        this.state = {
            showEditModal: false,
            showAddModal: false,
            showAddNewUserModal: false
        };

    }

    componentDidMount() {

        if (this.props.location && this.props.location.query) {
            this.props.getCompany(this.props.location.query.companyId);
            this.props.getParkingSubblotCount(this.props.location.query.parkingLotId);
            this.props.getCollectionModelTypes();
            this.props.getPlateNumberTypes();
            this.props.getSubLotTypes();
        } else {

            // TODO change this to 404 page
            this.props.push(constants.pathConstants.ERROR_PATH);
        }
    }


    getParkingSubLotColumns() {
        let outerThis = this;
        return [{
            props: {
                colSpan: 1
            },
            property: 'id',
            header: {
                label: 'ID'
            }
        }, {
            props: {
                colSpan: 2
            },

            property: 'type',
            header: {
                label: 'SubLot Type'
            }
        }, {
            props: {
                colSpan: 1
            },
            property: 'capacity',
            header: {
                label: 'Capacity'
            }
        }, {
            props: {
                colSpan: 2
            },
            property: 'collectionModel',
            header: {
                label: 'Collection Model'
            }
        }, {
            props: {
                colSpan: 2
            },
            property: 'taxiTime',
            header: {
                label: 'Taxi Time'
            }
        }, {
            props: {
                colSpan: 2
            },
            property: 'autoCheckoutTime',
            header: {
                label: 'Auto Checkout Time'
            }
        }, {
            props: {
                colSpan: 1
            },
            property: 'autoCheckoutCost',
            header: {
                label: 'Auto Checkout Cost'
            }
        }, {
            props: {
                colSpan: 3
            },
            property: 'createdAt',
            header: {
                label: 'EDIT'
            },
            cell: {
                formatters: [
                    (name, args) => {
                        let editClickListener = function () {
                            console.log('edit button was clicked the args object is ', args);
                            outerThis.props.setEditParkingSubLotModal(args.rowData);
                            outerThis.props.showEditParkingSubLotModal();
                        };
                        let receiptContentClickListener = function () {
                            let query = outerThis.props.location.query;
                            let path = constants.pathConstants.RECEIPT_CONTENT + '?companyId='
                                + query.companyId + '&parkingId=' + query.parkingId + '&parkingLotId='
                                + query.parkingLotId + '&parkingSubLotId=' + args.rowData.id;
                            outerThis.props.push(path);
                        };

                        let pricingClickListener = function () {
                            let path = constants.pathConstants.PRICING + '?parkingSubLotId=' + args.rowData.id;
                            outerThis.props.push(path);
                        };
                        return (
                            <div>
                                <TableButton text="Edit" stopEventPropagation={true}
                                             clickListener={editClickListener}/>
                                <TableButton text="Edit Receipt Content" stopEventPropagation={true}
                                             clickListener={receiptContentClickListener}/>
                                <TableButton text="Edit Pricing" stopEventPropagation={true}
                                             clickListener={pricingClickListener}/>
                            </div>
                        );
                    }
                ]
            }
        }
        ];

    }

    onRowSelectedListener(row) {

    }

    onPageSelectedListener(pageNo) {
        let skip = (pageNo - 1) * 10;
        this.props.getParkingSubLots(10, skip, this.props.location.query.parkingLotId);
    }


    showAddParkingSubLotModal() {
        this.props.showAddParkingSubLotModal();
    }

    showAddNewUserModal() {
        this.props.showAddUserModal();
    }

    hideAddNewUserModal() {
        this.setState({
            showAddNewUserModal: false
        });
    }


    render() {
        let mobileRequiredTypes = ["NA", "Optional", "Required"];
        return (
            <Grid fluid>
                <ContentWrapper>
                    {
                        (this.props.companyData && this.props.companyData.id) ?
                            <CompanyHeader companyData={this.props.companyData} showModal={this.props.showEditCompanyModal}
                                           editCompanyData={this.props.editCompanyData}/> : ""
                    }

                        { /* START row */ }
                        <Row>
                            {this.props.totalPages && this.props.totalParkingSubLots ?
                                <Col lg={ 12 }>
                                    <Panel>
                                        <GMPTable totalPages={this.props.totalPages}
                                                  totalEntries={this.props.totalParkingSubLots}
                                                  rowClass="parking-sublot-row"
                                                  rows={this.props.parkingSubLotData}
                                                  columns={this.getParkingSubLotColumns()}
                                                  showProgress={this.props.showProgress}
                                                  rowSelected={this.onRowSelectedListener}
                                                  pageSelectedListener={this.onPageSelectedListener}/>
                                    </Panel>
                                </Col> : ''}
                            <Col lg={ 12 }>
                                <Button onClick={this.showAddParkingSubLotModal}>Add Parking Sublot</Button>
                                <Button onClick={this.showAddNewUserModal}>Add New User</Button>
                            </Col>
                        </Row>
                    {this.props.shouldShowAddParkingSubLotModal ?
                        <AddParkingSubLotModal show={this.props.shouldShowAddParkingSubLotModal}
                                               parkingLotId={this.props.location.query.parkingLotId}
                                               collectionModels={this.props.collectionModels}
                                               subLotTypes={this.props.subLotTypes}
                                               plateNumberTypes={this.props.plateNumberTypes}/> : ''}
                    {this.props.editSubLotData ?
                        < EditParkingSubLotModal show={this.props.shouldShowEditParkingSubLotModal}
                                                 editSubLotData={this.props.editSubLotData}
                                                 mobileRequiredTypes={mobileRequiredTypes}
                                                 collectionModels={this.props.collectionModels}
                                                 subLotTypes={this.props.subLotTypes}
                                                 plateNumberTypes={this.props.plateNumberTypes}/>
                        : ''}
                    {this.props.location && this.props.location.query && this.props.location.query.parkingLotId && this.props.shouldShowAddUserModal ?
                        <AddNewUserModal show={this.props.shouldShowAddUserModal}
                                         parkingLotId={this.props.location.query.parkingLotId}/> : ''}
                </ContentWrapper>
            </Grid>
        );
    }
}


function mapStateToProps(state) {
    return {
        parkingSubLotData: state.manage.parkingSubLot.parkingSubLotData,
        companyData: state.manage.companyHeader,
        editCompanyData: state.manage.companyHeaderModal,
        showEditCompanyModal: state.manage.companyHeaderModal.showModal,
        subLotTypes: state.manage.parkingSubLot.subLotTypes,
        collectionModels: state.manage.parkingSubLot.collectionModels,
        plateNumberTypes: state.manage.parkingSubLot.plateNumberTypes,
        totalPages: selector.parkingSubLotPages(state),
        totalParkingSubLots: state.manage.parkingSubLot.count,
        showProgress: state.manage.parkingSubLot.showProgress,
        shouldShowEditParkingSubLotModal: state.manage.parkingSubLot.showEditParkingSubLotModal,
        shouldShowAddParkingSubLotModal: state.manage.parkingSubLot.showAddParkingSubLotModal,
        editSubLotData: state.manage.editParkingSubLotModal,
        shouldShowAddUserModal: state.manage.editUserModal.showAddUserModal

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showAddParkingSubLotModal, getCompany, getCollectionModelTypes,
        getPlateNumberTypes,
        getSubLotTypes, getParkingSubblotCount, getParkingSubLots, push,
        showEditParkingSubLotModal,
        setEditParkingSubLotModal,
        showAddUserModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParkingSubLotTable);



