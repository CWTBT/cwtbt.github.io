$(document).ready(function() {

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
              "build": [0,0,0],
              "hp": [0,0,0],
              "san": [0,0,0],
              "mp": [0,0,0],
              "dodge": [0,0,0]
      }
    }

    var name;
    var age;
    var occupation;
    var osp; //occupation skill points
    var psp; //personal skill points
    
    $("#charform").submit(function(e) {
        e.preventDefault();

        let formData = $(this).serializeArray();
        name = formData[0]["value"];
        age = formData[1]["value"];

        rollCharacteristics();
        console.log(JSON.stringify(sheet));
        $('#occupationform').show();
       });

    $("#occupationform").submit(function(e) {
      e.preventDefault();
      $("#skillsform").show();
    });

    function rollCharacteristics() {
    setPrimaryChars();
    setSecondaryChars();
    ageModify();
    dbAndBuild();
    sheet.characteristics.hp[0] = Math.floor((sheet.characteristics.con[0] + sheet.characteristics.siz[0])/10);
    sheet.characteristics.san[0] = sheet.characteristics.pow[0];
    sheet.characteristics.mp[0] = sheet.characteristics.pow[0]/5;
    sheet.characteristics.dodge[0] = Math.floor(sheet.characteristics.dex[0]/2);
    }

    function setPrimaryChars() {
      let primaryChars = [];
      for (let i = 0; i < 5; i++) {
          primaryChars.push(rollDice(3) * 5);
      }
      sheet.characteristics.str[0] = primaryChars[0];
      sheet.characteristics.dex[0] = primaryChars[1];
      sheet.characteristics.app[0] = primaryChars[2];
      sheet.characteristics.con[0] = primaryChars[3];
      sheet.characteristics.pow[0] = primaryChars[4];
    }

    function setSecondaryChars() {
      let secondaryChars = [];
      for (let i = 0; i < 4; i++) {
          secondaryChars.push((rollDice(2) + 6) * 5);
      }
      sheet.characteristics.siz[0] = secondaryChars[0];
      sheet.characteristics.int[0] = secondaryChars[1];
      sheet.characteristics.edu[0] = secondaryChars[2];
      sheet.characteristics.lck[0] = secondaryChars[3];
    }

    function ageModify() {
      if (age <= 19) {
        sheet.characteristics.str[0] -= 5;
        sheet.characteristics.siz[0] -= 5;
        sheet.characteristics.edu[0] -= 5;
        let newLuck = rollDice(2);
        if (newLuck > sheet.characteristics.lck[0]) sheet.characteristics.lck[0] = newLuck;
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

        sheet.characteristics.str[0] = sheet.characteristics.str[0] - physMod;
        sheet.characteristics.dex[0] = sheet.characteristics.dex[0] - physMod;
        sheet.characteristics.con[0] = sheet.characteristics.con[0] - physMod;
        sheet.characteristics.app[0] = sheet.characteristics.app[0] - appMod;
        calculateMov(movMod);
      }
    }

    function calculateMov(movMod) {
      if (sheet.characteristics.dex[0] < sheet.characteristics.siz[0] && sheet.characteristics.str[0] < sheet.characteristics.siz[0]) {
        sheet.characteristics.mov[0] = 7;
      }
      else if (sheet.characteristics.dex[0] < sheet.characteristics.siz[0] || sheet.characteristics.str[0] < sheet.characteristics.siz[0]) {
        sheet.characteristics.mov[0] = 8;
      }
      else sheet.characteristics.mov[0] = 9;

      sheet.characteristics.mov[0] -= movMod;
    }

    function improvementCheck() {
      let percentRoll = (Math.floor(Math.random() * 100) + 1);
      if (percentRoll > sheet.characteristics.edu) {
        let improvement = (Math.floor(Math.random() * 10) + 1);
        sheet.characteristics.edu += improvement;
      }
    }

    function dbAndBuild() {
      let buildValue = sheet.characteristics.str[0] + sheet.characteristics.siz[0];
      if (buildValue <= 64) {
        sheet.characteristics.db[0] = "-2";
        sheet.characteristics.build[0] = "-2";
      }

      else if (buildValue <= 84) {
        sheet.characteristics.db[0] = "-1";
        sheet.characteristics.build[0] = "-1";
      }

      else if (buildValue <= 124) {
        sheet.characteristics.db[0] = "None";
        sheet.characteristics.build[0] = "0";
      }

      else if (buildValue <= 164) {
        sheet.characteristics.db[0] = "+1d4";
        sheet.characteristics.build[0] = "+1";
      }

      else {
        sheet.characteristics.db[0] = "+1d6";
        sheet.characteristics.build[0] - "+2";
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