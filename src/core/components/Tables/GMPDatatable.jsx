/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import _ from 'lodash';

class GMPDatatable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataTable : ""
        }
    }

    componentDidMount(){
        this.setState({
            dataTable : $(`#${this.props.tableId}`).DataTable({
                data: this.props.reportData,
                columns: this.props.columnData,
                paging:   false,
                info:     false,
                searching: false,
                order : []

            })
        });

    }

    componentWillReceiveProps(nextProps){
        this.state.dataTable.destroy();
        this.setState({
            dataTable : $(`#${nextProps.tableId}`).DataTable({
                data: nextProps.reportData,
                columns: nextProps.columnData,
                paging:   false,
                info:     false,
                searching: false,
                order: []
            })
        });

    }

    render() {
        return (
            <Table id={this.props.tableId} className="display" cellSpacing="0" width="100%">
                {
                    this.props.headerData ?
                        <thead>
                            <tr>
                            {
                                this.props.headerData.map(function(header){
                                    return (
                                        <th key={_.random(0, 1000000)}>
                                            {header.text}
                                            {
                                                header.subText 
                                                    ? <span>{header.subText}</span>
                                                    : ""
                                                    
                                            }
                                            
                                        </th>
                                    )
                                })
                            }
                            </tr>
                        </thead>
                        : ""
                }
                {
                    this.props.footerData ?
                        <tfoot>
                            <tr>
                                {
                                    this.props.footerData.map(function(footer){
                                        return (
                                            <th key={_.random(0, 1000000)}>{footer.text}</th>
                                        )
                                    })
                                }
                            </tr>
                        </tfoot>
                        : ""
                }
                <tbody></tbody>
            </Table>
        );
    }
}

GMPDatatable.propTypes = {
    tableId : React.PropTypes.string.isRequired,
    headerData : React.PropTypes.array.isRequired,
    footerData : React.PropTypes.array
};

export default GMPDatatable;
