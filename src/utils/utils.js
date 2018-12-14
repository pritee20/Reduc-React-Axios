/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

/**
 * Convert values to their intended real values.
 * @param {number|null|undefined|boolean} value
 * @returns {boolean|number|*}
 */
export function convertType(value) {
    var values = {undefined: undefined, null: null, true: true, false: false}, isNumber = !isNaN(+(value));
    return isNumber && +(value) || !(value in values) && value || values[value];
}
export function setFloatPrecision(floatVal, Precision) {
    return parseFloat(floatVal.toFixed(Precision));
}

export function segmentation(totalPages, currentPage) {
    let beginPages = [], previousPages = [], centerPage = [currentPage], nextPages = [], endPages = [];
    if (totalPages != 1) {
        if (currentPage != 1) {
            if (currentPage > 3) {
                previousPages = [parseInt(currentPage) - 1];
                beginPages = [1];
            } else if (currentPage == 3) {
                previousPages = [1, 2];
            } else if (currentPage == 2) {
                previousPages = [1];
            }
        }
        if (currentPage < totalPages) {
            nextPages = [parseInt(currentPage) + 1];
        }
        if (currentPage == totalPages - 2) {
            nextPages = [parseInt(totalPages) - 1, totalPages];
        }
        if (currentPage < totalPages - 2) {
            endPages = [parseInt(totalPages)];
        }
    }
    return {beginPages, previousPages, centerPage, nextPages, endPages};
}