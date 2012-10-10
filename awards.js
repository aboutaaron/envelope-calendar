/*
### Envelope Calender ###
Built with tabletop.js, moment.js and jQuery
Aaron Williams, 2012
Los Angeles Times
*/

// Creating global var
var showArr = []

jQuery(document).ready(function() {

  // Setup
  var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0AmXUp_k1PfvcdGJqbm1TTElEUW16YXJXZWZsakFXaEE&output=html'

  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo, // Function name to build in DOM
                   wanted: ["Sheet1"], // Sheet name from Google Doc

                   debug: true })

  function showInfo(data, tabletop) {

    jQuery.each(tabletop.sheets("Sheet1").all(), function(i, show) {

      var today = moment()
      // Turn date into date object with Date.js
      // Regular formatting => awardShowDate.format('MMMM DD, YYYY')
      // Get format "in two days, etc" => awardShowDate.from(today)
      var awardShowDate = moment(show.date)

      // Build HTML
      // ==========

      // Empty var
      var show_td = ""

      // If the difference in days from the event is greater than or equal to 0(today), Add it to the table
      if(awardShowDate.diff(today, 'days') >= 0 ) {
        show_td = jQuery('<tr><td>' + show.name + '</td><td>' + awardShowDate.format('MMMM DD, YYYY') + '</td></tr>')
          // Append to DOM
          .appendTo("#awards tbody")
      } else {
        // Else, do nothing and console.log so I know it was evaluated.
        console.log(show.name)
      }

      //console.log(show.special)
      showArr.push(show)

    }) // jQuery.each()

  } // showInfo()

}); // jQuery(document).ready
















