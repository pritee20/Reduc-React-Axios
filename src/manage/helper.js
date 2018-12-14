/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import _ from 'lodash';
import {setFloatPrecision} from '../utils/utils.js';
export function es6BindAll(context, methodNames) {
    methodNames.map(function(methodName) {
        context[methodName] = context[methodName].bind(context);
    });
};

export function processAddEntityRequestBody(requestData) {
    return _.mapValues(requestData,(elementVal)=>{return (elementVal==="") ? null:elementVal});
}
export function setLocationPrecision(geoObj) {
    return geoObj===null?geoObj:_.mapValues(geoObj,(eleval) => setFloatPrecision(eleval,6) );
}
export function updateDataTableWithNewEntity(dataTableId, newTuple) {
    let dataTable = $(dataTableId).DataTable();
    dataTable.row.add(newTuple).draw();
}
