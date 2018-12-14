/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

//Node Module Imports
import {combineReducers} from 'redux';

//User Module Imports
import pricing from './pricing';
import company from './company';
import user from './user';
import companyHeader from './companyHeader';
import companyHeaderModal from './companyHeader/companyHeaderModal';
import parkingLot from './parkingLot';
import parking from './parking';
import parkingSubLot from './parkingSubLot';
import editParkingModal from './parking/parkingModal';
import editParkingLotModal from './parkingLot/parkingLotModal';
import editParkingSubLotModal from './parkingSubLot/parkingSubLotModal';
import duplicateReceiptContent from './duplicateReceiptContent';
import receiptContent from './parkingSubLot/receiptContents';
import userModal from './user/userModal';

export default combineReducers({
    [company.constants.NAME]: company.reducer,
    [user.constants.NAME]: user.reducer,
    [companyHeader.constants.NAME]: companyHeader.reducer,
    [parkingLot.constants.NAME]: parkingLot.reducer,
    [parking.constants.NAME]: parking.reducer,
    [parkingSubLot.constants.NAME]: parkingSubLot.reducer,
    [companyHeaderModal.constants.NAME]: companyHeaderModal.reducer,
    [editParkingModal.constants.NAME]: editParkingModal.reducer,
    [editParkingLotModal.constants.NAME]: editParkingLotModal.reducer,
    [editParkingSubLotModal.constants.NAME]: editParkingSubLotModal.reducer,
    [receiptContent.constants.NAME]: receiptContent.reducer,
    [duplicateReceiptContent.constants.NAME]: duplicateReceiptContent.reducer,
    [pricing.constants.NAME]: pricing.reducer,
    [userModal.constants.NAME]: userModal.reducer
});