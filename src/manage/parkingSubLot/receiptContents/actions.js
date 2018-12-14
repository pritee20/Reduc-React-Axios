/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../../config/project.config.js';


import {push} from 'react-router-redux';
import actionType from './actionTypes';
import { receiptContentsByTypeAndSequence, receiptContentsToUpdate, receiptContentsToDuplicate, enableDragAndDrop } from './helper';


export function getReceiptContents(parkingSubLotId, duplicatingFrom) {

    return function (dispatch, getState) {

		let urlReceiptContents = "";
		let isDuplicating = false;

		if(duplicatingFrom){
			isDuplicating = true;
			urlReceiptContents = `${Path.API_end}ParkingSubLots/${duplicatingFrom}/receiptContents`;
		}else {
			urlReceiptContents = `${Path.API_end}ParkingSubLots/${parkingSubLotId}/receiptContents`;
		}

        return $.ajax({
            url: urlReceiptContents,
            method: 'GET',
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': getState().user.token},
            success: function (response) {
                let responseAfterSorting = receiptContentsByTypeAndSequence(response, isDuplicating);
                dispatch(getReceiptContentsSuccess(responseAfterSorting));
				enableDragAndDrop();

            }
        });
    };
}

export function getReceiptContentsSuccess(data) {

    return {
        type: actionType.GET_RECEIPT_CONTENTS_SUCCESS,
        payload: data
    };
}

export function showValuesWhenFocusGained(data) {
	
	return {
		type : actionType.SHOW_VALUES_WNEN_FOCUS_GAINED,
		payload : data
	}
}

export function onChangeRadioButton(data){
	
	return {
		type : actionType.ON_CHANGE_RADIO_BUTTON,
		payload : data
	}
}

export function onChangeReceiptContent(data){
	return {
		type : actionType.ON_CHANGE_RECEIPT_CONTENT,
		payload : data
	}
}

export function onChangeReceiptContentSequence(data){

	return {
		type : actionType.ON_CHANGE_RECEIPT_CONTENT_SEQUENCE,
		payload : data
	}
}

export function deleteReceiptContent(data) {

	return function(dispatch, getState) {

		if(data.index){
			console.log(data.index);
			return dispatch(deleteReceiptContentSuccess(data));
		}

		let urlToDeleteReceiptContents = `${Path.API_end}/ReceiptContents/${data.id}`;

		return $.ajax({
			url : urlToDeleteReceiptContents,
			method : 'DELETE',
			headers: { 'Content-Type': 'application/json', 'Authorization': getState().user.token },
			success : function(response){
				dispatch(deleteReceiptContentSuccess(data));
			}
		});


	}
}

export function deleteReceiptContentSuccess(data) {

	return {
		type : actionType.DELETE_RECEIPT_CONTENT,
		payload : data
	}

}

export function addNewReceiptContent(data, parkingSubLotId, receiptContents) {

	return function (dispatch, getState) {

		let urlToAddNewReceiptContent = `${Path.API_end}/ParkingSubLots/${parkingSubLotId}/receiptContents`;

		let dataToAddNewReceiptContent = {
			content : "{FEED}",
			styleMasterTitle : "TEXT",
			eventType : data.key,
			sequence : receiptContents[data.key].length
		};

		return $.ajax({
			url : urlToAddNewReceiptContent,
			method : 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': getState().user.token },
			data : dataToAddNewReceiptContent,
			success : function (response) {

				let dataToUpdateInState = {
					key : data.key,
					data : response
				};

				dispatch(addNewReceiptContentSuccess(dataToUpdateInState));
				enableDragAndDrop();
			}
		})
	}
}

export function addNewReceiptContentSuccess(data) {

	return {
		type : actionType.ADD_NEW_RECEIPT_CONTENT,
		payload : data
	}
}

export function getPreviousReceiptContent(parkingSubLotId, token, callback) {

	let urlToGetPreviousRCId = `${Path.API_end}/ParkingSubLots/${parkingSubLotId}/receiptContents`;

	$.ajax({
		url : urlToGetPreviousRCId,
		method : 'GET',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': token },
		data : {
			filter : {
				fields : ["id"]
			}
		},
		success : function (response) {
			console.log(response);
			deletePreviousReceiptContent(response, token, callback);
		}

	});
}

export function deletePreviousReceiptContent(data, token, callback) {

	for (var i = 0; i < data.length; i++){
		data[i].deleted = 1;
	}

	$.ajax({
		url : `${Path.API_end}/ReceiptContents/bulkDelete`,
		method : 'PUT',
		headers: { 'Content-Type': 'application/json', 'Authorization': token },
		data : JSON.stringify(data),
		success : function (response) {
			console.log(response);
            callback;

		}

	});
}

export function updateBulkReceiptContent(url, dataToSend, callBackData) {

    return $.ajax({
        url: url,
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': callBackData.getState().user.token},
        data: JSON.stringify(dataToSend),
        success: function () {
            alert("Receipt Content Updated Successfully !");
            let redirect = '/receiptContent?companyId=' + callBackData.companyId + '&parkingId=' + callBackData.parkingId + '&parkingLotId=' + callBackData.parkingLotId + '&parkingSubLotId=' + callBackData.parkingSubLotId;
            let responseAfterSorting = receiptContentsByTypeAndSequence(dataToSend);
            callBackData.dispatch(getReceiptContentsSuccess(responseAfterSorting));
            callBackData.dispatch(push(redirect));
        }
    });
}

export function addBulkReceiptContent(url, dataToSend, callBackData) {

    return $.ajax({
        url: url,
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': callBackData.getState().user.token},
        data: JSON.stringify(dataToSend),
        success: function () {
            alert("Receipt Content Updated Successfully !");
            let redirect = '/receiptContent?companyId=' + callBackData.companyId + '&parkingId=' + callBackData.parkingId + '&parkingLotId=' + callBackData.parkingLotId + '&parkingSubLotId=' + callBackData.parkingSubLotId;
            let responseAfterSorting = receiptContentsByTypeAndSequence(dataToSend);
            callBackData.dispatch(getReceiptContentsSuccess(responseAfterSorting));
            callBackData.dispatch(push(redirect));
        }
    });
}



export function onSubmitReceiptContent(data, companyId, parkingId, parkingLotId, parkingSubLotId, duplicatingFrom){

	return function(dispatch, getState) {
		
		let urlToUpdateReceiptContents = `${Path.API_end}/ReceiptContents/bulk`;

		if(duplicatingFrom){
			if (confirm("Previous Receipt Content will be deleted. Are you confident?") == true) {
				getPreviousReceiptContent(
                    parkingSubLotId,
                    getState().user.token,
                    addBulkReceiptContent(
                        urlToUpdateReceiptContents,
                        receiptContentsToDuplicate(data, parkingSubLotId),
                        {
                            companyId,
                            parkingId,
                            parkingLotId,
                            parkingSubLotId,
                            getState,
                            dispatch
                        }
                    ));
			} else {
				return;
			}
		}else {

            updateBulkReceiptContent(urlToUpdateReceiptContents, receiptContentsToUpdate(data), {
                companyId,
                parkingId,
                parkingLotId,
                parkingSubLotId,
                getState,
                dispatch
            });

		}

	}

}


export function toggleReceiptContent(value) {
    return {
        type: actionType.TOGGLE_DUPLICATE_RECIPT_CONTENT_MODAL,
        payload: value
    };
}


export function showDuplicateReceiptContent(companyId, parkingId, parkingLotId, parkingSubLotId) {

    return function (dispatch, getState) {
        dispatch(push('/duplicateReceiptContent?companyId='+companyId+'&parkingId='+parkingId+'&parkingLotId='+parkingLotId+'&parkingSubLotId='+ parkingSubLotId));
    }

}

