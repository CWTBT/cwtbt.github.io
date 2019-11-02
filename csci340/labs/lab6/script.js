$(document).ready(function() {
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

  $.ajax({
    dataType: "json",
    url: "http://taco-randomizer.herokuapp.com/random/",
    success: function(results) {
      console.log(results);
      $(".tacoShell").text(results["shell"]["name"]);
      $(".tacoBaseLayer").text(results["base_layer"]["name"]);
      $(".tacoMixin").text(results['mixin']['name']);
      $(".tacoCondiment").text(results["condiment"]["name"]);
    },
    error: function(xhr,status,error) {
      console.log(error);
    }
  });


  $("#taco").click(function() {

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

    $.ajax({
      dataType: "json",
      url: "http://taco-randomizer.herokuapp.com/random/",
      success: function(results) {
        console.log(results);
        $(".tacoShell").text(results["shell"]["name"]);
        $(".tacoBaseLayer").text(results["base_layer"]["name"]);
        $(".tacoMixin").text(results['mixin']['name']);
        $(".tacoCondiment").text(results["condiment"]["name"]);
      },
      error: function(xhr,status,error) {
        console.log(error);
      }
    });

  });

  $(":button").click(function() {

    $.ajax({
      dataType: "json",
      jsonCallback: "getAv",
      url: "http://taco-randomizer.herokuapp.com/random/",
      success: function(results) {
        console.log(results);
        $(".tacoShell").text(results["shell"]["name"]);
        $(".tacoBaseLayer").text(results["base_layer"]["name"]);
        $(".tacoMixin").text(results['mixin']['name']);
        $(".tacoCondiment").text(results["condiment"]["name"]);
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  });

});
