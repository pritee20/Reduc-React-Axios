/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';

const initialState = {
    receiptContents: {},
    valuesToAppend: [
        "FEED",
        "SUB_LOT_TYPE",
        "REGISTRATION_NUMBER",
        "DATE",
        "COST",
        "CHECKED_IN_TIME",
        "CHECKED_OUT_TIME",
        "BARCODE",
        "DURATION"
    ],
    sequencedReceiptContents: {},
    showModal: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actionType.GET_RECEIPT_CONTENTS_SUCCESS:
        {
            return (
                Object.assign({}, state, {
                    receiptContents: action.payload,
                    sequencedReceiptContents: action.payload
                })
            );
        }
        case actionType.SHOW_VALUES_WNEN_FOCUS_GAINED:
        {

            state.receiptContents[action.payload.key].map(function (value, index) {
                if (action.payload.index) {

                    if (parseInt(action.payload.index) === index) {
                        value.show = true;
                    } else {
                        value.show = false;
                    }
                }

                if (action.payload.id) {

                    if (action.payload.id == value.id) {
                        value.show = true;
                    } else {
                        value.show = false;
                    }
                }

            });

            let newReceiptContent = JSON.parse(JSON.stringify(state.receiptContents));

            return (
                Object.assign({}, state, {
                    receiptContents: newReceiptContent,
                    sequencedReceiptContents: newReceiptContent
                })
            );
        }
        case actionType.ON_CHANGE_RADIO_BUTTON:
        {

            state.receiptContents[action.payload.key].map(function (value, index) {

                if (action.payload.index) {

                    if (parseInt(action.payload.index) == index) {
                        value.styleMasterTitle = action.payload.value;
                    }
                }

                if (action.payload.id) {
                    if (action.payload.id == value.id) {
                        value.styleMasterTitle = action.payload.value;
                    }
                }

            });

            let newReceiptContent = JSON.parse(JSON.stringify(state.receiptContents));

            return (
                Object.assign({}, state, {
                    receiptContents: newReceiptContent,
                    sequencedReceiptContents: newReceiptContent
                })
            );

        }
        case actionType.ON_CHANGE_RECEIPT_CONTENT:
        {

            state.receiptContents[action.payload.key].map(function (value, index) {

                if (action.payload.index) {

                    if (parseInt(action.payload.index) == index) {
                        value.content = action.payload.value
                    }
                }

                if (action.payload.id) {

                    if (action.payload.id == value.id) {
                        value.content = action.payload.value;
                    }
                }

            });

            let newReceiptContent = JSON.parse(JSON.stringify(state.receiptContents));

            return (
                Object.assign({}, state, {
                    receiptContents: newReceiptContent,
                    sequencedReceiptContents: newReceiptContent
                })
            );

        }
        case actionType.ON_CHANGE_RECEIPT_CONTENT_SEQUENCE:
        {

            let sortedReceiptContent = [];

            sortedReceiptContent.length = action.payload.sequence.length;

            action.payload.sequence.map(function (value, index) {
                sortedReceiptContent[index] = state.sequencedReceiptContents[action.payload.key][value];
            });

            let newReceiptContent = JSON.parse(JSON.stringify(state.sequencedReceiptContents));

            newReceiptContent[action.payload.key] = sortedReceiptContent;

            console.log(newReceiptContent);

            return (
                Object.assign({}, state, {
                    sequencedReceiptContents: newReceiptContent
                })
            );

        }
        case actionType.DELETE_RECEIPT_CONTENT:
        {

            let newReceiptContent = JSON.parse(JSON.stringify(state.receiptContents));

            for (var i = 0; i < newReceiptContent[action.payload.key].length; i++) {

                if (action.payload.index) {
                    let indexToBeDeleted = parseInt(action.payload.index);
                    newReceiptContent[action.payload.key].splice(indexToBeDeleted, 1);
                    break;
                }

                if (action.payload.id) {
                    if (action.payload.id == newReceiptContent[action.payload.key][i].id) {
                        newReceiptContent[action.payload.key].splice(i, 1);
                        break;
                    }
                }
            }


            return (
                Object.assign({}, state, {
                    receiptContents: newReceiptContent,
                    sequencedReceiptContents: newReceiptContent
                })
            );

        }
        case actionType.ADD_NEW_RECEIPT_CONTENT :
        {

            state.receiptContents[action.payload.key].push(action.payload.data);

            let newReceiptContent = JSON.parse(JSON.stringify(state.receiptContents));

            return (
                Object.assign({}, state, {
                    receiptContents: newReceiptContent,
                    sequencedReceiptContents: newReceiptContent
                })
            );
        }
        case actionType.TOGGLE_DUPLICATE_RECIPT_CONTENT_MODAL:
        {
            return (
                Object.assign({}, state, {
                    showModal: action.payload
                })
            );
        }

        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/receiptContent") != 0) {
                return {
                    receiptContents: {},
                    valuesToAppend: [
                        "FEED",
                        "SUB_LOT_TYPE",
                        "REGISTRATION_NUMBER",
                        "DATE",
                        "COST",
                        "CHECKED_IN_TIME",
                        "CHECKED_OUT_TIME",
                        "BARCODE",
                        "DURATION"
                    ],
                    sequencedReceiptContents: {},
                    showModal: false
                };
            } else {
                return state;
            }
        }


        default :
        {
            return state;
        }
    }
}
