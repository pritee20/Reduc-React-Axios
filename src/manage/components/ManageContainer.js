/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import  CompanyTables  from '../company/components/CompanyTables';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import { Grid, Row, Col, Panel, Tabs, Tab } from 'react-bootstrap';
import  UserTable  from '../user/components/UserTable';
import ParkingLotTable from '../parkingLot/components/ParkingLotTable';
import {setTabState} from '../action';

class ManageContainer extends Component {

    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            key: 1
        };
    }

    componentDidMount(){
        $('body').addClass('layout-h');
    }

    handleSelect(key) {

        this.setState({
            key
        });
        console.log(this.state);
    }

    render() {

        return (
            <Grid fluid>
                <ContentWrapper>

                    { /* START row */ }
                    <Row>
                        <Col lg={ 12 }>
                            { /* START panel */ }
                            <div id="managePanel">
                                <Tabs id="manageTab" activeKey={ this.state.key }
                                      onSelect={ this.handleSelect}>

                                    <Tab eventKey={ 1 } title="Companies">
                                        <CompanyTables/>
                                    </Tab>

                                    <Tab eventKey={ 2 } title="Parking Lots">
                                        <ParkingLotTable isTab={true}/>
                                    </Tab>
                                    <Tab eventKey={ 3 } title="User">
                                        <UserTable isTab={true}/>
                                    </Tab>
                                </Tabs>
                            </div>
                            { /* END panel */ }
                        </Col>
                    </Row>
                    { /* END row */ }
                </ContentWrapper>
            </Grid>
        );
    }
}


function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setTabState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageContainer);


