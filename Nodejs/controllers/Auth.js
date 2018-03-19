const GOOGLE_CREDENTIALS = require("./GOOGLE_CREDENTIALS");
var express = require("express");
var fs = require("fs");
var {google} = require('googleapis');
var plus = google.plus('v1');
var router = express.Router();

//google+ information
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
  GOOGLE_CREDENTIALS.web_client_id,
  GOOGLE_CREDENTIALS.web_client_secret,
  GOOGLE_CREDENTIALS.web_redirect_uris[0]
);
var scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  // 'https://www.googleapis.com/auth/gmail.readonly'
];

router.get("/login",function(req,res){
 res.send("login");
});

router.get("/login/GooglePlusLogin",function(req,res){
  // Generate Login URL
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.send("<a href='"+url+"'>Login With Google</a>");
  //retrieve url in json obj
   //res.send({"G+_url":url});
});


router.get('/login/Gmailcallback',function(req,res){

  console.log("login with call back");
  var code= req.query.code;
  oauth2Client.getToken(code, function (err, tokens) {
    if (!err) {
       oauth2Client.setCredentials(tokens);
       //add to db instead
       fs.writeFileSync(__dirname+"/access_token.txt",JSON.stringify(tokens));
       res.json(tokens);
    }
    else{
      res.json({"error":"error while try login with gmail"});
    }
  });

});


router.get("/profile",function(req,resp){

   var tokens=JSON.parse(fs.readFileSync(__dirname+"/access_token.txt"));

    var client={};
    oauth2Client.setCredentials(tokens);
    plus.people.get({
      userId: 'me',
      auth: oauth2Client
     }, function (err, response) {
       if(!err){
         client.name=response.data.displayName;
         client.email=response.data.emails[0].value;
         client.gender=response.data.gender;
         client.image=response.data.image.url;
         client.tokens=tokens;
         resp.json(client);
       }
        else {
          resp.json({'error':error});
        }
    });

});

// oauth2Client.refreshAccessToken(function(err, tokens) {
//   // your access_token is now refreshed and stored in oauth2Client
//   // store these new tokens in a safe place (e.g. database)
// });

module.exports = router;
