/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export function getParkingsCountFilter(companyId) {
    return JSON.stringify({companyId});
}

export function getParkingsFilter(companyId, limit, skip, searchText) {
    return searchText == undefined ? JSON.stringify({
        "where": {"companyId": companyId},
        limit,
        skip
    }) : JSON.stringify({"where": {"companyId": companyId, "name": {"like": "%" + searchText + "%"}}, limit, skip});
}