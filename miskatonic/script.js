$(document).ready(function() {
    
    $("#charform").submit(function(e) {
        e.preventDefault();
        console.log("Characteristics:" + rollCharacteristics());
      });

      function rollCharacteristics() {
        let physChars = [];
        for (let i = 0; i < 5; i++) {
            physChars.push(rollDice(3) * 5);
          }
        return physChars;
      }

      function rollDice(dice) {
        let rollSum = 0;
        for (let i = 0; i < dice; i++) {
              let newRoll = (Math.floor(Math.random() * 6) + 1);
              console.log("Roll: " + newRoll);
              rollSum += newRoll;
          }
          return rollSum
      }

});