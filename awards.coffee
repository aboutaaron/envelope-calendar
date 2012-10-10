showArr = []
jQuery(document).ready ->

  showInfo = (data, tabletop) ->
    jQuery.each tabletop.sheets("Sheet1").all(), (i, show) ->

      # Turn date into date object with Date.js
      awardShowDate = Date.parse(show.date)

      # Build HTML
      show_td = jQuery("<tr><td>" + show.name + "</td><td>" + awardShowDate + "</td></tr>")

      # Append to DOM
      show_td.appendTo "#awards tbody"

      #console.log(show.name)
      showArr.push [show.name, awardShowDate]

  # Setup
  public_spreadsheet_url = "https://docs.google.com/spreadsheet/pub?key=0AmXUp_k1PfvcdGJqbm1TTElEUW16YXJXZWZsakFXaEE&output=html"
  Tabletop.init
    key: public_spreadsheet_url
    callback: showInfo # Function name to build in DOM
    wanted: ["Sheet1"] # Sheet name from Google Doc
    debug: true