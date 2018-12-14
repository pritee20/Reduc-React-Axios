/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/

export default () => {

    var element = $('[data-trigger-resize]');
    var value = element.data('triggerResize')

    element.on('click', function() {
        setTimeout(function() {
            // all IE friendly dispatchEvent
            var evt = document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);
            // modern dispatchEvent way
            // window.dispatchEvent(new Event('resize'));
        }, value || 300);
    });

}
