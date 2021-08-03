// server.js
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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// PROJECT
   const utcDate = (str) => {
    str = str.toString().split(" ");
   return `${str[0]}, ${str[2]} ${str[1]} ${str[3]} ${str[4]} GMT` 
}
    const checkNumber = (str) => {
      if(!str) return null;
      if(str.length == str.match(/\d/g).length) {
        return parseInt(str);
      } else {
      return str;
    }
  }

app.get("/api/:date?", (req, res) => {
  let datte = new Date(checkNumber(req.params.date));
  if(datte == "Invalid Date") { 
    res.json({error: "Invalid Date"});
  } else {
    res.json({unix: Date.parse(datte), utc: utcDate(Date(datte))})
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT||3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
