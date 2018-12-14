/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

// SLIMSCROLL
// -----------------------------------

export default function() {

    var element = $(this),
        defaultHeight = 250;

    element.slimScroll({
        height: (element.data('height') || defaultHeight)
    });

}
