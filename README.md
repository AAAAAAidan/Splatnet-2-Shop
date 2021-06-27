# Splatnet 2 Shop Search

A Google Script project that retrieves the current shop's available gear and sends an email if specified gear is found. To use, just copy the Code.gs file to a new Google Apps Script project, update the email and wantedGear variables at the top to your own, run the createTrigger() function, and grant the permissions.

The script reads the current gear from the SplatNet 2 shop as it appears from an IMPORTXML function in Google Sheets. It then compares the names of the gear in the shop to an array of desired gear. If any of the names match, an email is sent notifying the user of the matching gear and abilities in the shop.

### External Links

* [Project Spreadsheet](https://docs.google.com/spreadsheets/d/138ruVmHKZCS6nBFj4qjB2uLP99E0F89F41b6O64fG0o/edit?usp=sharing)
