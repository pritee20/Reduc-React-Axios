/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Button, Row, Col} from 'react-bootstrap';
import AddCompanyModal from './AddCompanyModal';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import {
    getCompanies,
    getTotalCompanyCount,
    getSearchSuggestions,
    clearSearchSuggestions
} from '../action';
import {GMPTable, AutocompleteSearchBox, Button as TableButton} from '../../../core';
import getTotalPages from '../selector';
import {push} from 'react-router-redux';
import {es6BindAll} from '../../helper';
import {constants} from '../../../constants';
const renderSuggestion = suggestion => (<span>{suggestion.name}</span>);

export class CompanyTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddCompanyModal: false,
            searchText: ''
        };

        es6BindAll(this, ['showAddModal', 'hideAddModal', 'fetchTheSuggestions', 'clearTheSuggestions', 'onRowSelectedListener',
            'onPageSelectedListener', 'getCompanyColumns']);
    }

    componentDidMount() {
        this.props.getTotalCompanyCount();
    }

    showAddModal() {
        this.setState({
            showAddCompanyModal: true
        })
    }

    hideAddModal() {
        this.setState({
            showAddCompanyModal: false
        });
    }

    onPageSelectedListener(page) {
        let skip = (page - 1) * 10;
        this.props.getCompanies(10, skip);
    }

    onRowSelectedListener(row) {
        var path = constants.pathConstants.PARKING + '?companyId=' + row.id;
        this.props.push(path);
    }

    fetchTheSuggestions(value) {
        this.props.getSearchSuggestions(value, false);
    }

    clearTheSuggestions() {
        this.props.clearSearchSuggestions();
    }

    // onCompanySelected(company) {
    //     let redirect = "/parking?companyId=" + company.id;
    //     this.props.push(redirect);
    // }

    getCompanyColumns() {
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
            property: 'email',
            header: {
                label: 'Email'
            }
        }, {
            property: 'contactNumber',
            header: {
                label: 'Contact Number'
            }
        }
        ]
    }

    render() {
        return (
            <ContentWrapper>
                {this.props.searchSuggestions ?
                    <AutocompleteSearchBox id="companyAutoComplete" searchSuggestions={this.props.searchSuggestions}
                                           placeholder="Enter company name to search"
                                           fetchSuggestions={this.fetchTheSuggestions}
                                           renderSuggestion={renderSuggestion}
                                           clearSuggestions={this.clearTheSuggestions} objKey="name"
                                           suggestionSelectedListener={this.onRowSelectedListener}/> : ''}
                <Row>
                    <Col lg={12}>
                        { this.props.pageCount && this.props.rows && this.props.rows.length > 0 ?
                            <GMPTable totalPages={this.props.pageCount} columns={this.getCompanyColumns()}
                                      rows={this.props.rows} rowSelected={this.onRowSelectedListener}
                                      pageSelectedListener={this.onPageSelectedListener}
                                      totalEntries={this.props.totalCompanies}
                                      showProgress={this.props.showProgress}/> : ''
                        }
                    </Col>
                    <AddCompanyModal showAddCompanyModal={this.state.showAddCompanyModal}
                                     hideAddModal={this.hideAddModal}/>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Button bsClass="btn btn-green" onClick={this.showAddModal}>Add Company</Button>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }
}


function mapStateToProps(state) {

    return {
        pageCount: getTotalPages(state),
        totalCompanies: state.manage.company.count,
        rows: state.manage.company.data,
        showProgress: state.manage.company.showProgress,
        searchSuggestions: state.manage.company.searchSuggestions
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCompanies,
        getTotalCompanyCount,
        push,
        getSearchSuggestions,
        clearSearchSuggestions
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyTable);
