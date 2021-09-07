/////////////////////////////////////////
// Update the values below to your own //
/////////////////////////////////////////

var emailAddress = 'a.k.zamboni@gmail.com';
var wantedGear = ['Double Egg Shades',     'Blowfish Newsie',     'Fake Contacts',
                  'Hightide Era Band Tee', 'Squidstar Waistcoat', 'Moist Ghillie Suit', 'ω-3 Tee',
                  'Black Flip-Flops ',     'Old-Timey Shoes'];

////////////////////////////////
// Do not edit the code below //
////////////////////////////////



var sheet = SpreadsheetApp.openById("138ruVmHKZCS6nBFj4qjB2uLP99E0F89F41b6O64fG0o").getActiveSheet();

// Set the function to activate every six hours.
function createTrigger() {
  ScriptApp.newTrigger('searchGear')
  .timeBased()
  .everyHours(6)
  .create();
}



// Check if any of the gear in the shop is gear you currently want.
// If there is, an email displaying the name of the gear is sent.
function searchGear() {
  var gear = getCurrentGear('gear');
  var abilities = getCurrentGear('abilities');
  var matchingGear = [];
  
  // Check if the current gear matches any wanted gear.
  for (var i in gear) {
    if (wantedGear.includes(gear[i])) {
      matchingGear.push(gear[i] + " (" + abilities[i] + ")");
    }
  }

  // Sends an email if matching gear has been found.
  if (matchingGear.length > 0) {
    var subject = 'SplatNet 2 Shop Update';
    var message = 'The following gear has been found in the SplatNet 2 shop:\n - ' + matchingGear.toString().replace(/,/g, '\n - ');
    
    MailApp.sendEmail(emailAddress, subject, message);
    Logger.log("Email successfully sent. " + message);
  }
  else {
    Logger.log("No wanted gear was found.");
  }
}



// Retrieve the current gear from the XML retrieved from the wiki.
function getCurrentGear(type) {
  var gear = [];
  
  for (var row = 60; row <= 70; row++) {
    if (sheet.getRange(row, 1).getValue() == "SplatNet 2") {
      row++;

      if (type == 'abilities') {
        row += 5;
      }
      
      for (var x = 1; x <= 6; x++) {
        gear.push(sheet.getRange(row, 1).getValue());
        row += 7;
      }
    }
  }
  
  if (type == 'gear') {
    Logger.log("Gear in shop: " + gear.toString().replace(/,/g, ", "));
  }
  else {
    Logger.log("Abilities in shop: " + gear.toString().replace(/,/g, ", "));
  }
  
  return gear;
}
