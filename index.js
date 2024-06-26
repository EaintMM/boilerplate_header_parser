// index.js
// where your node app starts

// init project
require('dotenv').config();
//const os =require('os');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const lang = req.headers['accept-language'];
  const userAgent = req.headers['user-agent'];
  const browsedSoftware = parseUserAgent(userAgent);
  res.json({ 
    "ipaddress": clientIP,
    "language": lang,
    "software": browsedSoftware
  });
});

// Function to parse user-agent string and extract browser information
function parseUserAgent(userAgent) {
  const result = {};
  const uaParser = require('ua-parser-js');
  const parsedUA = uaParser(userAgent);

  result.browser = parsedUA.browser;
  result.os = parsedUA.os;

  //return result;
  return parsedUA.browser;
}

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
