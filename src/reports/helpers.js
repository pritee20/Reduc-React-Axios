/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import _ from 'lodash';
import companyReports from './companyReports';
import dayWiseReports from './dayWiseReports';
/**
 * Creates a list of usernames whose activities are logged in the reports.
 * @param reports Reports data
 * @param reportType Type of report
 * @returns {Array} Unique usernames list.
 */
export function generateUsers(reports,reportType){
	let usernames = [];
	switch(reportType) {
		case companyReports.constants.NAME:
			reports.map(function (report) {
				usernames.push(report.username);
		});
		break;
		case dayWiseReports.constants.NAME:
			_.forIn(reports,(value)=>{
				value.map(function (report) {
					usernames.push(report.username);
				});
		});
		break;
		default: usernames = [];         
	}
	return _.uniq(usernames);
}
/**
 * Check whether user is allowed to view company level reports.
 * @param userAccesses User's Access Level.
 * @returns {boolean} Returns whether user is allowed to view company level reports.
 */
export function checkCompanyAccessLevel(userAccesses){
	let checkParking = _.filter(userAccesses,_.iteratee({'accessTitle': 'REPORT_PARKING'}));
	let checkCompany = _.filter(userAccesses,_.iteratee({'accessTitle': 'REPORT_COMPANY'}));
	return checkCompany.length > 0 && checkParking.length == 0 ? true : false;	
}
/**
 * Check whether user is allowed to view parking level reports.
 * @param userAccesses User's Access Level.
 * @returns {boolean} Returns whether user is allowed to view parking level reports.
 */
export function checkReportAccessLevel(userAccesses) {
	let checkParking = _.filter(userAccesses,_.iteratee({'accessTitle': 'REPORT_PARKING'}));
	let checkCompany = _.filter(userAccesses,_.iteratee({'accessTitle': 'REPORT_COMPANY'}));
	return checkCompany.length == 0 && checkParking.length == 0 ? true : false;
}
/**
 * Returns name of the company given its id
 * @param Cid Company's id
 * @param comp Company Access Array
 * @returns {*} Name of the company
 */
export function getCompanyName(Cid, comp) {
	let resultC =  _.find(comp,(company)=> { return company.id == Cid;});
	return resultC.name;
}
/**
 * Returns name of the parking given its id
 * @param Pid Parking's id
 * @param park Parking Access array
 * @returns {*} Name of the parking
 */
export function getParkingName(Pid, park) {
	let resultP =  _.find(park,(parking)=> { return parking.id == Pid;});
	return resultP.name;
}
/**
 * Returns the name of the parkinglot given its id
 * @param PLid Parking Lot's id
 * @param parkL Parking Lot access array
 * @returns {*} Name of the parkinglot
 */
export function getParkingLName(PLid, parkL) {
	let resultPL =  _.find(parkL,(parkingL)=> { return parkingL.id == PLid;});

	// If Userwise reports result is undefined then return null.
	if(!resultPL){
		return;
	}
	return resultPL.name;
}
/**
 * Returns the name of the parkingsublot given its id
 * @param PSLid Parking sublot's id
 * @param parkSL Parking sublot access array
 * @returns {*} Name of the parking sublot
 */
export function getParkingSLName(PSLid, parkSL) {
	
	let resultPSL =  _.find(parkSL, (parkingSL)=> { 
		return parkingSL.id == PSLid;
	});

	if(resultPSL && resultPSL.type){
		return resultPSL.type;
	}

	return null;
	
}
/**
 * Inserts the name of the sublots for the given sublot ids in the reports data.
 * @param reports Reports Data
 * @param userAccess User's Access
 * @returns {*} Reports Data with sublot name inserted.
 */
export function insertNames(reports, userAccess) {
	reports.map((userRep)=>{
		// report.companyName = getCompanyName(report.companyId,userAccess.companyAccess)
		// report.parkingName = getParkingName(report.parkingId,userAccess.parkingAccess)
		// report.parkingLotName = getParkingLName(report.parkingLotId,userAccess.parkingLotsAccess)
		userRep.reports.map((SublotStats)=>{
			SublotStats.parkingSubLotName = getParkingSLName(SublotStats.parkingSubLotId,userAccess.parkingSubLotsAccess);
		});
	});
	return reports;
}