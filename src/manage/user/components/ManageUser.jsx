/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import {es6BindAll} from '../../helper';
import {filterOldAndNewUserAccesses} from '../helper';
import {
    getUser,
    getAllUserPermissions,
    companySelected,
    parkingSelected,
    parkingLotSelected,
    parkingSubLotToggled,
    userAccessToggled,
    setFirstParkingLotOfSelectedParking,
    clearSelectedParkingSubLots,
    showAddParkingSubLotAccessProgress,
    showAddUserAccessProgress,
    hideAddParkingSubLotAccessProgress,
    hideAddUserAccessProgress,
    updateUserPermission,
    addNewSubLotAccesses,
    deleteParkingSubLotsForParticularParkingLot
} from '../actions';
import {getSearchSuggestions, clearSearchSuggestions} from '../../company/action';
import {
    getParkingSubLotAccesses,
    getParkingDropDownOptions,
    getParkingLotsDropDownOptions,
    getParkingSubLotsOptions,
    getUserAccessesOptions,
    isAddParkingSubLotAccessButtonEnabled
} from '../selectors';
import EditUserModal from './../userModal/components/EditUserModal';
import ParkingSubLotAccessList from './ParkingSubLotAccessList.jsx';
import AddUserAccessForm from './AddUserAccessForm.jsx';
import UserPermission from './UserPermission.jsx';
import UserProfile from './UserProfile.jsx';
import { Grid } from 'react-bootstrap';

class ManageUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showEditUserModal: false
        };

        es6BindAll(this, [
            'showEditUserModal',
            'hideEditUserModal',
            'fetchTheSuggestions',
            'onCompanySelected',
            'clearTheSuggestions',
            'onParkingSelected',
            'onParkingLotSelected',
            'onParkingSubLotCheckboxChanged',
            'onUserAccessCheckedboxChanged',
            'onClickUserPermissionSaveButton',
            'addNewParkingSubLotAccesses',
            'onDeleteParkingSubLotAccessForParticularParkingLot'
        ]);

    }

    componentDidMount() {
        this.props.getUser(this.props.location.query.userId, true);
        this.props.getAllUserPermissions();

    }

    showEditUserModal() {
        this.setState({
            showEditUserModal: true
        });
    }

    hideEditUserModal() {
        this.setState({
            showEditUserModal: false
        });
    }

    fetchTheSuggestions(value) {
        this.props.getSearchSuggestions(value, true);
    }

    clearTheSuggestions() {
        this.props.clearSearchSuggestions();
    }

    onCompanySelected(company) {
        this.props.companySelected(company);
        this.props.clearSelectedParkingSubLots();
        if (company.parkings && company.parkings.length > 0) {
            this.props.parkingSelected(company.parkings[0].id);
            if (company.parkings[0].parkingLots && company.parkings[0].parkingLots.length > 0) {
                this.props.parkingLotSelected(company.parkings[0].parkingLots[0].id);
            }
        }
    }

    onParkingSelected(parkingId) {
        this.props.clearSelectedParkingSubLots();
        this.props.parkingSelected(parkingId);
        this.props.setFirstParkingLotOfSelectedParking(parkingId);
    }

    onParkingLotSelected(parkingLotId) {
        this.props.clearSelectedParkingSubLots();
        this.props.parkingLotSelected(parkingLotId);

    }

    onParkingSubLotCheckboxChanged(data) {
        this.props.parkingSubLotToggled(data);
    }

    onUserAccessCheckedboxChanged(data) {
        this.props.userAccessToggled(data);
    }

    onClickUserPermissionSaveButton(event) {
        this.props.updateUserPermission(filterOldAndNewUserAccesses(this.props.user.id, this.props.userAccesses, this.props.selectedUserAccesses));
    }

    addNewParkingSubLotAccesses() {
        this.props.addNewSubLotAccesses(this.props.location.query.userId);
    }

    onDeleteParkingSubLotAccessForParticularParkingLot(accessObject) {
        this.props.deleteParkingSubLotsForParticularParkingLot(this.props.user.id, accessObject);
    }


    render() {
        const loadData = this.props.user && this.props.parkingSubLotAccesses && this.props.userAccesses && this.props.allPermissions ? true : false;

        return (
            <Grid fluid>
            <ContentWrapper>
                {loadData ? <UserProfile user={this.props.user} updateProfile={this.showEditUserModal}/> : ""}
                {loadData ? <ParkingSubLotAccessList parkingSubLotAccesses={this.props.parkingSubLotAccesses}
                                                     deleteClickedListener={this.onDeleteParkingSubLotAccessForParticularParkingLot}/> : ""}
                {loadData ? <AddUserAccessForm searchSuggestions={this.props.searchSuggestions}
                                               fetchSuggestions={this.fetchTheSuggestions}
                                               clearSuggestions={this.clearTheSuggestions}
                                               onCompanySelected={this.onCompanySelected}
                                               parkingOptions={this.props.parkingOptions}
                                               onParkingSelected={this.onParkingSelected}
                                               parkingLotOptions={this.props.parkingLotOptions}
                                               onParkingLotSelected={this.onParkingLotSelected}
                                               selectedParkingId={this.props.selectedParkingId}
                                               selectedParkingLotId={this.props.selectedParkingLotId}
                                               parkingSubLotOptions={this.props.parkingSubLotOptions}
                                               checkboxToggledListener={this.onParkingSubLotCheckboxChanged}
                                               enableAddButton={this.props.enableAddSubLotAccessButton}
                                               showProgress={this.props.showParkingSubLotAccessProgress}
                                               addAccesses={this.addNewParkingSubLotAccesses}/> : ""}
                {loadData ? <UserPermission user={this.props.user} userAccesses={this.props.userAccesses}
                                            allPermissions={this.props.allPermissions}
                                            userAccessOptions={this.props.userAccessOptions}
                                            checkboxToggledListener={this.onUserAccessCheckedboxChanged}
                                            showProgress={this.props.showUserAccessProgress}
                                            updateUserPermissionCallback={this.onClickUserPermissionSaveButton}/> : ""}
                {loadData ? <EditUserModal hideEditUserModal={this.hideEditUserModal}
                                           showEditUserModal={this.state.showEditUserModal}
                                           user={this.props.user}/> : ""}
            </ContentWrapper>
            </Grid>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.manage.user.userB2b,
        parkingSubLotAccesses: getParkingSubLotAccesses(state),
        userAccesses: state.manage.user.userB2bAccesses,
        allPermissions: state.manage.user.allPermissions,
        searchSuggestions: state.manage.user.searchSuggestions,
        parkingOptions: getParkingDropDownOptions(state),
        parkingLotOptions: getParkingLotsDropDownOptions(state),
        selectedParkingId: state.manage.user.selectedParkingId,
        selectedParkingLotId: state.manage.user.selectedParkingLotId,
        parkingSubLotOptions: getParkingSubLotsOptions(state),
        userAccessOptions: getUserAccessesOptions(state),
        enableAddSubLotAccessButton: isAddParkingSubLotAccessButtonEnabled(state),
        showUserAccessProgress: state.manage.user.showAddUserAccessProgress,
        showParkingSubLotAccessProgress: state.manage.user.showAddParkingSubLotAccessProgress,
        selectedUserAccesses: state.manage.user.selectedUserAccesses
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser,
        getAllUserPermissions,
        getSearchSuggestions,
        clearSearchSuggestions,
        companySelected,
        parkingSelected,
        parkingLotSelected,
        parkingSubLotToggled,
        userAccessToggled,
        setFirstParkingLotOfSelectedParking,
        clearSelectedParkingSubLots,
        showAddParkingSubLotAccessProgress,
        showAddUserAccessProgress,
        hideAddParkingSubLotAccessProgress,
        hideAddUserAccessProgress,
        updateUserPermission,
        addNewSubLotAccesses,
        deleteParkingSubLotsForParticularParkingLot
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
