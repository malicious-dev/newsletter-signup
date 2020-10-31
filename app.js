//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const https = require('https');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get('/', function (req, res){
  res.sendFile(__dirname+"/signup.html");
})

app.post('/', function (req, res){
  const  firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;

  var data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/cb2aca812c";
  const options = {
    method: "POST",
    auth: "harshit:2895c2612906285c27e4a719f786baed-us17"
  }
  const request = https.request(url, options, function(response){

    if (response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server is listening on port 3000.");
})


// mailchimp = d58a69ef1f46537f439bc86c5a464f6a-us17
// uniqueid = cb2aca812c
