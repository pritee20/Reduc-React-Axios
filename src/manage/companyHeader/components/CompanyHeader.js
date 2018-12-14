/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import
    React, {
    Component
} from 'react';
import {
    Grid,
    Row,
    Col,
    Panel,
    Button,
    Well
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {constants} from '../../../../src/constants';

import {getCompany} from '../action';

import EditCompanyModal from '../companyHeaderModal/components/companyHeaderModal';
import {editCompanyDispatch} from '../companyHeaderModal/actions';


class CompanyHeader extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const merchantId = "Merchant Id :" + this.props.companyData.merchantId;
        return (
            <Well>
                {this.props.companyData && this.props.companyData.id ?
                    <Row>
                        <Col lg={ 6 }>
                            <h2>{this.props.companyData.name}</h2>
                            <h4>{this.props.companyData.address}, {this.props.companyData.city}</h4>
                            <h5>{this.props.companyData.contactNumber} | {this.props.companyData.email}</h5>
                            {this.props.companyData.merchantId ?
                                <h5>{merchantId}</h5> : constants.placeHolderConstants.freechargeMerchantIdNotSet}
                        </Col>
                        <Col lg={ 6 }>
                            <Button className="pull-right" onClick={ this.props.editCompanyDispatch }>Edit</Button>
                        </Col>
                    </Row> : <div></div>}

                {this.props.editCompanyData && this.props.editCompanyData.id ?
                    <EditCompanyModal companyData={this.props.editCompanyData} showModal={this.props.showModal}/> :
                    <div></div>}
            </Well>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({editCompanyDispatch}, dispatch);
}

export default connect(null, mapDispatchToProps)(CompanyHeader);

