// Spreadsheet information.
var sheetID = '138ruVmHKZCS6nBFj4qjB2uLP99E0F89F41b6O64fG0o';
var sheetName = 'Splatoon Wiki Main Page';

// Check if any of the gear in the shop is gear you currently want.
// If there is, an email displaying the name of the gear is sent.
function SearchGear()
{
  var gear = GetCurrentGear('gear');
  var abilities = GetCurrentGear('abilities');
  var matchingGear = [];
  var wantedGear = ['Hightide Era Band Tee', 'Squidstar Waistcoat', 'Moist Ghillie Suit', 'ω-3 Tee',
                    'Double Egg Shades',     'Blowfish Newsie',     'Fake Contacts',
                    'Black Flip-Flops ',     'Old-Timey Shoes'];
  
  for (var y in wantedGear)
  {
    for (var x in gear)
    {
      if (wantedGear[y] == gear[x])
        matchingGear.push(wantedGear[y] + " (" + abilities[x] + ")");
    }
  }

  // Email information.
  var emailAddress = 'a.k.zamboni@gmail.com';
  var subject = 'SplatNet 2 Shop Update';
  var message = 'The following gear has been found in the SplatNet 2 shop:\n - ' + matchingGear.toString().replace(/,/g, '\n - ');
  
  // Sends an email if matching gear has been found.
  if (matchingGear.length > 0)
  {
    MailApp.sendEmail(emailAddress, subject, message);
    Logger.log("Email successfully sent. " + message)
    console.log("Email successfully sent. " + message)
  }
  else
  {
    Logger.log("No wanted gear was found.")
    console.log("No wanted gear was found.")
  }
}



//Read the current gear from the XML retrieved from the wiki.
function GetCurrentGear(type)
{
  var spreadsheet = SpreadsheetApp.openById(sheetID);
  var sheet = spreadsheet.getSheetByName(sheetName);
  var data = sheet.getDataRange();
  var values = data.getValues();
  
  var row = 65;
  var cont = true;
  var gear = [];
  
  if (type == 'abilities')
    row += 5;
  
  for (var x = 1; x <= 6; x++)
  {
    //Logger.log("Row " + row + ": " + values[row][0]);
    gear.push(values[row][0]);
    row += 7;
  }
  
  if (type == 'gear')
  {
    Logger.log("Gear in shop: " + gear.toString().replace(/,/g, ", "));
    console.log("Gear in shop: " + gear.toString().replace(/,/g, ", "));
  }
  
  return gear;
}



// Set the function to activate every six hours.
function SearchGearTrigger()
{
  ScriptApp.newTrigger('SearchGear')
  .timeBased()
  .everyHours(6)
  .create();
}
