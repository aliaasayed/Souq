const GOOGLE_CREDENTIALS = require("./GOOGLE_CREDENTIALS");
const FACEBOOK_CREDENTIALS = require("./FACEBOOK_CREDENTIALS");
var express = require("express");
var fs = require("fs");
var graph = require('fbgraph');
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
       req.session.tokens = tokens;
       res.redirect("/auth/profile");
    }
    else{
      res.json({"error":"error while try login with gmail"});
    }
  });

});


router.get("/profile",function(req,res){

  var tokens= req.session.tokens;
  var client={};
  oauth2Client.setCredentials(tokens);
  //regresh token
  oauth2Client.refreshAccessToken(function(err,tokens) {
    // your access_token is now refreshed and stored in oauth2Client
    // store these new tokens in a safe place (e.g. database)
  });

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
         //after save user in db add it to server session

         req.session.username= client.name;
         req.session.image= client.image;
         req.session.logged=true;
         res.json(client);
       }
        else {
          res.json({'error':err});
        }
    });

});



router.get("/facebook/login",function(req,resp){
  // Generate Login URL
  var url = graph.getOauthUrl({
    client_id: FACEBOOK_CREDENTIALS.web_client_id,
    redirect_uri: FACEBOOK_CREDENTIALS.web_redirect_uris[0],
    scope:['public_profile']
  });

  resp.send("<a href='"+url+"'>Login With Facebook</a>");
});


router.get('/facebook/callback',function(req,resp){
  // get Code from QueryString and send new request to get AccessToken
  console.log("callback");
  graph.authorize({
        "client_id":      FACEBOOK_CREDENTIALS.web_client_id,
        "redirect_uri":   FACEBOOK_CREDENTIALS.web_redirect_uris[0],
        "client_secret":  FACEBOOK_CREDENTIALS.web_client_secret,
        "code":           req.query.code
    },function (err, facebookRes) {
      fs.writeFileSync(__dirname+"/access_token.txt",facebookRes.access_token);
      resp.json(facebookRes);
    });
});

router.get("/facebook/profile",function(req,resp){
  // Set Access Token
  graph.setAccessToken(fs.readFileSync(__dirname+"/access_token.txt"));
  // GET User Profile Data -- URI /user_id
  graph.get("/me?fields=id,name,picture.width(300),email",function(err,result){
    resp.send(`<img src='${result.picture.data.url}' />`);
    //resp.json(result);
  });
});


module.exports = router;
