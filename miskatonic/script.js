$(document).ready(function() {

    var charSheet = new Object();
    
    $("#charform").submit(function(e) {
        e.preventDefault();
        rollCharacteristics();
       });

      function rollCharacteristics() {
        let primaryChars = [];
        let secondaryChars = [];
        for (let i = 0; i < 5; i++) {
            primaryChars.push(rollDice(3) * 5);
          }
        
          charSheet.str = primaryChars[0];
          charSheet.dex = primaryChars[1];
          charSheet.app = primaryChars[2];
          charSheet.con = primaryChars[3];
          charSheet.pow = primaryChars[4];

        for (let i = 0; i < 4; i++) {
            secondaryChars.push((rollDice(2) + 6) * 5);
        }

        charSheet.siz = secondaryChars[0];
        charSheet.int = secondaryChars[1];
        charSheet.edu = secondaryChars[2];
        charSheet.lck = secondaryChars[3];

        console.log(JSON.stringify(charSheet));
      }

      function rollDice(dice) {
        let rollSum = 0;
        for (let i = 0; i < dice; i++) {
              let newRoll = (Math.floor(Math.random() * 6) + 1);
              rollSum += newRoll;
          }
          return rollSum
      }

});