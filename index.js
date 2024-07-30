// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get("/api/:date?", function (req, res) {
  var date = req.params.date;
  var currentDate = new Date();

  if (!date) {
    date = currentDate;
  } else {
    if (/\d{13}/.test(date)) {
      // If the input is a 13-digit number, assume it's a timestamp in milliseconds
      date = new Date(parseInt(date));
    } else {
      // If the input is a string, parse it as a date
      date = new Date(date);
      if (isNaN(date.getTime())) {
        res.json({ error: "Invalid Date" });
        return;
      }
    }
  }

  var utcString = date.toUTCString();

  res.json({
    unix: date.getTime(),
    utc: utcString
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
