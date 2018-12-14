/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../config/project.config.js';
import actionType from './actionTypes';

import { initializeDataTable, reappendData, filterDateTime } from './helpers';

export function onChangeAction(data) {
    return {
        type: actionType.ON_CHANGE_ACTION,
        payload: data
    };
}

export function setUpOperatorAppTable(id, columnData) {
    return {
        type: actionType.SETUP_OPERATOR_APP_TABLE,
        id: id,
        columnData: columnData
    }
}

export function getOperatorAppStatus(data) {

    return function (dispatch, getState) {
        
        return $.ajax({
            url: `${Path.API_end}ParkingEvents/lastEvent`,
            method: 'GET',
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': getState().user.token},
            data: {
                type: data.selectedType,
                options: {
                    companyId: data.selectedCompany,
                    parkingId: data.selectedParking,
                    parkingLotId: data.selectedParkingLot,
                    parkingSubLotId: data.selectedParkingSubLot
                }
            },
            success: function (response) {
                dispatch(onChangeAction(data));
                // console.log(response);
                // console.log(filterDateTime(response));
                if(data.onChange){
                    reappendData(getState().reports.operatorAppStatus.id, getState().reports.operatorAppStatus.columnData, response);
                }else {
                    initializeDataTable(getState().reports.operatorAppStatus.id, getState().reports.operatorAppStatus.columnData, response);
                }
            }
        });



    };
}
