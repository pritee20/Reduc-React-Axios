/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import {createSelector} from 'reselect';

const getUserAccessList = state => {
    if (state.user.userAccess != null) {
        return state.user.userAccess.userAccesses;
    }
    else {
        return null;
    }
};

const getUserPermissions = (userAccessList) => {
    let canViewReports = false, canViewManage = false;

    if (userAccessList != null) {
        userAccessList.forEach(function (object) {
            if (object.accessTitle == "ADMIN_MANAGE") {
                canViewManage = true;
            }
            if (object.accessTitle == "ADMIN_REPORT") {
                canViewReports = true;
            }
        });

    }

    return {
        canViewManage, canViewReports
    };

};

export default createSelector(getUserAccessList, getUserPermissions);
