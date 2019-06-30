// Spreadsheet information.
var sheetID = '138ruVmHKZCS6nBFj4qjB2uLP99E0F89F41b6O64fG0o';
var sheetName = 'Splatoon Wiki Main Page';

// Check if any of the gear in the shop is gear you currently want.
// If there is, an email displaying the name of the gear is sent.
function SearchGear()
{
  var gear = GetCurrentGear();
  var matchingGear = [];
  var wantedGear = ['Hightide Era Band Tee', 'Squidstar Waistcoat', 'Moist Ghillie Suit', 
                    'Double Egg Shades',     'Blowfish Newsie',     'Fake Contacts',
                    'Black Flip-Flops ',     'Old-Timey Shoes'];
  
  for (var y in wantedGear)
  {
    for (var x in gear)
    {
      if (wantedGear[y] == gear[x])
        matchingGear.push(wantedGear[y]);
    }
  }
  
  // Email information.
  var emailAddress = 'a.k.zamboni@gmail.com';
  var subject = 'SplatNet 2 Shop Update';
  var message = 'The following gear has been found in the SplatNet 2 shop: \n - ' + matchingGear.toString().replace(/,/g, '\n - ');
  
  // Sends an email if matching gear has been found.
  if (matchingGear.length > 0)
    MailApp.sendEmail(emailAddress, subject, message);
}



//Read the current gear from the XML retrieved from the wiki.
function GetCurrentGear()
{
  var spreadsheet = SpreadsheetApp.openById(sheetID);
  var sheet = spreadsheet.getSheetByName(sheetName);
  var data = sheet.getDataRange();
  var values = data.getValues();
  
  var row = 65;
  var cont = true;
  var gear = [];
  
  for (var x = 1; x <= 6; x++)
  {
    gear.push(values[row][0]);
    Logger.log("Row " + row + ": " + values[row][0]);
    row += 7;
  }
  
  Logger.log("Gear: " + gear);
  console.log("Gear: " + gear);
  
  return gear;
}



// Set the function to activate every two hours.
function SearchGearTrigger()
{
  ScriptApp.newTrigger('SearchGear')
  .timeBased()
  .everyHours(4)
  .create();
}
