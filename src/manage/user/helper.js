/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

/**
 * @fileoverview
 * This file contains helper functions to filter, initialize and some
 * kind of checks.
 */


import {push} from 'react-router-redux';
import store from '../../store';
import _ from 'lodash';


export function getUserB2BFilter(limit, skip, searchText) {
    let filter = {limit, skip};
    if (searchText != undefined && searchText.length > 0) {
        filter["where"] = {
            "username": {
                "like": '%' + searchText + '%'
            }
        }
    }

    return JSON.stringify(filter);
}

export function doesUserHavePermission(permissionName, permissionArray) {

    for (var i = 0; i < permissionArray.length; i++) {
        if (permissionName == permissionArray[i].accessTitle) {
            return true;
        }
    }

    return false;

}

export function getUserB2bApiFilter() {
    return JSON.stringify({
        "include": [{
            "relation": "parkingSubLotUserAccesses",
            "scope": {
                "fields": ["id", "companyId", "parkingId", "parkingLotId", "parkingSubLotId", "userB2b"],
                "include": [{"relation": "company", "scope": {"fields": ["id", "name"]}}, {
                    "relation": "parking",
                    "scope": {"fields": ["id", "name"]}
                }, {"relation": "parkingLot", "scope": {"fields": ["id", "name"]}}, {
                    "relation": "parkingSubLot",
                    "scope": {"fields": ["id", "type"]}
                }]
            }
        }, {"relation": "userAccesses"}]
    });
}

export function getCompanySearchFilter(searchText) {
    return JSON.stringify({
        "limit": 5,
        "skip": 0,
        "where": {"name": {"like": searchText}},
        "include": {
            "relation": "parkings",
            "scope": {
                "include": {
                    "relation": "parkingLots",
                    "scope": {
                        "include": {
                            "relation": "parkingSubLots"
                        }
                    }
                }
            }
        }
    });
}

export function getUserB2bObjectFromResponse(response) {
    return {
        id: response.username,
        username: response.username,
        name: response.name,
        contactNumber: response.contactNumber
    };
}

export function getUserB2bParkingSubLotAccessFromResponse(response) {
    return {
        parkingSubLotUserAccesses: response.parkingSubLotUserAccesses
    };
}

export function getUserB2bAccessesFromResponse(response) {
    return {
        userAccesses: response.userAccesses
    };
}

export function indexOfParkingSubLotAccesses(existingParkingSubLotAccesses, parkingSubLotAccess) {
    if (existingParkingSubLotAccesses.length == 0) {
        return -1;
    }
    for (let index = 0; index < existingParkingSubLotAccesses.length; index++) {
        if (existingParkingSubLotAccesses[index].parkingLot.id == parkingSubLotAccess.parkingLotId) {
            return index;
        }
    }
    return -1;

}

export function isParkingSubLotChecked(parkingSubLotId, selectedParkingSubLots) {
    let isSelected = false;
    if (parkingSubLotId && selectedParkingSubLots) {
        for (let count = 0; count < selectedParkingSubLots.length; count++) {
            if (selectedParkingSubLots[count].id == parkingSubLotId) {
                isSelected = true;
                break;
            }
        }
    }
    return isSelected;
}

export function isUserAccessChecked(userAccessObject, selectedUserAccessList) {
    let isChecked = false;
    if (userAccessObject && selectedUserAccessList) {
        for (let count = 0; count < selectedUserAccessList.length; count++) {
            if (userAccessObject.accessTitle == selectedUserAccessList[count].accessTitle) {
                isChecked = true;
                break;
            }
        }
    }
    return isChecked;
}

export function filterOldAndNewUserAccesses(username, previousAccesses, selectedAccesses) {

    let data = {
        username: username,
        oldAccesses: [],
        newAccesses: []
    };
    console.log(previousAccesses, selectedAccesses);
    console.log(previousAccesses == selectedAccesses);
    if (previousAccesses == selectedAccesses) {
        return data;
    }

    if (previousAccesses.length > 0) {
        previousAccesses.map(function (oldAccess) {
            var oldAccessIndex = _.findIndex(selectedAccesses, function (newAccess) {
                return newAccess.accessTitle == oldAccess.accessTitle;
            });

            if (oldAccessIndex === -1) {
                data.oldAccesses.push(oldAccess.accessTitle);
            }
        });
    }

    if (selectedAccesses.length > 0) {
        selectedAccesses.map(function (newAccess) {
            var newAccessIndex = _.findIndex(previousAccesses, function (oldAccess) {
                return oldAccess.accessTitle == newAccess.accessTitle;
            });

            if (newAccessIndex == -1) {
                data.newAccesses.push(newAccess.accessTitle);
            }
        })
    }

    return data;

}

export function addParkingSubLotObjectToParkingSubLotAccessResponse(company, parking, parkingLot, parkingSubLots, response) {
    for (let count = 0; count < response.length; count++) {
        response[count]['company'] = company;
        response[count]['parking'] = parking;
        response[count]['parkingLot'] = parkingLot;
        for (let count2 = 0; count2 < parkingSubLots.length; count2++) {
            if (response[count].parkingSubLotId == parkingSubLots[count2].id) {
                response[count].parkingSubLot = {
                    id: parkingSubLots[count2].id,
                    type: parkingSubLots[count2].type
                };
                break;
            }
        }
    }
    return response;
}

export function getArrayOfIds(array) {
    let ids = [];

    array.map(function (object) {
        ids.push(object.id);
    });

    return ids;
}
