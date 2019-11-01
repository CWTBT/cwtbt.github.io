$(document).ready(function() {
  $(":button").click(function() {

    $.ajax({
      dataType: "json",
      jsonCallback: "getName",
      url: "https://cors-anywhere.herokuapp.com/https://uinames.com/api/?amount=1&region=nepal",
      success: function(results) {
        $('.name').text(results["name"]);
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  });
});
