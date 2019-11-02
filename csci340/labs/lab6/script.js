$(document).ready(function() {
  $(":button").click(function() {

    $.ajax({
      dataType: "json",
      jsonCallback: "getAv",
      url: "https://randomuser.me/api/?nat=us&inc=name,picture,email",
      success: function(results) {
        $('.name').text(results["results"][0]["name"]["first"] + " "+ results["results"][0]["name"]["last"]);
        $('#avatar').attr("src", results["results"][0]["picture"]["large"]);
        $('.email').text(results["results"][0]["email"]);
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });

  });
});
