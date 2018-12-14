/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import {createSelector} from 'reselect';
import {indexOfParkingSubLotAccesses, isParkingSubLotChecked, isUserAccessChecked} from './helper';


const getUserB2BCount = (state) => {
    if (state.manage.user && state.manage.user.count) {
        return state.manage.user.count;
    } else {
        return 0;
    }
};

const getUserB2BPageCount = (userB2BCount) => {
    let userB2BperPage = 10;
    return userB2BCount % userB2BperPage != 0 ? parseInt(userB2BCount / userB2BperPage) + 1 : parseInt(userB2BCount / userB2BperPage);

};

export const getUserB2BTablePages = createSelector(getUserB2BCount, getUserB2BPageCount);

const parkingSubLotAccesses = state => state.manage.user.userB2bParkingSubLotAccess;

const getParkingSubLotAccessesFromState = (parkingSubLotAccesses) => {
    if (parkingSubLotAccesses) {
        let modifiedParkingSubLotAccesses = [];

        for (let count = 0; count < parkingSubLotAccesses.length; count++) {
            let index = indexOfParkingSubLotAccesses(modifiedParkingSubLotAccesses, parkingSubLotAccesses[count]);
            if (index == -1) {
                let parkingSubLotAccessObject = {
                    company: parkingSubLotAccesses[count].company,
                    parking: parkingSubLotAccesses[count].parking,
                    parkingLot: parkingSubLotAccesses[count].parkingLot,
                    parkingSubLots: [{
                        type: parkingSubLotAccesses[count].parkingSubLot.type,
                        id: parkingSubLotAccesses[count].parkingSubLot.id,
                        accessId: parkingSubLotAccesses[count].id
                    }]
                };
                modifiedParkingSubLotAccesses.push(parkingSubLotAccessObject);
            } else {
                modifiedParkingSubLotAccesses[index].parkingSubLots.push({
                    type: parkingSubLotAccesses[count].parkingSubLot.type,
                    id: parkingSubLotAccesses[count].parkingSubLot.id,
                    accessId: parkingSubLotAccesses[count].id
                });
            }
        }
        console.log('modified array is ', modifiedParkingSubLotAccesses);
        return modifiedParkingSubLotAccesses;
    } else {
        return [];
    }
};

export const getParkingSubLotAccesses = createSelector(parkingSubLotAccesses, getParkingSubLotAccessesFromState);


const getSelectedCompany = state => state.manage.user.selectedCompany;

const getParkingsOptionsArray = (selectedCompany) => {
    let options = [];
    if (selectedCompany) {
        for (let count = 0; count < selectedCompany.parkings.length; count++) {
            options.push({
                value: selectedCompany.parkings[count].id,
                text: selectedCompany.parkings[count].name
            });
        }
    }
    return options;
};

const getSelectedParkingId = state => state.manage.user.selectedParkingId;

const getParkingLotsOptionsArray = (selectedCompany, selectedParkingId) => {
    let options = [];
    if (selectedCompany && selectedCompany.parkings && selectedParkingId) {
        for (let count = 0; count < selectedCompany.parkings.length; count++) {
            if (selectedCompany.parkings[count].id == selectedParkingId) {
                for (let count2 = 0; count2 < selectedCompany.parkings[count].parkingLots.length; count2++) {
                    options.push({
                        value: selectedCompany.parkings[count].parkingLots[count2].id,
                        text: selectedCompany.parkings[count].parkingLots[count2].name
                    });

                }
                break;
            }
        }
    }
    console.log('options array is ', options);
    return options;
};

export const getParkingDropDownOptions = createSelector(getSelectedCompany, getParkingsOptionsArray);

export const getParkingLotsDropDownOptions = createSelector(getSelectedCompany, getSelectedParkingId, getParkingLotsOptionsArray);

const getSelectedParkingLotId = state => state.manage.user.selectedParkingLotId;

const getSelectedParkingSubLots = state => state.manage.user.selectedParkingSubLots;

const getParkingSubLotsArray = (selectedCompany, selectedParkingId, selectedParkingLotId, selectedParkingSubLots) => {
    let options = [];
    if (selectedCompany && selectedParkingId && selectedParkingLotId
        && selectedCompany.parkings) {
        for (let count = 0; count < selectedCompany.parkings.length; count++) {
            if (selectedCompany.parkings[count].id == selectedParkingId && selectedCompany.parkings[count].parkingLots) {
                for (let count2 = 0; count2 < selectedCompany.parkings[count].parkingLots.length; count2++) {
                    if (selectedCompany.parkings[count].parkingLots[count2].id == selectedParkingLotId) {
                        for (let count3 = 0; count3 < selectedCompany.parkings[count].parkingLots[count2].parkingSubLots.length; count3++) {
                            options.push({
                                value: selectedCompany.parkings[count].parkingLots[count2].parkingSubLots[count3].id,
                                text: selectedCompany.parkings[count].parkingLots[count2].parkingSubLots[count3].type,
                                isChecked: isParkingSubLotChecked(selectedCompany.parkings[count].parkingLots[count2].parkingSubLots[count3].id, selectedParkingSubLots),
                                data: selectedCompany.parkings[count].parkingLots[count2].parkingSubLots[count3]
                            });
                        }
                        break;
                    }

                }
                break;
            }
        }
    }
    console.log('options array for parkingSubLots is ', options);
    return options;
};


export const getParkingSubLotsOptions = createSelector(getSelectedCompany, getSelectedParkingId, getSelectedParkingLotId, getSelectedParkingSubLots, getParkingSubLotsArray);

const getUserAccessList = state => state.manage.user.selectedUserAccesses;

const getAccessList = state => state.manage.user.allPermissions;


const getUserAccessesOptionsArray = (accessList, userAccesses) => {
    let options = [];
    if (userAccesses && accessList && accessList.length > 0) {
        for (let count = 0; count < accessList.length; count++) {
            options.push({
                value: accessList[count].accessTitle,
                text: accessList[count].accessTitle,
                isChecked: isUserAccessChecked(accessList[count], userAccesses),
                data: accessList[count]
            });
        }
    }
    return options;
};

export const getUserAccessesOptions = createSelector(getAccessList, getUserAccessList, getUserAccessesOptionsArray);

const canEnableAddParkingSubLotAccessButton = (selectedCompany, selectedParkingId, selectedParkingLotId, selectedParkingSubLots) => {
    let isEnabled = false;
    if (selectedCompany && selectedParkingId && selectedParkingLotId && selectedParkingSubLots && selectedParkingSubLots.length > 0 && selectedCompany.parkings && selectedCompany.parkings.length > 0) {
        for (let count = 0; count < selectedCompany.parkings.length; count++) {
            if (selectedCompany.parkings[count].id == selectedParkingId && selectedCompany.parkings[count].parkingLots) {
                for (let count2 = 0; count2 < selectedCompany.parkings[count].parkingLots.length; count2++) {
                    if (selectedCompany.parkings[count].parkingLots[count2].id == selectedParkingLotId && selectedCompany.parkings[count].parkingLots[count2].parkingSubLots) {
                        for (let count3 = 0; count3 < selectedCompany.parkings[count].parkingLots[count2].parkingSubLots.length; count3++) {
                            if (isParkingSubLotChecked(selectedCompany.parkings[count].parkingLots[count2].parkingSubLots[count3].id, selectedParkingSubLots)) {
                                isEnabled = true;
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
    return isEnabled;
};

export const isAddParkingSubLotAccessButtonEnabled = createSelector(getSelectedCompany, getSelectedParkingId, getSelectedParkingLotId, getSelectedParkingSubLots, canEnableAddParkingSubLotAccessButton);

