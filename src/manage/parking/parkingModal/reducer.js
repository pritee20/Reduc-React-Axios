/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionType';

const initialEditParkingModalState = {
    id: "",
    name: "",
    city: "",
    contactNumber: "",
    address: "",
    deleted: "",
    bookingState: "",
    category: "",
    companyId: "",
    createdAt: "",
    createdBy: "",
    landmark: "",
    nFactor: "",
    updatedAt: "",
    updatedBy: "",
    page: 0,
    nFactorCount: ""
};

export default function (state = initialEditParkingModalState, action) {
    switch (action.type) {
        case actionType.SET_EDIT_PARKING_MODAL:
        {


            return (
                Object.assign({}, state, {
                    id: action.payload.id,
                    name: action.payload.name,
                    city: action.payload.city,
                    contactNumber: action.payload.contactNumber,
                    address: action.payload.address,
                    deleted: action.payload.deleted,
                    bookingState: action.payload.bookingState,
                    category: action.payload.category,
                    companyId: action.payload.companyId,
                    createdAt: action.payload.createdAt,
                    createdBy: action.payload.createdBy,
                    landmark: action.payload.landmark,
                    nFactor: action.payload.nFactor,
                    nFactorCount: action.payload.nFactorCount,
                    updatedAt: action.payload.updatedAt,
                    updatedBy: action.payload.updatedBy,
                    showEditParkingModal: true
                })
            );
        }
        case actionType.UPDATE_PARKING_MODAL:
        {
            var key = action.payload.key;
            var assigningValue = {};
            assigningValue[key] = action.payload.value;
            return (
                Object.assign({}, state, assigningValue)
            );
        }
        case actionType.UPDATE_PARKING_INFORMATION:
        {
            return (
                Object.assign({}, state, {
                    id: "",
                    name: "",
                    city: "",
                    contactNumber: "",
                    address: "",
                    deleted: "",
                    bookingState: "",
                    category: "",
                    companyId: "",
                    createdAt: "",
                    createdBy: "",
                    landmark: "",
                    nFactor: "",
                    updatedAt: "",
                    updatedBy: "",
                    showEditParkingModal: false
                })
            );
        }
        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/parking") != 0) {
                return {};
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

