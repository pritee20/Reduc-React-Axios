/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

// SKYCONS
// -----------------------------------

export default function() {
    var element = $(this),
        skycons = new Skycons({
            'color': (element.data('color') || 'white')
        });

    element.html('<canvas width="' + element.data('width') + '" height="' + element.data('height') + '"></canvas>');

    skycons.add(element.children()[0], element.data('skycon'));

    skycons.play();
}

