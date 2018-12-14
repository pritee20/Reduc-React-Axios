/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import _ from 'underscore';
import store from '../../../store';
import { onChangeReceiptContentSequence, deleteReceiptContent } from './actions';


export function receiptContentsByTypeAndSequence(receiptContent, isDuplicating){

	receiptContent = _.groupBy(receiptContent, "eventType");

	for(var prop in receiptContent){
		
		if(receiptContent.hasOwnProperty(prop)){
			
			receiptContent[prop] = _.sortBy(receiptContent[prop], "sequence");

			receiptContent[prop].map(function(value, index){

			    if(isDuplicating){
			        value.id = '';
                }

				value.show = false;
				value.styleMasterTitle = value.styleMasterTitle.toUpperCase();
			});
			
		};
	}

	return receiptContent;
}


export function receiptContentsToUpdate(receiptContent){

    console.log(receiptContent);

	let receiptContentToUpdate = [];

	Object.keys(receiptContent).map(function(value){

	    receiptContent[value].map(function(receiptContentValue, index){

		    receiptContentValue.sequence = index;

            if(receiptContentValue.content == ""){
                store.dispatch(deleteReceiptContent({id : receiptContentValue.id, key : value}));
            }

			receiptContentToUpdate.push(receiptContentValue);

		});
	});

    console.log(receiptContentToUpdate);

	return receiptContentToUpdate;
}

export function receiptContentsToDuplicate(receiptContent, parkingSubLotId){

    let receiptContentToUpdate = [];

    Object.keys(receiptContent).map(function(value){

        receiptContent[value].map(function(receiptContentValue, index){

            receiptContentValue.sequence = index;

            if(receiptContentValue.content == ""){
                store.dispatch(deleteReceiptContent({index : index, key : value}));
            }

            receiptContentToUpdate.push({
                content : receiptContentValue.content,
                eventType : receiptContentValue.eventType,
                parkingSubLotId : parkingSubLotId,
                sequence : receiptContentValue.sequence,
                styleMasterTitle : receiptContentValue.styleMasterTitle
            });

        });
    });

    return receiptContentToUpdate;
}

export function refreshPage() {
    return location.reload();
}

export function enableDragAndDrop(){

    if (!$.fn.sortable) return;

    $('.sortable').sortable({
        forcePlaceholderSize: true,
        placeholder: '<div class="box-placeholder p0 m0"><div></div></div>',

    });


    $(".sortable").on("sortstop", function(event, ui){


        let arrayAfterSorting = $(event.target).children();

        let keyOfReceiptContent = $(event.target).attr('data-key');

        let changedArrayAfterSorting = [];

        arrayAfterSorting.map(function(index, value){
            // console.log("Index : "+index);
            console.log("Value : "+ $(value).attr('data-index'));
            changedArrayAfterSorting.push(parseInt($(value).attr('data-index')));
            $(value).attr('data-index', index);
        });

        let data = {
            key : keyOfReceiptContent,
            sequence : changedArrayAfterSorting
        };

        store.dispatch(onChangeReceiptContentSequence(data));

    });

}




