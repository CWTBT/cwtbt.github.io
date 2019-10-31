$(document).ready(function() {
  $.ajax({
    dataType: "json",
    jsonCallback: "getName",
    url: "https://uinames.com/api/?amount=1",
    success: function(results) {
      $('.name').text(results["name"]);
    },
    error: function(xhr, status, error) {
      console.log(error);
    }
  })
});
