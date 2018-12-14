/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {Table} from 'react-bootstrap';


class Datatable extends Component {


    render() {
        return (
            <Table id={this.props.id} responsive striped>
                <thead>
                <tr>
                    {
                        this.props.rows.map(function (item) {
                            return (
                                <th key={item.name} style={item.style}>{item.name}</th>
                            )
                        })
                    }
                </tr>
                </thead>
                <tbody></tbody>
            </Table>
        );
    }
}

Datatable.propTypes = {
    id: React.PropTypes.string.isRequired,
    rows: React.PropTypes.array.isRequired
};

export default Datatable;