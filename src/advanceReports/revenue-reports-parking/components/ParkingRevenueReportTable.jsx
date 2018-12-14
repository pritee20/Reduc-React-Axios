import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Row, Col, Panel, FormGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import {GMPTable} from  '../../../core';
import {} from '../action';
import {es6BindAll} from '../../../manage/helper';

class ParkingRevenueReportTable extends Component {

    constructor(props) {
        super(props);
        es6BindAll(this, ['getColumns', 'onRowSelected', 'getTableFooter', 'onPageSelectedListener', 'onRowSelected']);
    }

    onRowSelected(row) {
        // TODO: find out what has to be done
    }

    getColumns() {
        return [
            {
                property: 'name',
                header: {
                    label: 'Parking Name'
                }
            }, {
                property: 'in',
                header: {
                    label: 'In(count)'
                }
            },
            {
                property: 'out',
                header: {
                    label: 'Out(count)'
                }
            },
            {
                property: 'foc',
                header: {
                    label: 'FOC(count)'
                }
            },
            {
                property: 'tt',
                header: {
                    label: 'TT(count)'
                }
            },
            {
                property: 'ac',
                header: {
                    label: 'AC(count)'
                }
            },
            {
                property: 'total',
                header: {
                    label: 'Total(Rs)'
                }
            }
        ];
    }

    getTableFooter() {
        let footers = [];
        let column = this.getColumns();
        for (let index = 0; index < column.length; index++) {
            if (column[index].property !== 'name') {
                footers.push(this.props.data.footerData[column[index].property]);
            } else {
                footers.push('TOTAL');
            }
        }
        return footers;
    }

    onRowSelectedListener() {

    }

    onPageSelectedListener() {

    }

    render() {
        let totalPages = parseInt(this.props.data.data.length / 10) + 1;
        let totalEntries = this.props.data.data.length;
        return (<Panel>
            <GMPTable
                columns={this.getColumns()} totalPages={totalPages} totalEntries={totalEntries}
                showFooter={true} rowSelected={this.onRowSelectedListener}
                pageSelectedListener={this.onPageSelectedListener}
                rows={this.props.data.data}
                showProgress={false}
                footerData={this.getTableFooter()}/>
        </Panel>);
    }

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

exports.ParkingRevenueReportTable = connect(null, mapDispatchToProps)(ParkingRevenueReportTable);
