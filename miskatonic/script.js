$(document).ready(function() {

    
  
    var charSheet = new Object();
    var sheet = {
      "name": "NO_NAME",
      "age": 0,
      "occupation": "NONE",
      "characteristics": {
              "str": [0,0,0],
              "dex": [0,0,0],
              "con": [0,0,0],
              "app": [0,0,0],
              "pow": [0,0,0],
              "siz": [0,0,0],
              "int": [0,0,0],
              "edu": [0,0,0],
              "lck": [0,0,0],
              "mov": [0,0,0],
              "db": [0,0,0],
              "build": [0,0,0]
      }
    }
    console.log(JSON.stringify(sheet));
    var name;
    var age;
    
    $("#charform").submit(function(e) {
        e.preventDefault();

        let formData = $(this).serializeArray();
        name = formData[0]["value"];
        age = formData[1]["value"];

        rollCharacteristics();
        console.log(JSON.stringify(charSheet));
       });

    function rollCharacteristics() {
    setPrimaryChars();
    setSecondaryChars();
    ageModify();
    dbAndBuild();
    charSheet.hp = (charSheet.con + charSheet.siz)/10;
    charSheet.san = charSheet.pow;
    charSheet.mp = charSheet.pow/5;
    charSheet.dodge = charSheet.dex/2;
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

        // 5, 10, 20, 40, 80 are the possible mods to the main physical characteristics
        let physMod = 5 * (Math.pow(2, ageValue));

        // 5, 10, 15, 20, 25 are the possible mods to appearance
        let appMod = 5 * (ageValue + 1);

        // 1, 2, 3, 4, 5 are the possible mods to movement
        let movMod = ageValue + 1;

        let improvementCount = ageValue + 2;
        if (improvementCount > 4) improvementCount = 4;

        for (let i = 0; i < improvementCount; i++) {
          improvementCheck();
        }

        charSheet.str = charSheet.str - physMod;
        charSheet.dex = charSheet.dex - physMod;
        charSheet.con = charSheet.con - physMod;
        charSheet.app = charSheet.app - appMod;
        calculateMov(movMod);
      }
    }

    function calculateMov(movMod) {
      if (charSheet.dex < charSheet.siz && charSheet.str < charSheet.siz) charSheet.mov = 7;
      else if (charSheet.dex < charSheet.siz || charSheet.str < charSheet.siz) charSheet.mov = 8;
      else charSheet.mov = 9;

      charSheet.mov -= movMod;
    }

    function improvementCheck() {
      let percentRoll = (Math.floor(Math.random() * 100) + 1);
      if (percentRoll > charSheet.edu) {
        let improvement = (Math.floor(Math.random() * 10) + 1);
        charSheet.edu += improvement;
      }
    }

    function dbAndBuild() {
      let buildValue = charSheet.str + charSheet.siz;
      if (buildValue <= 64) {
        charSheet.db = "-2";
        charSheet.build = "-2";
      }

      else if (buildValue <= 84) {
        charSheet.db = "-1";
        charSheet.build = "-1";
      }

      else if (buildValue <= 124) {
        charSheet.db = "None";
        charSheet.build = "0";
      }

      else if (buildValue <= 164) {
        charSheet.db = "+1d4";
        charSheet.build = "+1";
      }

      else {
        charSheet.db = "+1d6";
        charSheet.build - "+2";
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