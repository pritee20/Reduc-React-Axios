/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import
    React, {
    Component
} from 'react';
import * as Table from 'reactabular-table';
import {segmentation} from '../../../utils/utils.js';
import Pagination from './Pagination.jsx';
import {Button, ProgressContainer} from '../../../core';
import _ from 'lodash';

class GMPTable extends Component {

    constructor(props) {
        super(props);
        let outerThis = this;
        this.pageSelectedListener = this.pageSelectedListener.bind(this);
        this.onRow = this.onRow.bind(this);
        this.getRowCssClass = this.getRowCssClass.bind(this);
        this.getEntryDataText = this.getEntryDataText.bind(this);
        this.gotoSpecificPage = this.gotoSpecificPage.bind(this);
        this.setPageToView = this.setPageToView.bind(this);
        this.getRowKey = this.getRowKey.bind(this);
        this.state = {
            'pagination': {
                'page': 1,
                'segments': segmentation(outerThis.props.totalPages, 1),
                'pages': outerThis.props.totalPages
            },
            'viewPage': 1
        };
    }

    pageSelectedListener(pageNo) {
        pageNo = parseInt(pageNo);
        if (pageNo <= this.props.totalPages && pageNo > 0) {
            let outerThis = this;
            this.setState({
                'pagination': {
                    'page': pageNo,
                    'segments': segmentation(outerThis.props.totalPages, pageNo),
                    'pages': outerThis.props.totalPages
                }
            });
            this.props.pageSelectedListener(pageNo);
        }
    }

    setPageToView(event) {
        this.setState({'viewPage': event.target.value});
    }

    gotoSpecificPage() {
        this.pageSelectedListener(this.state.viewPage);
    }


    getEntryDataText() {
        let firstEntry = (this.state.pagination.page - 1) * 10 + 1;
        let lastEntry = firstEntry + this.props.rows.length - 1;
        return 'Showing entries ' + firstEntry + ' to ' + lastEntry + ' of total ' + this.props.totalEntries + ' entries';
    }


    onRow(row, {rowIndex, rowKey}) {
        let outerThis = this;
        return {
            onClick: () => {
                outerThis.props.rowSelected(row);
            }
        };
    }

    getRowCssClass() {
        if (this.props.rowClass && this.props.rowClass.length) {
            return "pure-table pure-table-striped " + this.props.rowClass;
        } else {
            return "pure-table pure-table-striped";
        }
    }

    getRowKey() {
        return (this.props.rowKey && this.props.rowKey.length > 0) ? this.props.rowKey : "id";
    }

    render() {
        let outerThis = this;
        return (
            <div>
                <row className="table-responsive">

                    <ProgressContainer type="fancy" show={this.props.showProgress} message="Fetching data"/>
                    { this.props.rows && this.props.rows.length ?
                        <Table.Provider
                            className={this.getRowCssClass()}
                            columns={this.props.columns}>
                            <Table.Header className="header"/>
                            <Table.Body rows={this.props.rows} rowKey={this.getRowKey()} onRow={this.onRow}/>
                            {
                                outerThis.props.showFooter && outerThis.props.footerData && outerThis.props.footerData.length > 0 ?
                                    <tfoot>
                                    <tr>
                                        {
                                            outerThis.props.footerData.map(function (data) {
                                                return <td key={_.random(1, 1000000)}>{data}</td>;
                                            })
                                        }
                                    </tr>
                                    </tfoot>
                                    : ''
                            }
                        </Table.Provider> : <p>No data in the table</p>
                    }
                </row>
                <div className="row">
                    <div className="col-lg-6">
                        <Pagination className="dataTabPes_paginate paging_simple_numbers"
                                    pagination={this.state.pagination}
                                    pageSelected={this.pageSelectedListener}/>
                        <p>{this.getEntryDataText()}</p>
                    </div>
                    <div className="col-lg-6">
                        <div className="float-right form-group pagify-pagination">
                            <lable className="col-lg-4 control-label" style={{padding: 7 +'px'}}>Go To Page No.</lable>
                            <div className="col-lg-6">
                                <input className="form-control" type="number" min="1" onChange={this.setPageToView}/>
                            </div>
                            <div className="col-lg-2">
                                <Button bsClass="btn btn-green" clickListener={this.gotoSpecificPage} text="Go"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

GMPTable.propTypes = {
    totalPages: React.PropTypes.number.isRequired,
    columns: React.PropTypes.array.isRequired,
    rows: React.PropTypes.array.isRequired,
    rowSelected: React.PropTypes.func.isRequired,
    pageSelectedListener: React.PropTypes.func.isRequired,
    totalEntries: React.PropTypes.number.isRequired,
    showProgress: React.PropTypes.bool.isRequired
};

export default GMPTable;
