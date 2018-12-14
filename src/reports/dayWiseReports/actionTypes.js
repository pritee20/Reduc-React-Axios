/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { NAME } from './constants';

const SET_REPORTS_DATA = `reports/${NAME}/SET_REPORTS_DATA`;
const FETCH_REPORTS_REQUEST = `reports/${NAME}/FETCH_REPORTS_REQUEST`;
const SET_FROM_DATE = `reports/${NAME}/SET_FROM_DATE`;
const SET_TO_DATE = `reports/${NAME}/SET_TO_DATE`;

const SELECT_COMPANY = `reports/${NAME}/SELECT_COMPANY`;
const SELECT_PARKING = `reports/${NAME}/SELECT_PARKING`;
const SELECT_PARKINGLOT = `reports/${NAME}/SELECT_PARKINGLOT`;
const SELECT_PARKINGSUBLOT = `reports/${NAME}/SELECT_PARKINGSUBLOT`;
const SELECT_USER = `reports/${NAME}/SELECT_USER`;
const SELECT_SUBLOT = `reports/${NAME}/SELECT_SUBLOT`;

const SELECT_PAYMENT_MODE = `reports/${NAME}/SELECT_PAYMENT_MODE`;

const CLEAR_SELECT_CONFIG = `reports/${NAME}/CLEAR_SELECT_CONFIG`;
const CLEAR_REPORT_STATE = `reports/${NAME}/CLEAR_REPORT_STATE`;


export default { 
	SET_REPORTS_DATA,
	FETCH_REPORTS_REQUEST,
	SET_FROM_DATE,
	SET_TO_DATE,
	SELECT_COMPANY,
	SELECT_PARKING,
	SELECT_PARKINGLOT,
	SELECT_PARKINGSUBLOT,
	SELECT_USER,
	SELECT_SUBLOT,
	SELECT_PAYMENT_MODE,
	CLEAR_SELECT_CONFIG,
	CLEAR_REPORT_STATE
};
