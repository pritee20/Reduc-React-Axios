/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import {AutocompleteSearchBox, GMPTable, Button as TableButton} from '../../../core';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import AddNewUserModal from './../userModal/components/AddNewUserModal';
import {constants} from '../../../constants';
import {push} from 'react-router-redux';
import {getUserB2BTablePages} from '../selectors';
import {es6BindAll} from '../../helper';
import {getUsers, getUserCount, showProgressUserB2BTable, clearUserSearchSuggestions} from '../actions';
import {showAddUserModal, showEditUserModal} from '../userModal/action';

export class UserTable extends Component {

    constructor(props) {
        super(props);
        es6BindAll(this, ['showAddUserModal', 'getUserB2BColumnData', 'onRowSelectedListener',
            'onPageSelectedListener', 'fetchSearchSuggestions', 'clearSearchSuggestions', 'renderSuggestions']);
    }

    renderSuggestions(suggestion) {
        return (<span>{suggestion.username}</span>);
    }

    getUserB2BColumnData() {

        return [{
            property: 'username',
            header: {
                label: 'USER NAME'
            }
        }, {
            property: 'name',
            header: {
                label: 'NAME'
            }
        }, {
            property: 'contactNumber',
            header: {
                label: 'Contact Number'
            }
        }
            //     , {
            //     property: 'createdAt',
            //     header: {
            //         label: 'EDIT'
            //     },
            //     cell: {
            //         formatters: [
            //             (name, args) => {
            //                 let editClickListener = function () {
            //                     console.log('edit button was clicked the args object is ', args);
            //                 };
            //                 return (
            //                     <TableButton text="Edit" stopEventPropagation={true}
            //                                  clickListener={editClickListener}/>
            //                 );
            //             }
            //         ]
            //     }
            // }
        ];
    }

    componentDidMount() {
        this.props.showProgressUserB2BTable();
        this.props.getUserCount();
    }


    showAddUserModal() {
        this.props.showAddUserModal();
    }

    onRowSelectedListener(row) {
        let path = constants.pathConstants.USER + '?userId=' + row.username;
        this.props.push(path);
    }


    fetchSearchSuggestions(value) {
        this.props.getUsers(5, 0, value);
    }

    clearSearchSuggestions() {
        this.props.clearUserSearchSuggestions();
    }

    onPageSelectedListener(pageNo) {
        let skip = (pageNo - 1) * 10;
        this.props.showProgressUserB2BTable();
        this.props.getUsers(10, skip);
    }


    render() {

        return (
            <ContentWrapper>
                {this.props.pageCount && this.props.userB2BData ?
                    <Row>
                        {
                            this.props.userSearchSuggestions ?
                                <Col lg={ 12 }>
                                    <AutocompleteSearchBox
                                        id="parkingLotAutoComplete"
                                        searchSuggestions={this.props.userSearchSuggestions}
                                        placeholder="Enter username to search"
                                        fetchSuggestions={this.fetchSearchSuggestions}
                                        renderSuggestion={this.renderSuggestions}
                                        clearSuggestions={this.clearSearchSuggestions} objKey="username"
                                        suggestionSelectedListener={this.onRowSelectedListener}
                                    />
                                </Col>
                            : ''
                        }
                        <Col lg={ 12 }>

                            <GMPTable totalPages={this.props.pageCount}
                                      totalEntries={this.props.totalUserB2Bs}
                                      rows={this.props.userB2BData} columns={this.getUserB2BColumnData()}
                                      showProgress={this.props.shouldShowDataFetchProgress}
                                      rowSelected={this.onRowSelectedListener}
                                      pageSelectedListener={this.onPageSelectedListener}
                                      rowKey="username"
                            />
                        </Col>
                    </Row>
                    : ''}
                <Button onClick={this.showAddUserModal}>Add New User</Button>
                {
                    this.props.shouldShowAddUserModal ?
                    <AddNewUserModal
                        show={this.props.shouldShowAddUserModal}
                    /> : ''
                }
            </ContentWrapper>
        );
    }
}


function mapStateToProps(state) {
    return {
        userSearchSuggestions: state.manage.user.userB2BSearchSuggestions,
        shouldShowAddUserModal: state.manage.editUserModal.showAddUserModal,
        pageCount: getUserB2BTablePages(state),
        userB2BData: state.manage.user.userB2BData,
        totalUserB2Bs: state.manage.user.count,
        shouldShowDataFetchProgress: state.manage.user.userB2BDataFetchProgress

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers,
        getUserCount,
        push,
        showAddUserModal,
        showEditUserModal,
        showProgressUserB2BTable,
        clearUserSearchSuggestions
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
