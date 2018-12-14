/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

// SPARKLINE
// -----------------------------------

export default function() {

    var $element = $(this),
        options = $element.data(),
        values = options.values && options.values.split(',');

    options.type = options.type || 'bar'; // default chart is bar
    options.disableHiddenCheck = true;

    $element.sparkline(values, options);

    if (options.resize) {
        $(window).resize(function() {
            $element.sparkline(values, options);
        });
    }
}

