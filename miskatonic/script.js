$(document).ready(function() {
    
    $("#charform").submit(function(e) {
        e.preventDefault();
        console.log($(this).serialize());
      });

});