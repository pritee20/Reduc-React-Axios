/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import React, {Component} from 'react';
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

class ReceiptContentInput extends Component {


    constructor(props) {
        super(props);

        this.onKeyDownEvent = this.onKeyDownEvent.bind(this);

        this.state = {
            position: 0
        }
    }

    onKeyDownEvent(event) {
        console.log(this.props);
        if (event.target && event.target.selectionStart !== undefined) {
            this.setState({
                position: event.target.selectionStart
            })
        }
    }

    render() {
        let outerThis = this;
        return (
            <div data-index={this.props.index}
                      data-key={this.props.value}>

                <InputGroup>
                    <InputGroup.Addon
                        className="fa fa-reorder fa-fw text-muted mr-lg"></InputGroup.Addon>
                    <FormControl type="text"
                                 className="form-control"
                                 id={`receipt-content-input${this.props.receiptContent.id}`}
                                 placeholder="Receipt Content"
                                 value={this.props.receiptContent.content}
                                 onFocus={this.props.onFocusInReceiptContent}
                                 data-key={this.props.value}
                                 data-id={this.props.receiptContent.id}
                                 data-value={this.props.receiptContent.content}
                                 data-index={this.props.index}
                                 onKeyDown={this.onKeyDownEvent}
                                 onClick={this.onKeyDownEvent}
                                 onKeyPress={this.onKeyDownEvent}
                                 onMouseUp={this.onKeyDownEvent}
                                 onKeyUp={this.onKeyDownEvent}
                                 onChange={this.props.onChangeReceiptContent}
                    />
                    <InputGroup.Addon
                        className="fa fa-trash-o fa-fw text-muted mr-lg"
                        onClick={this.props.onClickDeleteReceiptContent}></InputGroup.Addon>
                </InputGroup>
                <br />
                {
                    this.props.receiptContent.show === true ?

                        <fieldset>
                            <label
                                className="radio-inline c-radio">
                                <input
                                    id={`inlineradio${this.props.receiptContent.id}`}
                                    type="radio"
                                    name={`radio-${this.props.receiptContent.id}`}
                                    value="HEADER"
                                    checked={this.props.receiptContent.styleMasterTitle == "HEADER"}
                                    onChange={this.props.onChangeRadioHeader}
                                    data-key={this.props.value}
                                    data-id={this.props.receiptContent.id}
                                    data-index={this.props.index}
                                />
                                <em className="fa fa-circle"></em>HEADER
                            </label>
                            <label
                                className="radio-inline c-radio">
                                <input
                                    id={`inlineradio${this.props.receiptContent.id}`}
                                    type="radio"
                                    name={`radio-${this.props.receiptContent.id}`}
                                    value="TEXT"
                                    checked={this.props.receiptContent.styleMasterTitle == "TEXT"}
                                    onChange={this.props.onChangeRadioText}
                                    data-key={this.props.value}
                                    data-id={this.props.receiptContent.id}
                                    data-index={this.props.index}
                                />
                                <em className="fa fa-circle"></em>TEXT
                            </label>
                            <label
                                className="radio-inline c-radio">
                                <input
                                    id={`inlineradio${this.props.receiptContent.id}`}
                                    type="radio"
                                    name={`radio-${this.props.receiptContent.id}`}
                                    value="BOLD"
                                    checked={this.props.receiptContent.styleMasterTitle == "BOLD"}
                                    onChange={this.props.onChangeRadioBold}
                                    data-key={this.props.value}
                                    data-id={this.props.receiptContent.id}
                                    data-index={this.props.index}
                                />
                                <em className="fa fa-circle"></em>BOLD
                            </label>
                            <div>
                                <ButtonToolbar>

                                    {
                                        this.props.valuesToAppend ?
                                            this.props.valuesToAppend.map(function (textValue, index) {
                                                return (
                                                    <Button
                                                        bsStyle="warning"
                                                        bsSize="xsmall"
                                                        key={index}
                                                        onClick={outerThis.props.onClickAppendValue}
                                                        value={textValue}
                                                        data-key={outerThis.props.value}
                                                        data-id={outerThis.props.receiptContent.id}
                                                        data-index={outerThis.props.index}
                                                        data-value={outerThis.props.receiptContent.content}>{textValue}</Button>
                                                )
                                            }) : ""

                                    }

                                </ButtonToolbar>
                                <p>Cursor position : {this.state.position}</p>
                                <p>Total Length
                                    : {this.props.receiptContent.content ? this.props.receiptContent.content.length : "0"}</p>
                            </div>

                        </fieldset>

                        : ''
                }

            </div>
        );
    }
}

export default ReceiptContentInput;
