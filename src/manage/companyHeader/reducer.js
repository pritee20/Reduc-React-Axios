/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';

const initialCompanyState = {
    id: null,
    name: null,
    city: null,
    email: null,
    contactNumber: null,
    contractor: null,
    website: null,
    address: null,
    deleted: null,
    showModal: false,
    merchantId: null
};


export default function (state = initialCompanyState, action) {
    switch (action.type) {
        case actionType.GET_COMPANY_SUCCESS:
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
                    merchantId: merchantId,
                    showModal: false
                })
            );
        case actionType.GET_COMPANY_UPDATE_SUCCESS:
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
                    merchantId: action.payload.merchantId,
                    deleted: action.payload.deleted
                })
            );
        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/parking") != 0
                && action.payload.pathname.indexOf("/parkingLot") != 0
                && action.payload.pathname.indexOf("/parkingSubLot") != 0) {
                return JSON.parse(JSON.stringify(initialCompanyState));
            } else {
                return state;
            }
        }

        default:
            return state;
    }
}

