$(document).ready(function() {

  let color = "red";
  $("#traffic").click(function() {
    console.log(color)
    if (color === "red") {color = "yellow"}
    else if (color === "yellow") {color = "green"}
    else {color = "red"}
    $("#traffic").css("background-color", color)
  });
});
