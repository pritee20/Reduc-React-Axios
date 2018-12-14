/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import actionType from './actionTypes';

const initialState = {
    data: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionType.CLEAR_PRICING_STATE:
        {
            return Object.assign({}, state, {
                data: []
            });
        }

        case actionType.UPDATE_PRICING_TABLE_AFTER_PRICE_GRID_UPDATE:
        {
            let newState = JSON.parse(JSON.stringify(state));
            console.log('the action object is ', action);
            newState.data[action.slotIndex] = action.data;
            return newState;
        }


        case actionType.NEW_PRICE_GRID_CREATED:
        {
            console.log(action);
            let newState = JSON.parse(JSON.stringify(state));
            newState.data[action.dataIndex].pricingSlot.priceGrids.push(action.priceGrid);
            newState.data[action.dataIndex].durationData = newState.data[action.dataIndex].durationData + action.priceGrid.duration;
            return newState;
        }

        case actionType.SET_PRICING_STATE:
        {
            let newState = JSON.parse(JSON.stringify(state));
            // let flag = false;
            for (let j = 0; j < newState.data.length; j++) {
                /**
                 * We cannot set data to be null, data needs to be emptied every time
                 * there is a new parkingSubLot. If you go away from the page and come
                 * back to the page then it'll just add the existing parkingSubLot to the array.
                 */
                if (newState.data[j].pricingSlot.parkingSubLotId != action.data.pricingSlot.parkingSubLotId ||
                    newState.data[j].pricingSlot.id == action.data.pricingSlot.id) {
                    // flag = true;
                    newState.data = [];
                    break;
                }
            }
            // if (flag) {
            //     newState.data = [];
            // }
            newState.data.push(action.data);
            return newState;
        }
        case actionType.SET_GRID_COST:
        {
            let newObj = JSON.parse(JSON.stringify(state));
            console.log(newObj, action.slotIndex);
            newObj.data[action.slotIndex].pricingSlot.priceGrids[action.gridIndex].cost = action.value;
            return newObj;
        }
        case actionType.SET_GRID_DURATION:
        {
            let newObj = JSON.parse(JSON.stringify(state));
            newObj.data[action.slotIndex].pricingSlot.priceGrids[action.gridIndex].duration = action.value;
            return newObj;
        }
        case actionType.SET_GRID_STRUCTURE:
        {
            let newObj = JSON.parse(JSON.stringify(state));
            newObj.data[action.slotIndex].pricingSlot.priceGrids[action.gridIndex].priceStructure = action.value;
            return newObj;
        }


        case actionType.HIDE_ADD_PRICE_GRID_OPTION:
        {
            let newObj = JSON.parse(JSON.stringify(state));
            newObj.data[action.position].showAddPriceGridOption = false;
            return newObj;
        }

        case actionType.REMOVE_PRICE_GRID:
        {
            let newState = JSON.parse(JSON.stringify(state));
            let deletedPriceGrid = newState.data[action.slotIndex].pricingSlot.priceGrids[action.gridIndex];
            let newPriceGrids = newState.data[action.slotIndex].pricingSlot.priceGrids.filter(function (priceGrid) {
                if (priceGrid.sequenceNumber > deletedPriceGrid.sequenceNumber) {
                    let newSequenceNumber = priceGrid.sequenceNumber - 1;
                    priceGrid.sequenceNumber = newSequenceNumber;
                }
                return priceGrid.id != deletedPriceGrid.id;
            });
            newState.data[action.slotIndex].pricingSlot.priceGrids = newPriceGrids;
            return newState;
        }

        case "@@router/LOCATION_CHANGE":
        {
            if ((action.payload.action == "PUSH" || action.payload.action == "POP") && action.payload.pathname.indexOf("/pricing") != 0) {
                return {
                    data: []
                };
            } else {
                return state;
            }
        }


        default :
            return state;
    }
}
