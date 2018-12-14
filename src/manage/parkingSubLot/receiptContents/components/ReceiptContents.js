/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ContentWrapper from '../../../../components/Layout/ContentWrapper';
import _ from 'lodash';
import {
    Grid,
    Row,
    Col,
    Button,
    ButtonToolbar,
    Well,
    FormControl,
    FormGroup,
    InputGroup,
} from 'react-bootstrap';

import {
    getReceiptContents,
    showValuesWhenFocusGained,
    onChangeRadioButton,
    onChangeReceiptContent,
    onSubmitReceiptContent,
    deleteReceiptContent,
    deleteReceiptContentSuccess,
    addNewReceiptContent,
    toggleReceiptContent,
    showDuplicateReceiptContent
} from '../actions';

import ReceiptContentInput from '../../../../core/components/Input/ReceiptContentInput.jsx';

class ReceiptContents extends Component {

    constructor(props) {
        super(props);
        this.onFocusInReceiptContent = this.onFocusInReceiptContent.bind(this);
        this.onChangeRadioHeader = this.onChangeRadioHeader.bind(this);
        this.onChangeRadioText = this.onChangeRadioText.bind(this);
        this.onChangeRadioBold = this.onChangeRadioBold.bind(this);
        this.onChangeReceiptContent = this.onChangeReceiptContent.bind(this);
        this.onSubmitReceiptContent = this.onSubmitReceiptContent.bind(this);
        this.onClickAppendValue = this.onClickAppendValue.bind(this);
        this.onClickDeleteReceiptContent = this.onClickDeleteReceiptContent.bind(this);
        this.onClickAddNewReceiptContent = this.onClickAddNewReceiptContent.bind(this);
        this.btnClick = this.btnClick.bind(this);

    }

    componentDidMount() {
        this.props.getReceiptContents(this.props.location.query.parkingSubLotId, this.props.location.query.duplicatingFrom);
    }

    onFocusInReceiptContent(event) {
        event.preventDefault();

        let data;

        if (event.target.getAttribute('data-id') == "") {
            data = {
                key: event.target.getAttribute('data-key'),
                index: event.target.getAttribute('data-index')
            }
        } else {
            data = {
                key: event.target.getAttribute('data-key'),
                id: event.target.getAttribute('data-id')
            }
        }

        this.props.showValuesWhenFocusGained(data);
    }

    onChangeRadioHeader(event) {

        let data;

        if (event.target.getAttribute('data-id') == "") {
            data = {
                key: event.target.getAttribute('data-key'),
                index: event.target.getAttribute('data-index'),
                value: event.target.value
            }
        } else {
            data = {
                key: event.target.getAttribute('data-key'),
                id: event.target.getAttribute('data-id'),
                value: event.target.value
            }
        }

        this.props.onChangeRadioButton(data);

    }

    onChangeRadioText(event) {

        let data;

        if (event.target.getAttribute('data-id') == "") {
            data = {
                key: event.target.getAttribute('data-key'),
                index: event.target.getAttribute('data-index'),
                value: event.target.value
            }
        } else {
            data = {
                key: event.target.getAttribute('data-key'),
                id: event.target.getAttribute('data-id'),
                value: event.target.value
            }
        }

        this.props.onChangeRadioButton(data);
    }

    onChangeRadioBold(event) {

        let data;

        if (event.target.getAttribute('data-id') == "") {
            data = {
                key: event.target.getAttribute('data-key'),
                index: event.target.getAttribute('data-index'),
                value: event.target.value
            }
        } else {
            data = {
                key: event.target.getAttribute('data-key'),
                id: event.target.getAttribute('data-id'),
                value: event.target.value
            }
        }

        this.props.onChangeRadioButton(data);
    }

    onChangeReceiptContent(event) {

        let data;

        if (event.target.getAttribute('data-id') == "") {
            data = {
                key: event.target.getAttribute('data-key'),
                index: event.target.getAttribute('data-index'),
                value: event.target.value
            }
        } else {
            data = {
                key: event.target.getAttribute('data-key'),
                id: event.target.getAttribute('data-id'),
                value: event.target.value
            }
        }

        this.props.onChangeReceiptContent(data);
    }

    onClickAppendValue(event) {

        let data;

        if (event.target.getAttribute('data-id') == "") {
            data = {
                key: event.target.getAttribute('data-key'),
                index: event.target.getAttribute('data-index'),
                value: event.target.getAttribute('data-value') + " {" + event.target.value + "} "
            }
        } else {
            data = {
                key: event.target.getAttribute('data-key'),
                id: event.target.getAttribute('data-id'),
                value: event.target.getAttribute('data-value') + " {" + event.target.value + "} "
            }
        }

        this.props.onChangeReceiptContent(data);
    }

    onClickDeleteReceiptContent(event) {

        let data;

        if (event.target.previousSibling.getAttribute('data-id') == "") {

            data = {
                key: event.target.previousSibling.getAttribute('data-key'),
                index: event.target.previousSibling.getAttribute('data-index')
            };

        } else {

            data = {
                key: event.target.previousSibling.getAttribute('data-key'),
                id: event.target.previousSibling.getAttribute('data-id')
            };

        }

        this.props.deleteReceiptContent(data);

    }

    onClickAddNewReceiptContent(event) {
        this.props.addNewReceiptContent({key: event.target.value}, this.props.location.query.parkingSubLotId, this.props.sequencedReceiptContents);
    }

    onSubmitReceiptContent(event) {
        event.preventDefault();
        this.props.onSubmitReceiptContent(this.props.sequencedReceiptContents, this.props.location.query.companyId, this.props.location.query.parkingId, this.props.location.query.parkingLotId, this.props.location.query.parkingSubLotId, this.props.location.query.duplicatingFrom);
    }

    btnClick(event) {
        this.props.showDuplicateReceiptContent(this.props.location.query.companyId, this.props.location.query.parkingId, this.props.location.query.parkingLotId, this.props.location.query.parkingSubLotId);
    }


    render() {

        let outerThis = this;

        return (
            <Grid fluid>
                <ContentWrapper>
                    <Well>
                        <Row>
                            <Col lg={ 6 }>
                                <h2>Edit Receipt Content</h2>
                            </Col>
                            <Col lg={ 6 }>
                                {
                                    outerThis.props.location.query.duplicatingFrom == undefined ?
                                        <Button className="pull-right" onClick={outerThis.btnClick}>Duplicate
                                            From</Button>
                                        : ""
                                }
                            </Col>
                        </Row>
                    </Well>
                    <Well>
                        <form onSubmit={outerThis.onSubmitReceiptContent}>
                            <Row>
                                <Col lg={ 12 }>
                                    <FormGroup>
                                        <label className="col-lg-2 control-label">Parking Sublot ID</label>
                                        <Col lg={ 10 }>
                                            <FormControl type="text" placeholder="Parking Sub Lot ID"
                                                         className="form-control"
                                                         defaultValue={outerThis.props.location.query.parkingSubLotId}
                                                         disabled/>
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr/>
                            {

                                this.props.receiptContents ?
                                    Object.keys(this.props.receiptContents).map(function (value, index) {
                                        return (
                                            <Grid fluid key={index}>
                                                <Row>
                                                    <Col lg={ 12 }>
                                                        <FormGroup>
                                                            <label className="col-lg-2 control-label">{value}</label>
                                                            <Col lg={ 10 } className="sortable" data-key={value}>
                                                                {
                                                                    outerThis.props.receiptContents[value].map(function (receiptContent, index) {

                                                                        return (

                                                                            <ReceiptContentInput index={index} value={value} key={index}
                                                                                 receiptContent={receiptContent}
                                                                                 onFocusInReceiptContent={outerThis.onFocusInReceiptContent}
                                                                                 onChangeReceiptContent={outerThis.onChangeReceiptContent}
                                                                                 onClickDeleteReceiptContent={outerThis.onClickDeleteReceiptContent}
                                                                                 onChangeRadioHeader={outerThis.onChangeRadioHeader}
                                                                                 onChangeRadioText={outerThis.onChangeRadioText}
                                                                                 onChangeRadioBold={outerThis.onChangeRadioBold}
                                                                                 valuesToAppend={outerThis.props.valuesToAppend}
                                                                                 onClickAppendValue={outerThis.onClickAppendValue}/>
                                                                        )
                                                                    })
                                                                }
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <label className="col-lg-2 control-label"></label>
                                                            <Col lg={ 10 }>
                                                                <Button bsStyle="primary" bsSize="small" value={value}
                                                                        onClick={outerThis.onClickAddNewReceiptContent}>
                                                                    Add New
                                                                </Button>
                                                            </Col>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </Grid>
                                        )

                                    }) : ""
                            }
                            <Row>
                                <Col lg={ 12 }>
                                    <FormGroup>
                                        <label className="col-lg-2 control-label"></label>
                                        <Col lg={ 10 }>
                                            <Button type="submit" bsStyle="primary" bsSize="small">
                                                Save Changes
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </form>
                    </Well>
                </ContentWrapper>
            </Grid>
        )
    }
}


function mapStateToProps(state) {
    
    return {
        receiptContents: state.manage.receiptContent.receiptContents,
        valuesToAppend: state.manage.receiptContent.valuesToAppend,
        sequencedReceiptContents: state.manage.receiptContent.sequencedReceiptContents
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getReceiptContents,
        showValuesWhenFocusGained,
        onChangeRadioButton,
        onChangeReceiptContent,
        onSubmitReceiptContent,
        deleteReceiptContent,
        deleteReceiptContentSuccess,
        addNewReceiptContent,
        toggleReceiptContent,
        showDuplicateReceiptContent
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptContents);


