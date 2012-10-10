#
# Envelope Calender
# Built with CoffeeScript, tabletop.js, moment.js and jQuery
# Aaron Williams, 2012
# Los Angeles Times
#
jQuery(document).ready ->

  # Setup
  # Function name to build in DOM
  # Sheet name from Google Doc
  showInfo = (data, tabletop) ->
    jQuery.each tabletop.sheets("Sheet1").all(), (i, show) ->
      today = moment().format("MMM DD, YYYY")

      # Turn date into date object with Date.js
      # Regular formatting => awardShowDate.format('MMMM DD, YYYY')
      # Get format "in two days, etc" => awardShowDate.from(today)
      awardShowDate = moment(show.date)

      # Build HTML
      # ==========

      # Empty var
      show_td = ""

      # If the difference in days from the event is greater than or equal to 0(today), Add it to the table
      if awardShowDate.diff(today, "days") > 0
        show_td = jQuery("<li>" + show.name + " | " + awardShowDate.format("MMM DD, YYYY") + "</li>").appendTo("#showList")
      else if awardShowDate.diff(today, "days") is 0
        show_td = jQuery("<li>" + show.name + " | " + awardShowDate.calendar() + "</li>").appendTo("#showList")
      else
        # Else, do nothing and console.log so I know it was evaluated.
        console.log show.name + " | " + awardShowDate.format("MMM DD, YYYY") + " => " + awardShowDate.diff(today, "days")

  public_spreadsheet_url = "https://docs.google.com/spreadsheet/pub?key=0AmXUp_k1PfvcdGJqbm1TTElEUW16YXJXZWZsakFXaEE&output=html"
  Tabletop.init
    key: public_spreadsheet_url
    callback: showInfo
    wanted: ["Sheet1"]
    debug: true