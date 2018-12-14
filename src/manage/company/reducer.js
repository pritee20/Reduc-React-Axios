/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';

const initialManageCompanyState = {data: [], showProgress: false, searchSuggestions: []};


export default function (state = initialManageCompanyState, action) {
    switch (action.type) {
        case actionType.GET_COMPANIES_SUCCESS:
        {
            let newState = JSON.parse(JSON.stringify(state));
            newState.data = [];
            for (let count = 0; count < action.payload.length; count++) {
                newState.data.push(action.payload[count]);
            }
            return newState;
        }
        case actionType.SET_TOTAL_COMPANY_COUNT:
        {
            return (
                Object.assign({}, state, {
                    count: action.payload.count
                })
            );
        }

        case actionType.GET_SEARCH_SUGGESTIONS_SUCCESS:
        {
            return (
                Object.assign({}, state, {
                    searchSuggestions: action.payload.data
                })
            );
        }

        case actionType.CLEAR_SEARCH_SUGGESTIONS:
        {
            return (
                Object.assign({}, state, {
                    searchSuggestions: []
                })
            );

        }

        case actionType.MAKING_NETWORK_REQUEST:
        {
            return (
                Object.assign({}, state, {
                    showProgress: action.payload.show
                })
            );
        }
        case actionType.NEW_COMPANY_ADDED:
        {
            let newState = JSON.parse(JSON.stringify(state));
            newState.count = newState.count + 1;
            if (newState.data.length < 10) {
                newState.data.push(action.payload);
            }
            return newState;
        }

        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/manage") != 0) {
                return JSON.parse(JSON.stringify(initialManageCompanyState));
            } else {
                return state;
            }
        }
        default:
            return state;
    }
}
