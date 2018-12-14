/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
export function getCompanyFilter() {
    return JSON.stringify({"include": {"relation": "freeChargeMerchantId", "scope": {"fields": ["merchantId"]}}});
}

