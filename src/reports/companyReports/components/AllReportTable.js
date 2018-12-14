/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'react-bootstrap';
import { initializeDataTable, reappendData, processUserSumReports } from '../helpers';

/**
 * React Component for rendering reports
 */
class AllReportTable extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        initializeDataTable(this.props.companyReports);
    }

    componentWillReceiveProps(nextProps){
        reappendData(nextProps.companyReports);
    }

    render(){
        return(
            <Row>
                <Col lg={12}>
                    <Table id="companyReports" responsive striped>
                        <thead>
                        <tr>
                            <th>Vehicle Type</th>
                            <th>In<em>(Count)</em></th>
                            <th>Out<em>(Count)</em></th>
                            <th>FOC<em>(Count)</em></th>
                            <th>TT<em>(Count)</em></th>
                            <th>AC<em>(Count)</em></th>
                            <th>Total<em>(Rs.)</em></th>
                        </tr>
                        </thead>
                    </Table>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        userAccess: state.user.userAccessNamed
    };
}

export default connect(mapStateToProps)(AllReportTable);
