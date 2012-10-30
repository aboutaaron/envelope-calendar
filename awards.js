/*
### Envelope Calender ###
Built with tabletop.js, moment.js and jQuery
Aaron Williams, 2012
Los Angeles Times
*/


jQuery(document).ready(function () {
    "use strict";

  // Setup
    var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0AmXUp_k1PfvcdGJqbm1TTElEUW16YXJXZWZsakFXaEE&output=html';

    Tabletop.init({ key: public_spreadsheet_url,
                     callback: showInfo, // Function name to build in DOM
                     wanted: ["Sheet1"], // Sheet name from Google Doc

                     debug: true });

    function showInfo(data, tabletop) {

        jQuery.each(tabletop.sheets("Sheet1").all(), function (i, show) {
            var today, awardShowDate;
            today = moment().format('MMM DD, YYYY');
            // Turn date into date object with Date.js
            // Regular formatting => awardShowDate.format('MMMM DD, YYYY')
            // Get format "in two days, etc" => awardShowDate.from(today)
            awardShowDate = moment(show.date);

            // If the difference in days from the event is greater than or equal to 0(today), Add it to the table
            if (awardShowDate.diff(today, 'days') > 0) {
                jQuery('<li><div id="contentWrapper"><span class="listContent"><strong>' + show.name + '</strong> | ' + awardShowDate.format('MMM DD, YYYY') + '</span></div></li>')
                    .appendTo("#showList").addClass(show.special);
            } else if (awardShowDate.diff(today, 'days') === 0) {
                jQuery('<li><div id="contentWrapper"><span class="listContent"><strong>' + show.name + '</strong> | ' + awardShowDate.calendar() + '</span></div></li>')
                    .appendTo("#showList").addClass(show.special);
            } else {
                // Else, do nothing and console.log the award so I know it was evaluated.
            }

        }); // jQuery.each()

    } // showInfo()

}); // jQuery(document).ready