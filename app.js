const express = require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https = require("https");

const app = express();

app.use(express.static("public")); //add static elements- style sheet &image
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

  res.sendFile(__dirname + "/signup.html")

});

app.post("/", function(req, res){
  //requires bodyParser
  const firstName = req.body.fName; //corresponds to name of html element
  const lastName = req.body.lName;
  const  email = req.body.email;

  const data= {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

const jsonData = JSON.stringify(data);
const url = "https://us18.api.mailchimp.com/3.0/lists/a834a6edf7";
const options = {
  method: "POST",
  auth: "Mar5Planet:bd7700e95aa49e89594182cb8224c62e-us18"
};

  const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
      })
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
})

//want to post data to external resource
//must use request





app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000")
});
//API Key
// bd7700e95aa49e89594182cb8224c62e-us18

//ListID
// a834a6edf7
