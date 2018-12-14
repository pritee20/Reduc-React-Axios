/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { createSelector } from 'reselect';
import _ from 'lodash';
import { convertType } from '../../utils/utils.js';
import { generateDates } from './helpers';
import { NAME } from './constants';

const dayWiseReportsSelector = state => state.reports[NAME].reportsData;
const fromDateSelector = state => state.reports[NAME].fromDate;
const toDateSelector = state => state.reports[NAME].toDate;
const selectedIdsSelector = state => state.reports[NAME].selectedConfig;
const userAccessSelector = state => state.user.userAccessNamed;

const getSelectedReports = (dayWiseReports, selectedIds, userAccess, fromDate, toDate) => {

	let usernameFilterObj = _.omitBy({
		username: selectedIds.username
	}, _.isNil); 

	let parkingSubLotIdsByFilter = [];


	let accessibleSubLots = userAccess.parkingSubLotsAccess.map(function(parkingSubLotObject){
		return parkingSubLotObject.id;
	});

	let parkingFilterObj = _.omitBy({
		companyId: convertType(selectedIds.companyId),
		parkingId: convertType(selectedIds.parkingId),
		parkingLotId: convertType(selectedIds.parkingLotId),
		parkingSubLotId: convertType(selectedIds.parkingSubLotId),
		subLotType: convertType(selectedIds.subLotType)
	}, _.isNil);

	let filteredByUser = _.mapValues(dayWiseReports,(dayRep)=>{
		return _.filter(dayRep,usernameFilterObj);
	});


	let clonedFiltered = _.cloneDeep(filteredByUser); // clonedFiltered contains dateWiser user filtered by User


	let accessibleSubLotsByFilter = [];


	// Conditions To Get All Accessible Sub Lots According To Filter

	if(selectedIds.companyId){

		if(selectedIds.parkingId){

			if(selectedIds.parkingLotId){

				if(selectedIds.parkingSubLotId){

					accessibleSubLotsByFilter.push(selectedIds.parkingSubLotId);

				}else{

					userAccess.parkingLotsAccess.map(function(parkingLotsAccess){
						if(selectedIds.parkingLotId == parkingLotsAccess.id){
							parkingLotsAccess.parkingSubLots.map(function(parkingSubLot){
								accessibleSubLotsByFilter.push(parkingSubLot.id);
							});
						}
					});

				}

			}else{
				userAccess.parkingAccess.map(function(parkingAccess){
					if(selectedIds.parkingId == parkingAccess.id){
						parkingAccess.parkingSubLots.map(function(parkingSubLot){
							accessibleSubLotsByFilter.push(parkingSubLot.id);
						});
					}
				});

			}

		}else { 
			userAccess.companyAccess.map(function(companyAccess){
				companyAccess.parkingSubLots.map(function(parkingSubLot){
					accessibleSubLotsByFilter.push(parkingSubLot.id);
				});
			});
		}

	}else if(selectedIds.parkingId){

		if(selectedIds.parkingLotId){

			if(selectedIds.parkingSubLotId){

				accessibleSubLotsByFilter.push(selectedIds.parkingSubLotId);
				
			}else{

				userAccess.parkingLotsAccess.map(function(parkingLotsAccess){
					if(selectedIds.parkingLotId == parkingLotsAccess.id){
						parkingLotsAccess.parkingSubLots.map(function(parkingSubLot){
							accessibleSubLotsByFilter.push(parkingSubLot.id);
						});
					}
				});

			}

		}else{
			userAccess.parkingAccess.map(function(parkingAccess){
				if(selectedIds.parkingId == parkingAccess.id){
					parkingAccess.parkingSubLots.map(function(parkingSubLot){
						accessibleSubLotsByFilter.push(parkingSubLot.id);
					});
				}
			});

		}

	}else if(selectedIds.parkingLotId){

		if(selectedIds.parkingSubLotId){

			accessibleSubLotsByFilter.push(selectedIds.parkingSubLotId);
			
		}else{

			userAccess.parkingLotsAccess.map(function(parkingLotsAccess){
				if(selectedIds.parkingLotId == parkingLotsAccess.id){
					parkingLotsAccess.parkingSubLots.map(function(parkingSubLot){
						accessibleSubLotsByFilter.push(parkingSubLot.id);
					});
				}
			});

		}

	}else if(selectedIds.parkingSubLotId){

		accessibleSubLotsByFilter.push(selectedIds.parkingSubLotId);

	}else{

		userAccess.parkingSubLotsAccess.map(function(parkingSubLotsAccess){
			accessibleSubLotsByFilter.push(parkingSubLotsAccess.id);
		})
	}
		

	// Iterate over all objects in dateWise ClonedFilter
	for(var dateReport in clonedFiltered){

		// Check for own children in the object
		if(clonedFiltered.hasOwnProperty(dateReport)){ 

			// Iterate a Particular Date for filter
			clonedFiltered[dateReport].map(function(reportByDate){

				// Assume a array for filtering values of accessible reports
				let reportsDataOfDateReport = [];

				// Iterate on parkingReports for check if sublot id is accessible or not
				reportByDate.parkingReports.map(function(parkingSubLotReport){

					// Iterate on accessibleSubLotsByFilter
					accessibleSubLotsByFilter.map(function(accessibleSubLotId){

						// check whether sublot id matches or not
						if(accessibleSubLotId == parkingSubLotReport.parkingSubLotId){
							reportsDataOfDateReport.push(parkingSubLotReport);
						}

					});

				});

				// Replace parking reports by accessible parking reports
				reportByDate.parkingReports = reportsDataOfDateReport;
			});

		}
	}

	let dayWiseProccessed = _.mapValues(clonedFiltered,(dayRep)=> {

		let reportArray = [];

		dayRep.map((userRep)=> {
			userRep.parkingReports.map((sublotStats)=>{
				reportArray.push(sublotStats);
			});

		});

		return reportArray;
	});

	let dayWiseMerged = _.mapValues(dayWiseProccessed,(dayRep)=>{	
		let sublotObj = {
			checkInCount: 0,
			checkOutCount: 0,
			focCount: 0,
			ttCount: 0,
			checkInRevenue: 0,
			checkOutRevenue: 0,
			passCheckInCount: 0,
			passCheckOutCount: 0,
			acCount: 0
		};

		dayRep.map((SublotStats)=>{
			if(accessibleSubLots.indexOf(SublotStats.parkingSubLotId) !== -1){
				sublotObj.checkInCount += SublotStats.checkInCount;
				sublotObj.checkOutCount += SublotStats.checkOutCount;
				sublotObj.focCount += SublotStats.focCount;
				sublotObj.ttCount += SublotStats.ttCount;
				sublotObj.checkInRevenue += SublotStats.checkInRevenue;
				sublotObj.checkOutRevenue += SublotStats.checkOutRevenue;
				sublotObj.passCheckInCount += SublotStats.passCheckInCount;
				sublotObj.passCheckOutCount += SublotStats.passCheckOutCount;
				sublotObj.acCount += SublotStats.acCount
			}
		});

		return sublotObj
	});

	let dateRange = generateDates(fromDate,toDate);

	let graphData = {dates: dateRange};

	graphData.data = {
		checkInCount: [],
		checkOutCount: [],
		focCount: [],
		ttCount: [],
		checkInRevenue: [],
		checkOutRevenue: [],
		passCheckInCount: [],
		passCheckOutCount: [],
		acCount: []
	};

	dateRange.map((date)=>{
		let emptySublotObj = {
			checkInCount: 0,
			checkOutCount: 0,
			focCount: 0,
			ttCount: 0,
			checkInRevenue: 0,
			checkOutRevenue: 0,
			passCheckInCount: 0,
			passCheckOutCount: 0,
			acCount: 0
		};

		let dateObj = {};

		_.forOwn(dayWiseMerged,(value,key)=>{
			if (key===date) {
				dateObj = value;
				return false;
			} else {
				dateObj = emptySublotObj;
			}
		});

		graphData.data.checkInCount.push(dateObj.checkInCount);
		graphData.data.checkOutCount.push(dateObj.checkOutCount);
		graphData.data.focCount.push(dateObj.focCount);
		graphData.data.ttCount.push(dateObj.ttCount);
		graphData.data.checkInRevenue.push(dateObj.checkInRevenue);
		graphData.data.checkOutRevenue.push(dateObj.checkOutRevenue);
		graphData.data.passCheckInCount.push(dateObj.passCheckInCount);
		graphData.data.passCheckOutCount.push(dateObj.passCheckOutCount);
		graphData.data.acCount.push(dateObj.acCount);
	});

	return graphData
};

export default createSelector(
	dayWiseReportsSelector,
	selectedIdsSelector,
	userAccessSelector,
	fromDateSelector,
	toDateSelector,
	getSelectedReports
);
