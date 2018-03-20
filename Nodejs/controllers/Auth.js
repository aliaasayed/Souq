const GOOGLE_CREDENTIALS = require("./GOOGLE_CREDENTIALS");
const FACEBOOK_CREDENTIALS = require("./FACEBOOK_CREDENTIALS");
var express = require("express");
var fs = require("fs");
var multer  = require("multer");
var mongoose = require("mongoose");
var fileUploadMid = multer({dest:"./public/images"});
var UserModel = mongoose.model("users");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});

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

/*****User Login******/
router.get("/login",function(req,res){
 res.send("<a href='/auth/facebook/login'>Login With facebook</a><br>"+
 "<a href='/auth/login/GooglePlusLogin'>Login With Google</a><br>"+
 "<a href='/auth/userlogin'>Login</a>");
});

router.get("/userlogin",function(req,resp){
  var message = req.flash('msg');
  resp.render("auth/userlogin",{ msg : message });
});

router.post("/userlogin",urlEncodedMid,function(req,resp){

  UserModel.findOne({email:req.body.email,password:req.body.password},function(err,data){
   if(data != null && !err)
   {
    req.session.email = req.body.email;
    req.session.logged = true;
    var arr=[];
    arr.push(data);
    resp.render("users/list",{users:arr});
    //resp.json(data);
   }
  else
  {
    req.flash('msg',"invalid username & password ...");
    resp.redirect("/userlogin");
  }
    
  });

});
/*****User Logout******/
router.get("/logout",function(req,resp){
  req.session.destroy();
  resp.redirect("/auth/login");
});

/*****User Register******/
router.get("/register",function(req,resp){
  resp.render("auth/register");
});

router.post("/register",fileUploadMid.single('image'),function(req,resp){

  fs.renameSync("./public/images/"+req.file.filename,"./public/images/"+req.file.originalname)
  var user = new UserModel({
    name:req.body.username,
    password:req.body.password,
    email:req.body.email,
    address:req.body.address,
    image:req.file.originalname,
  });
  user.save(function(err,doc){
    if(!err)
     resp.json(req.body);
    else
      resp.json(err);
  });
});

/*****Seller Register******/

router.get("/sellerRegister",function(req,resp){
  resp.render("auth/sellerRegister");
});

router.post("/sellerRegister",fileUploadMid.single('image'),function(req,resp){
  fs.renameSync("./public/images/"+req.file.filename,"./public/images/"+req.file.originalname)
  var user = new UserModel({
    name:req.body.username,
    password:req.body.password,
    email:req.body.email,
    address:req.body.address,
    image:req.file.originalname,
    nationalID:req.body.ID,
    tokens:{ 'access_token':'asdajsnfjnajfn','expires_date':'12/5/2020' }
  });

  user.save(function(err,doc){
    if(!err)
     resp.json(req.body);
    else
      resp.json(err);
  });

});

/*****Login with Google******/
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
       plus.people.get({
         userId: 'me',
         auth: oauth2Client
        }, function (err, response) {
          if(!err){

            SaveProfile(response,tokens,function(addRes){
              console.log(addRes);
              if(addRes==true)
                res.redirect("/auth/SaveProfile");
                else
                 res.json({"error":"error while adding in db"});
             });
          }
          else{
                // res.json(err);
               res.json({"error":"error while trying get personal info  gmail"});
          }
        });
    }
    else{
      res.json({"error":"error while try login with gmail"});
    }
  });

});

function SaveProfile(response,token,cb){

      var user=new UserModel({
        name:response.data.displayName,
        email:response.data.emails[0].value,
        image:response.data.image.url,
        tokens:{'access_token':token.access_token,'refresh_token':token.refresh_token,'expires_date':token.expiry_date}
      });
      user.save(function(err,doc){
        if(!err)
          cb(true);
        else
          cb(false);
      });
}

// function refreshTokenGmail(tokens){
//   oauth2Client.setCredentials(tokens);
//   //regresh token
//   oauth2Client.refreshAccessToken(function(err,tokens) {
//     // your access_token is now refreshed and stored in oauth2Client
//     // store these new tokens in a safe place (e.g. database)
//   });
// }
//
router.get("/SaveProfile",function(req,res){
   res.send("add");
});

/*****Login with Facebook******/
router.get("/facebook/login",function(req,resp){
  // Generate Login URL
  var url = graph.getOauthUrl({
    client_id: FACEBOOK_CREDENTIALS.web_client_id,
    redirect_uri: FACEBOOK_CREDENTIALS.web_redirect_uris[0],
    scope:['public_profile','email']
  });
  resp.send("<a href='"+url+"'>Login With Facebook</a>");
});


router.get('/facebook/callback',function(req,resp){
  console.log("callback");
  graph.authorize({
        "client_id":      FACEBOOK_CREDENTIALS.web_client_id,
        "redirect_uri":   FACEBOOK_CREDENTIALS.web_redirect_uris[0],
        "client_secret":  FACEBOOK_CREDENTIALS.web_client_secret,
        "code":           req.query.code
    },function (err, facebookRes) {
      graph.setAccessToken(facebookRes.access_token)
      graph.get("/me?fields=id,name,picture.width(300),email",function(err,result){
        var user = new UserModel({
          name:result.name,
          email:result.email,
          image:result.picture.data.url,
          tokens:{'access_token':facebookRes.access_token,'expires_date':facebookRes.expires_in}
        });
        user.save(function(err,doc){
          if(!err)
           resp.json(result);
          else
            resp.json(err);
        });
      });
    });
});
module.exports = router;
