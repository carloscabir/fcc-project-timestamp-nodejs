// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const dotenv = require('dotenv')
dotenv.config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.json())


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  let { date } = req.params
  const isYMDRegex = /\d\d\d\d-\d\d-\d\d/.test(date)

  if (!isYMDRegex) date = parseInt(date)

  const ISODate = new Date(date)

  const response = {
    unix: new Date(ISODate).getTime(),
    utc: new Date(ISODate).toUTCString()
  }
  
  res.json(response)
 })

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
