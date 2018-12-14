/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { createSelector } from 'reselect';
import _ from 'lodash';
import { convertType } from '../../utils/utils.js';
import { insertNames } from '../helpers';
import { NAME } from './constants';

const companyReportsSelector = state => state.reports[NAME].reportsData;
const selectedIdsSelector = state => state.reports[NAME].selectedConfig;
const userAccessSelector = state => state.user.userAccessNamed;
/**
 * Computes the reports data for the given selections of user,companies,parkings,parkinglots
 * @param rangeReports Reports Data
 * @param selectedIds Selected Configurations (Selected user,parking,etc.)
 * @param userAccess User Access Array
 * @returns {*} Filtered Reports Data according to the selections made.
 */
const getSelectedReports = (rangeReports,selectedIds,userAccess) => {
	
	let usernameFilterObj = _.omitBy({
		username: selectedIds.username
	}, _.isNil);

	let parkingFilterObj =_.omitBy({
		companyId: convertType(selectedIds.companyId),
		parkingId: convertType(selectedIds.parkingId),
		parkingLotId: convertType(selectedIds.parkingLotId)
	}, _.isNil);

	let filteredByUser = _.filter(rangeReports,usernameFilterObj);

	let clonedFiltered = _.cloneDeep(filteredByUser);

	clonedFiltered.map((userRep)=>{
		userRep.reports = _.filter(userRep.reports,parkingFilterObj);
	});

	let clonedFilteredWithSubLotType = insertNames(clonedFiltered,userAccess);
	
	return clonedFilteredWithSubLotType;
};

export default createSelector(
	companyReportsSelector,
	selectedIdsSelector,
	userAccessSelector,
	getSelectedReports
);

