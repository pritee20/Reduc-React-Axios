/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import async from 'async';
import store from '../../store/index';
import {addPricingData, updatePricingDataAfterPriceGridChange} from './actions';

export function getPricingFilter() {
    return JSON.stringify({"include": {"relation": "priceGrids", "scope": {"where": {"deleted": 0}}}});
}
/**
 * get the array of object with startTime and endTime of a particular grid in one slot.
 * one minute is subtracted from endTime
 * @param priceGrids
 * @returns array of objects with keys startTime and endTime
 */
export function getPricingSlotDuration(priceGrids) {
    let currentTime = 0;
    for (let i = 0; i < priceGrids.length; i++) {
        currentTime = currentTime + priceGrids[i].duration;
    }
    return currentTime;
}

/**
 * converts time in minutes to HH:mm ,i.e., 720 ==> 12:00
 * @param minutes integer from 0 to 1439
 * @returns {string}
 */
function convertMinutesToTime(minutes) {

    let hours = "" + (Math.floor(minutes / 60) > 9 ? (Math.floor(minutes / 60)) : ('0' + Math.floor(minutes / 60)));
    let mins = "" + (minutes % 60 > 9 ? (minutes % 60) : ('0' + minutes % 60));
    return hours + ":" + mins;
}
/**
 * Compare two string which denote time in 24 hour format
 * returns boolean value denoting whether startTime is less than endTime
 * @param startTime HH:mm
 * @param endTime HH:mm
 */
export function compareTime(startTime, endTime) {
    return convertTimeToMinutes(endTime) > convertTimeToMinutes(startTime);
}

/**
 * converts time in HH:mm format to minutes of the day
 * @param time in HH:mm format
 */
export function convertTimeToMinutes(time) {
    console.log(time);
    let timeArr = time.split(':');
    let hours = +timeArr[0];
    let min = +timeArr[1];
    if (hours == 0 && min == 0) {
        console.log('well we are here buddyy');
        hours = 23;
        min = 60
    }
    return (hours * 60) + min;

}

export function getOptionsArrayForDayDropDown() {
    let options = [];
    for (let j = 1; j <= 7; j++) {
        options.push({"value": j, "text": convertNumericDayToString(j)});
    }

    return options;
}

/**
 * Get text to display for corresponding day, 0 ==> All days, 1 ==> Monday and so on
 * @param day
 */
export function convertNumericDayToString(day) {
    switch (day) {
        case 0:
        {
            return "All days";
        }
        case 1:
        {
            return "Monday";
        }

        case 2:
        {
            return "Tuesday";
        }
        case 3:
        {
            return "Wednesday";
        }
        case 4:
        {
            return "Thursday";
        }

        case 5:
        {
            return "Friday";
        }
        case 6:
        {
            return "Saturday";
        }
        case 7:
        {
            return "Sunday";
        }


    }
}

export function isPriceGridDataInValid(pricingGridsToBeUpdated, durationData) {
    let totalDuration = 0, length = pricingGridsToBeUpdated.length;
    for (let i = 0; i < length; i++) {
        totalDuration = totalDuration + pricingGridsToBeUpdated[i].duration;
        if (i != length - 1 && pricingGridsToBeUpdated[i].priceStructure.toLowerCase() != "flat") {
            return {"invalid": true, "message": "Only last price grid can have INCREMENTAL price structure"};
        }
    }
    return {
        "invalid": totalDuration != 1440 && pricingGridsToBeUpdated[length - 1].priceStructure.toLowerCase() == "flat",
        "message": "Total Duration must be equal to 1440"
    };
}

export function removeExtraDataFromPricingSlotResponse(pricingSlotResponse) {
    let newData = [];
    let pricingSlotKeys = ['day', 'id', 'parkingSubLotId', 'startMinutesOfDay', 'endMinutesOfDay', 'type'];
    let pricingGridKeys = ['priceStructure', 'cost', 'duration', 'sequenceNumber', 'pricingId', 'id'/*, 'cycles'*/];
    for (let j = 0; j < pricingSlotResponse.length; j++) {


        let oldPricingSlot = pricingSlotResponse[j];

        let pricingSlot = {};

        for (let counter = 0; counter < pricingSlotKeys.length; counter++) {
            let key = pricingSlotKeys[counter];
            pricingSlot[key] = oldPricingSlot[key];
        }

        pricingSlot['priceGrids'] = [];

        if (oldPricingSlot.priceGrids) {
            for (let k = 0; k < oldPricingSlot.priceGrids.length; k++) {
                let oldPriceGrid = oldPricingSlot.priceGrids[k];
                let priceGrid = {};

                for (let secondCounter = 0; secondCounter < pricingGridKeys.length; secondCounter++) {
                    let secondKey = pricingGridKeys[secondCounter];
                    priceGrid[secondKey] = oldPriceGrid[secondKey];
                }

                pricingSlot['priceGrids'].push(priceGrid);
            }
        }
        newData.push(pricingSlot);
    }
    return newData;
}

export function removeExtraDataFromPriceGridResponse(response) {
    let newData = {};
    let pricingGridKeys = ['priceStructure', 'cost', 'duration', 'sequenceNumber', 'pricingId', 'id'];
    for (let count = 0; count < pricingGridKeys.length; count++) {
        let key = pricingGridKeys[count];
        newData[key] = response[key];
    }
    return newData;
}

export function removeExtraDataFromPriceGridArrayResponse(response) {
    let newPriceGrids = [];
    for (let count = 0; count < response.length; count++) {
        newPriceGrids.push(removeExtraDataFromPriceGridResponse(response[count]));
    }
    return newPriceGrids;
}

/**
 * calibrate the cost for specific times as specified in the array and emit action to write to state
 * @param checkinTime
 * @param pricingSlots
 * @param position
 * @param callback
 */
export function calibratePricingData(checkinTime, pricingSlots, position, callback) {
    let priceTable = [{text: "1 hour"}, {text: "4 hours"}, {text: "6 hours"}, {text: "12 hours"}, {text: "24 hours"}];

    let time = [60, 240, 360, 720, 1440];

    let options = {
        checkinTime,
        pricingSlots
    };

    let asyncTasks = [];
    for (let i = 0; i < time.length; i++) {
        asyncTasks.push(function (asyncCallback) {
            options['duration'] = time[i];
            calculateTotalCost(options, function (error, totalCost) {

                if (error) {
                    return asyncCallback(error);
                }

                return asyncCallback(null, {
                    time: i,
                    cost: totalCost
                });
            });
        });
    }

    async.parallel(asyncTasks, function (error, costResults) {
        let durationData = getPricingSlotDuration(pricingSlots[position].priceGrids);
        if (error) {
            console.log(error);
            let show = canAddPriceGridBeShown(pricingSlots[position].priceGrids);
            let data = {
                'pricingSlot': pricingSlots[position],
                'priceTable': [],
                durationData,
                'showAddPriceGridOption': show
            };
            callback(data);
        } else {
            for (let j = 0; j < costResults.length; j++) {
                priceTable[costResults[j]['time']]['cost'] = 'Rs ' + costResults[j]['cost'];
            }
            let show = canAddPriceGridBeShown(pricingSlots[position].priceGrids);
            let data = {
                'pricingSlot': pricingSlots[position],
                priceTable,
                durationData,
                'showAddPriceGridOption': show
            };
            console.log(data);

            callback(data);
        }
    });

}

export function canAddPriceGridBeShown(priceGrids) {
    let duration = 0;
    for (let count = 0; count < priceGrids.length; count++) {
        duration = duration + priceGrids[count].duration;
    }
    return duration < 1440;
}

/**
 * create the state object, called after pricing slots have been fetched from the server
 * @param pricingSlots fetched from the server
 */
export function calibrateState(pricingSlots) {
    let checkInTime = new Date();
    let callback = function (data) {
        store.dispatch(addPricingData(data));
    };
    if (pricingSlots.length == 1) {
        console.log('length of the pricingSLots is 1');
        calibratePricingData(checkInTime, pricingSlots, 0, callback);
    } else {
        console.log('length of the pricing slots is  ', pricingSlots.length);
        let currentDay = checkInTime.getDay() + 1;
        for (let counter = 0; counter < pricingSlots.length; counter++) {

            let hourToBeAdded = 0;
            if (currentDay > pricingSlots[counter].day) {
                hourToBeAdded = (24 * (pricingSlots[counter].day + 7 - currentDay)) + checkInTime.getHours();
            } else {
                hourToBeAdded = 24 * (pricingSlots[counter].day - currentDay) + checkInTime.getHours();
            }
            let correspondingDate = new Date(checkInTime);
            correspondingDate.setHours(hourToBeAdded);
            calibratePricingData(checkInTime, pricingSlots, counter, callback);
        }
    }
}

export function priceGridsChangedUpdatePricingData(pricingSlots, dayToBeUpdated, position) {

    let currentDate = new Date();
    let currentDay = currentDate.getDay() + 1;
    let callback = function (data) {
        store.dispatch(updatePricingDataAfterPriceGridChange(data, position, dayToBeUpdated));
    };

    let newDate = new Date(currentDate);

    if (dayToBeUpdated != 0) {
        if (currentDay > dayToBeUpdated) {
            let hours = (dayToBeUpdated + 7 - currentDay) * 24;
            newDate.setHours(currentDate.getHours() + hours);
        } else {
            let hours = (dayToBeUpdated - currentDay) * 24;
            newDate.setHours(currentDate.getHours() + hours);
        }
        calibratePricingData(newDate, pricingSlots, position, callback);
    } else {
        calibratePricingData(newDate, pricingSlots, position, callback);
    }
}


export var calculateTotalCost = function (options, callback) {

    try {
        // checkinTime is in IST
        // duration is in minutes
        if (!options || !options.pricingSlots || !options.checkinTime || !options.duration) {
            return callback('required parameters missing');
        }

        var checkInTime, checkOutTime, pricingSlots = {}, cost = 0, normalSlots = {}, specialSlots = {};

        // convert the array of slots into a map indexed by day.
        // this returns an object of arrays.
        // e.g.
        /* {
         "1" :[
         {
         day : 1,
         startMinutesOfDay : 0
         ...
         },
         {
         day : 1,
         startMinutesOfDay : 0
         ...
         }
         ],
         "2" :[
         {
         day : 2
         ...
         }
         ]
         }
         */
        //console.log(options.checkinTime);
        //console.log("checkinTime: " + moment(options.checkinTime).format());
        pricingSlots = _.groupBy(options.pricingSlots, "day");
        checkInTime = moment(options.checkinTime).add(5, 'hours').add(30, 'minutes').seconds(0); // to IST // FIXME should be dynamic
        checkOutTime = moment(checkInTime).add(options.duration, 'minutes');

        //console.log("IST checkin Time: " + checkInTime.format());
        //console.log("IST checkout time: "+ checkOutTime.format());

        // traverse over the pricingSlots object to find normal and special slots day wise.
        for (var pricingSlotByDaysElement in pricingSlots) {
            if (pricingSlots.hasOwnProperty(pricingSlotByDaysElement)) {
                var normalSlotsArray = [], specialSlotsArray = [];
                pricingSlots[pricingSlotByDaysElement].forEach(function (pricingSlot) {
                    if (pricingSlot.type.toUpperCase() === 'NORMAL') {
                        normalSlotsArray.push(pricingSlot);
                    } else {
                        specialSlotsArray.push(pricingSlot);
                    }
                });

                if (normalSlotsArray.length > 0) {
                    normalSlots[pricingSlotByDaysElement] = normalSlotsArray;
                }

                if (specialSlotsArray.length > 0) {
                    specialSlots[pricingSlotByDaysElement] = specialSlotsArray;
                }
            }
        }


        var asyncTasks = [];

        asyncTasks.push(function (asyncCallback) {
            //console.log("calculating cost for normal slots");
            //console.log("checkintime: " +checkInTime.format());

            calculateCost({
                slots: normalSlots,
                checkInTime: checkInTime,
                checkOutTime: checkOutTime
            }, function (err, calculatedCost) {
                if (err) {
                    process.nextTick(function () {
                        return asyncCallback(err);
                    });
                } else {
                    //console.log("cost from normal slots: " + calculatedCost);
                    process.nextTick(function () {
                        return asyncCallback(null, calculatedCost);
                    });
                }
            });
        });

        if (Object.keys(specialSlots).length) {
            asyncTasks.push(function (asyncCallback) {

                calculateCost({
                    slots: specialSlots,
                    checkInTime: checkInTime,
                    checkOutTime: checkOutTime
                }, function (err, calculatedCost) {
                    if (err) {
                        return asyncCallback(err);
                    } else {
                        //console.log("cost from night slots: " + calculatedCost);
                        return asyncCallback(null, calculatedCost);
                    }
                });
            });
        }
    } catch (ex) {
        return callback(ex);
    }

    async.series(asyncTasks, function (err, slotCosts) {
        if (err) {
            process.nextTick(function () {
                return callback(err);
            });
        } else {
            if (!slotCosts) {
                return callback(null, 0);
            } else {
                var totalCost = 0;
                slotCosts.forEach(function (cost) {
                    totalCost += cost;
                });
                //console.log("sending back total cost :  " + totalCost);
                process.nextTick(function () {
                    return callback(null, totalCost);
                });
            }
        }
    });

};

var calculateCost = function (options, callback) {

    try {

        if (!options.slots || !options.checkInTime || !options.checkOutTime) {
            return callback("required parameters not found");
        }

        var cost = 0,
            index = 1,
            currentTime = moment(options.checkInTime),
            checkOutTime = moment(options.checkOutTime),
            day = currentTime.day(), /* get the day of the week using moment's api day() .
         days in database have been set in java day chronology  (1 = monday, 7 = sunday).
         moment uses the same chronology therefore there is no need to convert. */
            allSlots = options.slots,
            daySlots,
            checkInMinute,
            currentMinutes = function (date) {
                return parseInt((date.hours() * 60) + date.minutes());
            };

        if (isNaN(currentTime)) {
            var error = new Error("incorrect format for checkin Time");
            return callback(error);
        }

        // if total slot size is 1 and slot endMinutesOfDay is 0, its a flat pricing.
        if (Object.keys(allSlots).length === 1 && allSlots[0][0].endMinutesOfDay === 0) {
            //console.log('this is flat pricing');
            var flatOptions = {
                pricingSlot: allSlots[0][0],
                checkInTime: options.checkInTime,
                checkOutTime: options.checkOutTime
            };
            flatCost(flatOptions, function (err, flatPricing) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, flatPricing);
                }
            });
        } else {

            //console.log("this is not a flat pricing");

            // find all the slots for today day.
            daySlots = allSlots[day];

            // if slots are not found for today, select 0th day slots (0th day means all days)
            if (typeof daySlots === 'undefined') {
                daySlots = allSlots[0];
            }

            daySlots = _.sortBy(daySlots, "startMinutesOfDay");
            checkInMinute = currentMinutes(currentTime);
            //console.log("checkinTime minute", checkInMinute);

            var currentPricingSlot = daySlots[0];

            for (var i = 0; i < daySlots.length; i = i + 1) {
                var pricingSlot = daySlots[i];
                // select the pricing slot of the checkin Minute lies between start minute and end minute of pricing slot
                if (pricingSlot.startMinutesOfDay <= checkInMinute &&
                    pricingSlot.endMinutesOfDay > checkInMinute) {
                    currentPricingSlot = pricingSlot;
                    index = i + 1;
                    break;
                }
            }

            var currentPriceGrids = _.sortBy(currentPricingSlot.priceGrids, "sequenceNumber");
            var currentPriceGrid = currentPriceGrids[0];
            var priceGridIndex = 0;
            if (currentPricingSlot.type.toUpperCase() !== 'NORMAL') {
                if (currentPricingSlot.startMinutesOfDay > checkInMinute || currentPricingSlot.endMinutesOfDay < checkInMinute) {

                    for (var j = 0; i < daySlots.length; j = j + 1) {
                        pricingSlot = daySlots[j];
                        if (currentPricingSlot.startMinutesOfDay > checkInMinute) {
                            currentPricingSlot = pricingSlot;
                            index = j + 1;
                            break;
                        }

                    }

                    if (currentPricingSlot.startMinutesOfDay > checkInMinute) {
                        currentTime = currentTime.add((currentPricingSlot.startMinutesOfDay - checkInMinute), 'minutes');
                    } else {
                        currentTime = currentTime.add((1440 - checkInMinute), 'minutes');
                    }

                }
            }

            //console.log("current Price grid");

            while (currentTime.isBefore(moment(checkOutTime).subtract(1, 'minutes'))) {
                //console.log("current Time", currentTime.format());
                //console.log("checkout Time", checkOutTime.format());
                //console.log("printing current price grid");
                //console.log(currentPriceGrid);

                // if the duration of priceGrid is 0, the priceGrids are deformed.
                if (currentPriceGrid.duration === 0) {
                    return callback(null, 0);
                }
                cost += currentPriceGrid.cost;

                var newCurrentTime = moment(currentTime).add(parseInt(currentPriceGrid.duration), "minutes");
                // console.log("new current Time", newCurrentTime.format());
                checkInMinute = currentMinutes(newCurrentTime);

                if (newCurrentTime.day() === currentTime.day() &&
                    currentPricingSlot.startMinutesOfDay <= checkInMinute &&
                    currentPricingSlot.endMinutesOfDay > checkInMinute
                ) {
                    // console.log("entering case 1");
                    priceGridIndex = (priceGridIndex === (currentPriceGrids.length - 1)) ? priceGridIndex : priceGridIndex + 1;
                    currentPriceGrid = currentPriceGrids[priceGridIndex];
                    currentTime = newCurrentTime;
                } else if (newCurrentTime.day() === currentTime.day() && pricingSlot.length > index) {
                    // console.log("entering case 2");
                    var endMinutesOfCurrentSlot = currentPricingSlot.endMinutesOfDay;
                    index = index + 1;
                    currentPricingSlot = pricingSlot[index];
                    currentPriceGrids = currentPricingSlot.priceGrids;
                    currentPriceGrid = _.sortBy(currentPriceGrids, "sequenceNumber");
                    currentPriceGrid = currentPriceGrids[0];
                    priceGridIndex = 0;
                    currentTime = currentTime.add(endMinutesOfCurrentSlot - currentMinutes(currentTime), "minutes");

                    if (currentPricingSlot.type.toUpperCase() !== "NORMAL") {
                        if (currentPricingSlot.startMinutesOfDay > currentMinutes(currentTime)) {
                            currentTime = currentTime.add(currentPricingSlot.startMinutesOfDay - currentMinutes(currentTime), "minutes");
                        } else {
                            currentTime = currentTime.add(1440 - currentMinutes(currentTime), "minutes");
                        }
                    }
                } else {
                    // console.log("entering case 3");
                    var endMinutesOfCurrentSlot = currentPricingSlot.endMinutesOfDay;
                    var nextDay = (day % 7) + 1;
                    daySlots = options.slots[nextDay];
                    if (typeof daySlots === 'undefined') {
                        daySlots = options.slots[0];
                    }
                    daySlots = _.sortBy(daySlots, "startMinutesOfDay");
                    currentPricingSlot = daySlots[0];
                    index = 1;
                    currentPriceGrids = currentPricingSlot.priceGrids;
                    currentPriceGrids = _.sortBy(currentPriceGrids, "sequenceNumber");
                    currentPriceGrid = currentPriceGrids[0];
                    priceGridIndex = 0;
                    // console.log("price grid set in case 3");
                    console.log(currentPriceGrid);
                    currentTime = currentTime.add(endMinutesOfCurrentSlot - currentMinutes(currentTime), "minutes");

                    if (currentPricingSlot.type.toUpperCase() !== 'NORMAL') {
                        if (currentPricingSlot.startMinutesOfDay > currentMinutes(currentTime)) {
                            currentTime = currentTime.add(currentPricingSlot.startMinutesOfDay - currentMinutes(currentTime), "minutes");
                        } else {
                            currentTime = currentTime.add(1440 - currentMinutes(currentTime), "minutes");
                        }
                    }
                }
            }

            //console.log("cost calculated");
            //console.log('cost :' + cost);
            return callback(null, cost);
        }
    } catch (ex) {
        console.log(ex);
        //console.log(ex.stack);
        //console.log("there is an error");
        //console.log(ex);
        return callback(ex);
    }

};

var flatCost = function (options, callback) {
    if (!options.pricingSlot || !options.checkInTime || !options.checkOutTime) {
        return callback("required Parameters missing");
    }

    //console.log(options.pricingSlot);

    var cost = 0,
        currentTime = moment(options.checkInTime),
        checkOutTime = moment(options.checkOutTime),
        currentPriceGrids = options.pricingSlot.priceGrids,
        currentPriceGrid,
        priceGridIndex = 0;

    currentPriceGrids = _.sortBy(currentPriceGrids, "sequenceNumber");
    currentPriceGrid = currentPriceGrids[0];


    while (currentTime.isBefore(moment(checkOutTime).subtract(1, 'minutes'))) {

        if (currentPriceGrid.duration === 0) {
            return callback(null, 0);
        }

        cost += currentPriceGrid.cost;
        var newCurrentTime = moment(currentTime).add(currentPriceGrid.duration, "minutes");

        var diff = moment.duration(newCurrentTime.diff(moment(options.checkInTime))).asSeconds();
        if (( diff % 86400) === 0) {
            priceGridIndex = 0;
            currentPriceGrid = currentPriceGrids[priceGridIndex];
            currentTime = newCurrentTime;
        } else {
            priceGridIndex = (priceGridIndex === (currentPriceGrids.length - 1)) ? priceGridIndex : priceGridIndex + 1;
            currentPriceGrid = currentPriceGrids[priceGridIndex];
            currentTime = newCurrentTime;
        }
    }

    return callback(null, cost);

};
