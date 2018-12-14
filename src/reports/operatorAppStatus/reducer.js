/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';

const defaultState = {
    selectedType : "CHECKED_IN,CHECKED_OUT"
};

const Reducer = (state = defaultState, action) => {
    switch (action.type) {

        case actionType.GET_OPERATOR_APP_STATUS_SUCCESS:{
            return (
                Object.assign({}, defaultState)
            );
        }
        case actionType.ON_CHANGE_ACTION:{
            return (
                Object.assign({}, state, action.payload)
            );
        }
            
        case actionType.SETUP_OPERATOR_APP_TABLE:{
            return(
                Object.assign({}, state, {
                    id : action.id, 
                    columnData: action.columnData 
                })
            );
        }
        default: return state;
    }
};

export default Reducer;
