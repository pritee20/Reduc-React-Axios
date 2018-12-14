/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import store from '../../store';
import {push} from 'react-router-redux';

export function getRCParkingLotFilter() {
    return JSON.stringify({"include": ["parkingSubLots", "parkings"]});
}

export function renderData(rcParkingLotsData, companyId, parkingId, parkingLotId, parkingSubLotId) {

    if (!$.fn.dataTable) return;

    $.fn.dataTableExt.sErrMode = 'throw';

    let rcParkingLotsDataTable = $('#rcParkingLotsDataTable').DataTable({
        data: rcParkingLotsData,
        columns: [{
            data: 'name'
        }, {
            data: 'parkingName'
        }, {
            data: 'parkingSubLotId'
        }, {
            data: 'parkingSubLotType'
        },
        //     {
        //     defaultContent: '<button type="button" class="pull-right btn btn-default view-receipt">View Receipt</button>'
        // },
        {
            defaultContent: '<button type="button" class="pull-right btn btn-default duplicate-receipt">Duplicate Receipt</button>'
        }]
    });

    $('#rcParkingLotsDataTable tbody').on('click', '.view-receipt', function (event) {

        event.stopPropagation();
        let data = rcParkingLotsDataTable.row($(this).parents('tr')).data();
        // console.log(data);
        // let redirect = "/receiptContent?parkingSubLotId=" + data.parkingSubLotId + "&isReadOnly=true&currentParkingSubLotId=" + currentParkingSubLotId;
        // store.dispatch(push(redirect));
    });


    $('#rcParkingLotsDataTable tbody').on('click', '.duplicate-receipt', function (event) {

        event.stopPropagation();
        let data = rcParkingLotsDataTable.row($(this).parents('tr')).data();
        console.log(data);
        let redirect = '/receiptContent?companyId='+companyId+'&parkingId='+parkingId+'&parkingLotId='+parkingLotId+'&parkingSubLotId='+parkingSubLotId+'&duplicatingFrom='+data.parkingSubLotId;
        console.log(redirect);
        store.dispatch(push(redirect));
    });

    $('#rcParkingLotsDataTable').on('page.dt', function () {
        // console.log(rcParkingLotsDataTable.page.info());
    });

}

export function getRCParkingLotsDataTable(response) {

    let rcParkingLotData = [];

    for (let count = 0; count < response.length; count++) {

        for (let innerCount = 0; innerCount < response[count].parkingSubLots.length; innerCount++) {
            let dataObject = {};
            dataObject['id'] = response[count].id;
            dataObject['name'] = response[count].name;
            dataObject['parkingId'] = response[count].parkingId;
            dataObject['parkingName'] = response[count].parkings.name;
            dataObject['parkingSubLotId'] = response[count].parkingSubLots[innerCount].id;
            dataObject['parkingSubLotType'] = response[count].parkingSubLots[innerCount].type;
            rcParkingLotData.push(dataObject);
        }

    }

    return rcParkingLotData;
}

