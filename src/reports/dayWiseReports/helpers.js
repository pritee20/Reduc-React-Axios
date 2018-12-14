/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

/**
 * Date Formatting Function
 * @param {Date} date Date object
 * @returns {string} Returns Date string in DD-MM-YYYY format
 */
function processDate(date) {
	let day = (date.getDate()).toString();
	let month = (date.getMonth()+1).toString();
	day = day.length < 2 ? `0${day}` : day;
	month = month.length < 2 ? `0${month}` : month;
	return (`${day}-${month}-${date.getFullYear()}`);
}
/**
 * Generates intermediate dates for the given start and end period.
 * @param {Date} startDate Starting Date
 * @param {Date} endDate Ending Date
 * @returns {Array} of Dates between the given interval (including start and end date).
 */
export function generateDates(startDate,endDate) {
	let minDate = new Date(startDate);
	let maxDate = new Date(endDate);
	let between = [];
	while (minDate < maxDate) {
		between.push(processDate(new Date(minDate)));
		minDate.setDate(minDate.getDate() + 1);       
	}
	return between;
}
