/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import _ from 'lodash';
/**
 * Functions that processes company reports data and sums all the transactions for all the users
 * and groups the transactions by sublot type.
 * @param reports Reports Data
 * @param parkingSLAccess Parking Sublot Access Array
 * @returns {Array} Merged reports for all the users grouped by sublot type.
 */


let datatable;

let userDatatable;

export function initializeUserDataTable(userColumnData) {

    if (!$.fn.DataTable) return;

    $.fn.dataTableExt.sErrMode = 'throw';

    console.log(userColumnData);

    userDatatable = $("#companyUserReports").DataTable({
        processing: true,
        data: userColumnData,
        columns: [{
            data: 'parkingSubLotName'
        }, {
            data: 'checkInCount'
        }, {
            data: 'checkOutCount'
        }, {
            data: 'focCount'
        }, {
            data: 'ttCount'
        }, {
            data: 'acCount'
        }, {
            data: 'checkInRevenue'
        }],
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'collection',
                text: 'Export',
                buttons: [
                    'excel',
                    'pdf',
                    {
                        extend: 'print',
                        text: 'Print',
                        autoPrint: true,
                        exportOptions: {
                            modifier: {
                                page: 'current'
                            }
                        }
                    }
                ]
            }
        ]
    });

}

export function reappendUserData(response) {
    console.log(response);
    userDatatable.clear().draw(); // Clear existing data
    userDatatable.rows.add(response); // Add new data
    userDatatable.columns.adjust().draw(); // Redraw the DataTable
}

export function initializeDataTable(columnData) {

	if (!$.fn.DataTable) return;

	$.fn.dataTableExt.sErrMode = 'throw';

	console.log(columnData);

	datatable = $("#companyReports").DataTable({
		processing: true,
		data: columnData,
		columns: [{
			data: 'parkingSubLotName'
		}, {
			data: 'checkInCount'
		}, {
			data: 'checkOutCount'
		}, {
			data: 'focCount'
		}, {
			data: 'ttCount'
		}, {
			data: 'acCount'
		}, {
			data: 'checkInRevenue'
		}],
		dom: 'lBfrtip',
		buttons: [
			{
				extend: 'collection',
				text: 'Export',
				buttons: [
					'excel',
					'pdf',
					{
						extend: 'print',
						text: 'Print',
						autoPrint: true,
						exportOptions: {
							modifier: {
								page: 'current'
							}
						}
					}
				]
			}
		]
	});

}



export function reappendData(response) {
    console.log(response);
    datatable.clear().draw(); // Clear existing data
    datatable.rows.add(response); // Add new data
    datatable.columns.adjust().draw(); // Redraw the DataTable
}

export function processUserSumReports(reports, parkingSLAccess) {
	
	let processedReports = [];
	let SublotStatsArray = [];
	let parkingSLArray = [];

	// create an array of sub lot types by parsing over parkingSLAccess array.
	parkingSLAccess.map((sublot)=>{
        parkingSLArray.push(sublot.type);
    });

	// find unique sub lot types out of all sub lot accesess.
	parkingSLArray = _.uniq(parkingSLArray);
	console.log(parkingSLArray);


	reports.map((userReport)=> {
		userReport.reports.map((SublotStats)=>{
			SublotStatsArray.push(SublotStats);
		});
	});

	parkingSLArray.map((sublot)=>{

		let sublotObj = {
			checkInCount: 0,
			checkOutCount: 0,
			focCount: 0,
			ttCount: 0,
			checkInRevenue: 0,
			checkOutRevenue: 0,
			passCheckInCount: 0,
			passCheckOutCount: 0,
			acCount: 0,
			parkingSubLotName: sublot
		};

		SublotStatsArray.map((SublotStats)=>{
			if (sublot === SublotStats.parkingSubLotName) {
				sublotObj.checkInCount += SublotStats.checkInCount;
				sublotObj.checkOutCount += SublotStats.checkOutCount;
				sublotObj.focCount += SublotStats.focCount;
				sublotObj.ttCount += SublotStats.ttCount;
				sublotObj.checkInRevenue += SublotStats.checkInRevenue;
				sublotObj.checkOutRevenue += SublotStats.checkOutRevenue;
				sublotObj.passCheckInCount += SublotStats.passCheckInCount;
				sublotObj.passCheckOutCount += SublotStats.passCheckOutCount;
				sublotObj.acCount += SublotStats.acCount;
			}
		});

		processedReports.push(sublotObj);

	});

	
	let filteredReports = _.filter(SublotStatsArray, function(subLot) {
		return (subLot.parkingSubLotName !== null && parkingSLArray.indexOf(subLot.parkingSubLotName) === -1);
	});

	return (_.concat(processedReports, filteredReports));

}
