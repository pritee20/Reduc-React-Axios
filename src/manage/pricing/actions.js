/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import Path from '../../../config/project.config.js';

import actionType from './actionTypes';

import {
    getPricingFilter,
    calibratePricingData,
    convertTimeToMinutes,
    removeExtraDataFromPricingSlotResponse,
    calibrateState, removeExtraDataFromPriceGridArrayResponse,
    priceGridsChangedUpdatePricingData,
    removeExtraDataFromPriceGridResponse
} from './helpers';

export function getPricingSlotsBySubLotId(parkingSubLotId) {
    return function (dispatch, getState) {
        let url = `${Path.API_end}ParkingSubLots/${parkingSubLotId}/pricingSlots?filter=` + encodeURIComponent(getPricingFilter());
        return fetch(url, {
            method: 'GET',
            headers: {'Authorization': getState().user.token}
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                calibrateState(removeExtraDataFromPricingSlotResponse(response));
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function clearPricingState() {
    return {
        type: actionType.CLEAR_PRICING_STATE
    };
}

export function priceGridsHaveBeenChanged(slotIndex) {
    return function (dispatch, getState) {
        let pricingSlots = [];
        let data = getState().manage.pricing.data;
        for (let count = 0; count < data.length; count++) {
            pricingSlots.push(data[count].pricingSlot);
        }
        priceGridsChangedUpdatePricingData(pricingSlots, pricingSlots[slotIndex].day, slotIndex);
    };
}


export function addPricingData(data) {
    return {
        type: actionType.SET_PRICING_STATE,
        data
    };
}

export function updatePricingTable() {
    return function (dispatch, getState) {
        calibratePricingData(new Date(), getState().manage.pricing.pricingSlots);
    }
}

export function updatePriceGrid(slotIndex, postListener) {
    return function (dispatch, getState) {
        let options = getState().manage.pricing.data[slotIndex].pricingSlot.priceGrids;
        let url = `${Path.API_end}PriceGrids/bulk`;
        return fetch(url, {
            method: 'PUT',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(options)
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                console.log("Successfully updated the pricing grids ", response);
                postListener();
            })
            .catch(error => {
                console.log(error);
            });

    }
}

export function updatePricingDataAfterPriceGridChange(data, slotIndex, dayToBeUpdated) {
    console.log('now we send the data to be written to state ', data, ' and slotIndex is ', slotIndex, ' and day to be updated is '.dayToBeUpdated);
    return {
        type: actionType.UPDATE_PRICING_TABLE_AFTER_PRICE_GRID_UPDATE,
        data, slotIndex, dayToBeUpdated
    };
}

export function createOnePricingSlotForAllDays(parkingSubLotId, successListener) {
    return function (dispatch, getState) {
        let pricingSlot = {
            "day": 0,
            "startMinutesOfDay": 0,
            "endMinutesOfDay": 1440,
            parkingSubLotId,
            "type": "NORMAL"
        };
        let url = `${Path.API_end}PricingSlots`;
        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(pricingSlot)
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                console.log("Successfully created the pricing slot ", response);
                let arr = [response];

                calibrateState(removeExtraDataFromPricingSlotResponse(arr));
                successListener();
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function hideAddPriceGridButton(position) {
    return {
        type: actionType.HIDE_ADD_PRICE_GRID_OPTION,
        position
    };
}

export function createSevenPricingSlots(parkingSubLotId, successListener) {
    return function (dispatch, getState) {
        let pricingSlots = [];
        for (let j = 1; j <= 7; j++) {
            let pricingSlot = {
                "day": j,
                "startMinutesOfDay": 0,
                "endMinutesOfDay": 1440,
                parkingSubLotId,
                "type": "NORMAL"
            };
            pricingSlots.push(pricingSlot);
        }
        let url = `${Path.API_end}PricingSlots`;
        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(pricingSlots)
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                console.log("Successfully created multiple pricing slots ", response);
                calibrateState(removeExtraDataFromPricingSlotResponse(response));
                successListener();
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function createNewPriceGrid(currentIndex, postListener) {
    return function (dispatch, getState) {
        let pricingSlot = getState().manage.pricing.data[currentIndex].pricingSlot;
        console.log('pricingSlot is ', pricingSlot);
        let currentDuration = 0;
        for (let count = 0; count < pricingSlot.priceGrids.length; count++) {
            currentDuration = currentDuration + pricingSlot.priceGrids[count].duration;
        }
        currentDuration = 1440 - currentDuration;
        let priceGrid = {
            "priceStructure": "FLAT",
            "cost": 0,
            "duration": currentDuration,
            "pricingId": pricingSlot.id,
            "sequenceNumber": pricingSlot.priceGrids.length + 1
        };
        console.log('price grid being created is ', priceGrid);
        let url = `${Path.API_end}PriceGrids `;
        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(priceGrid)
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                console.log("Successfully created singe price grid ", response);
                dispatch(newPriceGridCreated(response, currentIndex));
                postListener();
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function newPriceGridCreated(response, dataIndex) {
    let cleanPriceGrid = removeExtraDataFromPriceGridResponse(response);
    console.log(cleanPriceGrid);
    return {
        type: actionType.NEW_PRICE_GRID_CREATED,
        dataIndex,
        priceGrid: cleanPriceGrid
    };
}

export function createPriceGrids(priceGrids, pricingSlotPosition) {
    return function (dispatch, getState) {
        let url = `${Path.API_end}PriceGrids `;
        return fetch(url, {
            method: 'POST',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(priceGrids)
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                console.log("Successfully created multiple price grids ", response);
                let data = getState().manage.pricing.data;
                let newPricingSlots = [];
                for (let count = 0; count < data.length; count++) {
                    newPricingSlots.push(data[count].pricingSlot);
                    if (count == pricingSlotPosition) {
                        newPricingSlots[count].priceGrids = removeExtraDataFromPriceGridArrayResponse(response);
                    }
                }
                console.log('new pricing slots are ', newPricingSlots);
                let callback = function (data) {
                    dispatch(updatePricingDataAfterPriceGridChange(data, pricingSlotPosition));
                };
                let currentDate = new Date();
                let currentDay = currentDate.getDay() + 1;
                let hours = (newPricingSlots[pricingSlotPosition].day - currentDay) * 24;
                if (currentDay > newPricingSlots[pricingSlotPosition].day) {
                    hours = (currentDay + 7 - newPricingSlots[pricingSlotPosition].day) * 24;
                }
                let checkInDate = new Date(currentDate);
                checkInDate.setHours(currentDate.getHours() + hours);
                calibratePricingData(checkInDate, newPricingSlots, pricingSlotPosition, callback);
            })
            .catch(error => {
                console.log(error);
            });

    }
}

export function deletePriceGrids(pricingSlotPosition, dayFromWhichPriceGridsHaveToBeCopied, postListener) {
    return function (dispatch, getState) {
        let priceGrids = getState().manage.pricing.data[pricingSlotPosition].pricingSlot.priceGrids;
        let options = priceGrids.map(function (item) {
            return {'id': item.id};
        });
        let url = `${Path.API_end}PriceGrids/bulkDelete`;
        console.log(JSON.stringify({options}));
        return fetch(url, {
            method: 'PUT',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(options)
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                console.log("Successfully deleted multiple price grids ", response);
                let pricingId = getState().manage.pricing.data[pricingSlotPosition].pricingSlot.id;
                dispatch(copyPriceGrids(pricingSlotPosition, pricingId, dayFromWhichPriceGridsHaveToBeCopied));
                postListener();
            })
            .catch(error => {
                console.log(error);
            });
    };
}


export function copyPriceGrids(pricingSlotPosition, pricingId, dayFromWhichPriceGridsHaveToBeCopied) {
    return function (dispatch, getState) {
        let priceGrids = [];
        console.log({pricingSlotPosition, pricingId, dayFromWhichPriceGridsHaveToBeCopied});
        let data = getState().manage.pricing.data;
        console.log(' initially data is ', data);
        for (let count = 0; count < data.length; count++) {
            if (data[count].pricingSlot.day == dayFromWhichPriceGridsHaveToBeCopied) {
                priceGrids = JSON.parse(JSON.stringify(data[count].pricingSlot.priceGrids));
                break;
            }
        }

        for (let count = 0; count < priceGrids.length; count++) {
            priceGrids[count].pricingId = pricingId;
            delete priceGrids[count].id;
        }
        console.log(' after deletion data is ', data);
        console.log('new price grids about to be created ', priceGrids);
        if (priceGrids.length != 0) {
            dispatch(createPriceGrids(priceGrids, pricingSlotPosition));
        }
    };
}


export function setGridCost(slotIndex, gridIndex, value) {
    console.log(actionType.SET_GRID_COST);
    return {
        slotIndex,
        gridIndex,
        value,
        type: actionType.SET_GRID_COST
    }
}
export function setGridDuration(slotIndex, gridIndex, value) {
    return {
        slotIndex,
        gridIndex,
        value,
        type: actionType.SET_GRID_DURATION
    }
}
export function setGridStructure(slotIndex, gridIndex, value) {
    return {
        slotIndex,
        gridIndex,
        value,
        type: actionType.SET_GRID_STRUCTURE
    };
}
export function setPricingTableData(data) {
    return {
        type: actionType.SET_PRICING_TABLE_DATA,
        data: data
    };
}

export function deletePricingSlot(position, postDeleteListener) {
    return function (dispatch, getState) {
        let pricingSlot = getState().manage.pricing.data[position].pricingSlot;
        pricingSlot['deleted'] = 1;
        let url = `${Path.API_end}PricingSlots/bulkDelete`;
        let options = [pricingSlot];
        return fetch(url, {
            method: 'PUT',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(options)
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                postDeleteListener();
                let pricingSlots = [];
                let oldData = getState().manage.pricing.data;
                for (let count = 0; count < oldData.length; count++) {
                    if (count != position) {
                        pricingSlots.push(oldData[count].pricingSlot);
                    }
                }
                dispatch(clearPricingState());
                calibrateState(pricingSlots);
            })
            .catch(error => {
                console.log(error);
            });

    };
}

export function deletePriceGrid(slotIndex, gridIndex, postDeletionListener) {
    return function (dispatch, getState) {
        let priceGrid = getState().manage.pricing.data[slotIndex].pricingSlot.priceGrids[gridIndex];
        let options = [priceGrid];
        let url = `${Path.API_end}PriceGrids/bulkDelete`;
        return fetch(url, {
            method: 'PUT',
            headers: {'Authorization': getState().user.token, 'Content-Type': 'application/json'},
            body: JSON.stringify(options)
        }).then(response => response.ok ? response.json() : response.json().then(errorResponse => Promise.reject(errorResponse.error)))
            .then(response => {
                dispatch(removePriceGrid(gridIndex, slotIndex));
                dispatch(updatePriceGrid(slotIndex, function () {
                    let pricingSlots = [];

                    let data = getState().manage.pricing.data;
                    for (let count = 0; count < data.length; count++) {
                        pricingSlots.push(data[count].pricingSlot);
                    }
                    dispatch(clearPricingState());
                    calibrateState(pricingSlots);
                }));
            })
            .catch(error => {
                console.log(error);
            });

    };
}


export function removePriceGrid(gridIndex, slotIndex) {
    return {
        type: actionType.REMOVE_PRICE_GRID,
        gridIndex, slotIndex
    };
}

