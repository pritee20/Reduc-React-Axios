
/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export default () => {

    $('[data-check-all]').on('change', function() {
        var $this = $(this),
            index = $this.index() + 1,
            checkbox = $this.find('input[type="checkbox"]'),
            table = $this.parents('table');
        // Make sure to affect only the correct checkbox column
        table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]')
            .prop('checked', checkbox[0].checked);

    });
}