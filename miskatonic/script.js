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
  },
  "skills": {
    "Accounting": [5,0,0],
    "Anthropology": [1,0,0],
    "Appraise": [5,0,0],
    "Archaeology": [1,0,0],
    "Art/Craft": [5,0,0],
    "Charm": [15,0,0],
    "Climb": [20,0,0],
    "Credit Rating": [0,0,0],
    "Cthulhu Mythos": [0,0,0],
    "Disguise": [5,0,0],
    "Dodge": [0,0,0],
    "Drive Auto": [20,0,0],
    "Elec Repair": [10,0,0],
    "Fast Talk": [5,0,0],
    "Fighting (Brawl)": [25,0,0],
    "Firearms (Handgun)": [20,0,0],
    "Firearms (Rifle/Shotgun)": [25,0,0],
    "First Aid": [30,0,0],
    "History": [5,0,0],
    "Intimidate": [15,0,0],
    "Jump": [20,0,0],
    "Language (Other)": [1,0,0],
    "Language (Own)": [0,0,0],
    "Law": [5,0,0],
    "Library Use": [20,0,0],
    "Listen": [20,0,0],
    "Locksmith": [1,0,0],
    "Mech. Repair": [10,0,0],
    "Medicine": [1,0,0],
    "Natural World": [10,0,0],
    "Navigate": [10,0,0],
    "Occult": [5,0,0],
    "Op. Hv. Machine": [1,0,0],
    "Persuade": [10,0,0],
    "Pilot": [1,0,0],
    "Psychology": [10,0,0],
    "Psychoanalysis": [1,0,0],
    "Ride": [5,0,0],
    "Science": [1,0,0],
    "Sleight of Hand": [10,0,0],
    "Spot Hidden": [25,0,0],
    "Stealth": [20,0,0],
    "Survival": [10,0,0],
    "Swim": [20,0,0],
    "Throw": [20,0,0],
    "Track": [10,0,0]
  }
};
var skillNames = [
  "Accounting",
  "Anthropology",
  "Appraise",
  "Archaeology",
  "Art/Craft",
  "Charm",
  "Climb",
  "Credit Rating",
  "Cthulhu Mythos",
  "Disguise",
  "Dodge",
  "Drive Auto",
  "Elec Repair",
  "Fast Talk",
  "Fighting (Brawl)",
  "Firearms (Handgun)",
  "Firearms (Rifle/Shotgun)",
  "First Aid",
  "History",
  "Intimidate",
  "Jump",
  "Language (Other)",
  "Language (Own)",
  "Law",
  "Library Use",
  "Listen",
  "Locksmith",
  "Mech. Repair",
  "Medicine",
  "Natural World",
  "Navigate",
  "Occult",
  "Op. Hv. Machine",
  "Persuade",
  "Pilot",
  "Psychology",
  "Psychoanalysis",
  "Ride",
  "Science",
  "Sleight of Hand",
  "Spot Hidden",
  "Stealth",
  "Survival",
  "Swim",
  "Throw",
  "Track"
];
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
    setSkillBases();
    console.log(JSON.stringify(sheet));
    $('#occupationform').show();
    });

$("#occupationform").submit(function(e) {
  e.preventDefault();
  generateTable('#skillsform');
  calcSkillPoints($("#osp").val());
  $('#skillsform').show();
  $('#osp_counter').show();
  $('#psp_counter').show();
});

$("#skillsform").submit(function(e) {
  
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
  assignStat(sheet.characteristics.str, primaryChars[0]);
  assignStat(sheet.characteristics.dex, primaryChars[1]);
  assignStat(sheet.characteristics.app, primaryChars[2]);
  assignStat(sheet.characteristics.con, primaryChars[3]);
  assignStat(sheet.characteristics.pow, primaryChars[4]);
}

function setSecondaryChars() {
  let secondaryChars = [];
  for (let i = 0; i < 4; i++) {
      secondaryChars.push((rollDice(2) + 6) * 5);
  }
  assignStat(sheet.characteristics.siz, secondaryChars[0]);
  assignStat(sheet.characteristics.int, secondaryChars[1]);
  assignStat(sheet.characteristics.edu, secondaryChars[2]);
  assignStat(sheet.characteristics.lck, secondaryChars[3]);
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

function assignStat(stat, value) {
  stat[0] = value;
  stat[1] = Math.floor(value/2); //half value
  stat[2] = Math.floor(value/5); //fifth value
}

function setSkillBases() {
  assignStat(sheet.skills["Dodge"], Math.floor(sheet.characteristics.dex[0]/2));
  assignStat(sheet.skills["Language (Own)"][0], sheet.characteristics.edu[0]);
}

function rollDice(dice) {
  let rollSum = 0;
  for (let i = 0; i < dice; i++) {
        let newRoll = (Math.floor(Math.random() * 6) + 1);
        rollSum += newRoll;
    }
    return rollSum;
}

function generateTable(formname) {
  let table = $("<table>");
  for (let i = 0; i < skillNames.length; i+=3) {
    let row = $("<tr>");
    for (let j = 0; j < 3; j++) {
      if (i+j > skillNames.length - 1) break;
      let skill = skillNames[i+j]
      let cell = $("<td>").text(skill+": ");
      cell.append($("<input>").attr("id",skill).attr("type", "number"));
      row.append(cell);
      
      $(cell).keyup(function() {
        console.log(skill);
      });
    }
    table.append(row);
  }
  $("#skillsform").append(table);
}

function calcSkillPoints(value) {
  // Occupational Skill Points = EDU x 4
  if (value == "edu") osp = sheet.characteristics.edu[0] * 4;
  else {
    // Occupational Skill Points = EDU x 2 + (other attribute) x 2
    osp = sheet.characteristics[value][0] * 2 + sheet.characteristics.edu[0] * 2;
  }

  //Personal Skill Points = INT x 2
  psp = sheet.characteristics.int[0] * 2;
  
  $('#osp_counter').text("Occupational Skill Points: "+osp);
  $('#psp_counter').text("Personal Skill Points: "+psp);
}