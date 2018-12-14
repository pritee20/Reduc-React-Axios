/**
 * Copyright  ( C )  2016-2017 GetMyParking - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

let datatable;

export function initializeDataTable(id, columnData, dataset) {

    if (!$.fn.DataTable) return;

    $.fn.dataTableExt.sErrMode = 'throw';

    // $.fn.dataTable.TableTools.defaults.aButtons = [ "copy", "csv", "xls", "pdf" ];

    datatable = $(id).DataTable({
        processing: true,
        columns: columnData,
        data: dataset,
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'collection',
                text: 'Export',
                buttons: [
                    'excel',
                    'pdf',
                    {
                        extend: 'print',
                        text: 'Print',
                        autoPrint: true,
                        exportOptions: {
                            modifier: {
                                page: 'current'
                            }
                        }
                    }
                ]
            }
        ]
    });

}

export function reappendData(id, columnData, response) {

    datatable.clear().draw();
    datatable.rows.add(response).draw();
}

export function filterDateTime(data) {

    for(var i = 0; i < data.length; i++){
        data[i].event_time = new Date(data[i].event_time);
    }

    return data;
}
