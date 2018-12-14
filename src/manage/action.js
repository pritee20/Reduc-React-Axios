/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';

export function setTabState(value) {
	
	return {
		type : actionType.MANAGE_TABS,
		selectedTab : value
	};
}
