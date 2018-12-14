/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export function getCompaniesFilter(limit, skip, searchText) {
    return !(searchText != undefined && searchText.length > 0) ? JSON.stringify({limit, skip}) : JSON.stringify({
        limit,
        skip,
        "where": {"name": {"like": searchText}}
    });
}

