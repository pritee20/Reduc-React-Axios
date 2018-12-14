/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */


export default store => next => action => {
    
    const { type } = action;
    
    if (type === 'INIT') {
        try {
            const storedState = JSON.parse(
                localStorage.getItem('YOUR_APP_NAME')
            );
            if (storedState) {
                store.dispatch({
                    type: 'BLOODY_INIT',
                    payload: storedState
                });
            }
            return;
        } catch (e) {
            // Unable to load or parse stored state, proceed as usual
        }
    }

    next(action);
}
