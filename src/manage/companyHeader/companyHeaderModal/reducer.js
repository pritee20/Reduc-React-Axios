/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';


const intialEditState = {
    id: "",
    name: "",
    city: "",
    email: "",
    contactNumber: "",
    contractor: "",
    website: "",
    address: "",
    deleted: "",
    showModal: false,
    merchantId: null
};

export default function (state = intialEditState, action) {

    switch (action.type) {
        case actionType.SHOW_COMPANY_EDIT_MODAL:
        {
            return (
                Object.assign({}, state, {
                    showModal: true
                })
            );
        }
        case actionType.SET_COMPANY_EDIT_MODAL:
        {
            let merchantId = null;
            if (action.payload.freeChargeMerchantId && action.payload.freeChargeMerchantId.length > 0) {
                merchantId = action.payload.freeChargeMerchantId[0].merchantId;
            }

            return (
                Object.assign({}, state, {
                    id: action.payload.id,
                    name: action.payload.name,
                    city: action.payload.city,
                    email: action.payload.email,
                    contactNumber: action.payload.contactNumber,
                    contractor: action.payload.contractor,
                    website: action.payload.website,
                    address: action.payload.address,
                    deleted: action.payload.deleted,
                    showModal: false,
                    merchantId: merchantId
                })
            );
        }
        case actionType.HIDE_COMPANY_EDIT_MODAL:
        {
            return (
                Object.assign({}, state, {
                    showModal: false
                })
            );
        }
        case actionType.UPDATE_COMPANY_NAME:
        {
            let newState = Object.assign({}, state, {
                name: action.payload
            });
            console.log('update company name state is ', newState);
            return newState;
        }
        case actionType.UPDATE_COMPANY_ADDRESS:
        {
            return (
                Object.assign({}, state, {
                    address: action.payload
                })
            );
        }
        case actionType.UPDATE_COMPANY_CITY:
        {
            return (
                Object.assign({}, state, {
                    city: action.payload
                })
            );
        }
        case actionType.UPDATE_COMPANY_CONTRACTOR:
        {
            return (
                Object.assign({}, state, {
                    contractor: action.payload
                })
            );
        }
        case actionType.UPDATE_COMPANY_EMAIL:
        {
            return (
                Object.assign({}, state, {
                    email: action.payload
                })
            );
        }
        case actionType.UPDATE_FREECHARGE_MERCHANT_ID:
        {
            return (
                Object.assign({}, state, {
                    merchantId: action.payload
                })
            );
        }
        case actionType.UPDATE_COMPANY_CONTACTNUMBER:
        {
            return (
                Object.assign({}, state, {
                    contactNumber: action.payload
                })
            );
        }
        case actionType.UPDATE_COMPANY_WEBSITE:
        {
            return (
                Object.assign({}, state, {
                    website: action.payload
                })
            );
        }
        case actionType.UPDATE_COMPANY_INFORMATION:
        {
            return (
                Object.assign({}, state, {
                    id: action.payload.id,
                    name: action.payload.name,
                    city: action.payload.city,
                    email: action.payload.email,
                    contactNumber: action.payload.contactNumber,
                    contractor: action.payload.contractor,
                    website: action.payload.website,
                    address: action.payload.address,
                    deleted: action.payload.deleted,
                    merchantId: action.payload.merchantId,
                    showModal: false
                })
            );
        }

        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/parking") != 0
                && action.payload.pathname.indexOf("/parkingLot") != 0
                && action.payload.pathname.indexOf("/parkingSubLot") != 0) {
                return {
                    showModal: false
                };
            } else {
                return state;
            }
        }

        default:
            return state;
    }
}


