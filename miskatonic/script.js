$(document).ready(function() {

    var charSheet = new Object();
    var name;
    var age;
    
    $("#charform").submit(function(e) {
        e.preventDefault();

        let formData = $(this).serializeArray();
        name = formData[0]["value"];
        age = formData[1]["value"];

        rollCharacteristics();
       });

      function rollCharacteristics() {
        setPrimaryChars();
        setSecondaryChars();
        console.log(JSON.stringify(charSheet));
        ageModify();
        console.log(JSON.stringify(charSheet));
      }

      function setPrimaryChars() {
        let primaryChars = [];
        for (let i = 0; i < 5; i++) {
            primaryChars.push(rollDice(3) * 5);
        }
        charSheet.str = primaryChars[0];
        charSheet.dex = primaryChars[1];
        charSheet.app = primaryChars[2];
        charSheet.con = primaryChars[3];
        charSheet.pow = primaryChars[4];
      }

      function setSecondaryChars() {
        let secondaryChars = [];
        for (let i = 0; i < 4; i++) {
            secondaryChars.push((rollDice(2) + 6) * 5);
        }
        charSheet.siz = secondaryChars[0];
        charSheet.int = secondaryChars[1];
        charSheet.edu = secondaryChars[2];
        charSheet.lck = secondaryChars[3];
      }

      function ageModify() {
        if (age <= 19) {
          charSheet.str -= 5;
          charSheet.siz -= 5;
          charSheet.edu -= 5;
          let newLuck = rollDice(2);
          if (newLuck > charSheet.lck) charSheet.lck = newLuck;
        }
        
        else if (age <= 39) {
          improvementCheck();
        }

        else  {
          // Offset ages by -40, divide by 10, and round down to end up with a number 0-4
          let ageValue = Math.floor((age - 40) / 10);
          console.log("ageValue: " + ageValue);

          // 5, 10, 20, 40, 80 are the possible mods to the main physical characteristics
          let physMod = 5 * (Math.pow(2, ageValue));
          console.log("physMod: " + physMod);

          // 5, 10, 15, 20, 25 are the possible mods to appearance
          let appMod = 5 * (ageValue + 1);

          // 1, 2, 3, 4, 5 are the possible mods to movement
          let movMod = ageValue + 1;
          console.log("movMod: "+movMod);

          let improvementCount = ageValue + 2;
          if (improvementCount > 4) improvementCount = 4;

          for (let i = 0; i < improvementCount; i++) {
            improvementCheck();
          }

          charSheet.str = charSheet.str - physMod;
          charSheet.dex = charSheet.dex - physMod;
          charSheet.con = charSheet.con - physMod;
          charSheet.app = charSheet.app - appMod;
          charSheet.mov = charSheet.mov - movMod;
        }
      }

      function improvementCheck() {
        let percentRoll = (Math.floor(Math.random() * 100) + 1);
        if (percentRoll > charSheet.edu) {
          let improvement = (Math.floor(Math.random() * 10) + 1);
          charSheet.edu += improvement;
        }
      }

      function rollDice(dice) {
        let rollSum = 0;
        for (let i = 0; i < dice; i++) {
              let newRoll = (Math.floor(Math.random() * 6) + 1);
              rollSum += newRoll;
          }
          return rollSum;
      }

});