var express = require("express");
var fs = require("fs");
var multer  = require("multer");
var mongoose = require("mongoose");
var fileUploadMid = multer({dest:"./public/images"});
var UserModel = mongoose.model("users");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended: true});
var jwt=require("jsonwebtoken");
var router = express.Router();

/******* Register ********/
router.post("/register",urlEncodedMid,function(req,resp){
console.log(req.body);
  var user = new UserModel({
    name:req.body.username,
    password:req.body.password,
    email:req.body.email,
    address:req.body.address,
    image:req.body.image,
    nationalID:req.body.nationalID,
    tokens:req.body.token,
  });
  saveProfile(user,function(DBRes){
      resp.json(DBRes);
  });
});


/********User Login*********/
router.post("/userlogin",urlEncodedMid,function(req,resp){
  UserModel.findOne({email:req.body.email,password:req.body.password},function(err,data){
   if(data != null && !err)
   {
     const payload = {email: data.email};
     const token=jwt.sign(payload,'myscret');
     resp.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          user:data
        });
  }
  else
  {
    resp.json({"error":"invalid Username or password"});
  }
  });
});

/***********JWT*********/
router.get('/verify',verifyJWToken,function(req,res){
  jwt.verify(req.token,'myscret',(err,data)=>{
    if(!err)
      res.json({"success":"valid"});
    else
    res.json({"error":"invalid"})
  });
});

///////////////////////////////////////////////
router.get('/api/protected',verifyJWToken,function(req,res){
  jwt.verify(req.token,'myscret',(err,data)=>{
    if(!err)
      res.json({"success":data.email});
    else
    res.json({"error":err})
  });
});

///// jwt Mw verifyJWToken
function verifyJWToken(req,res,next){
  const authHeader=req.headers['authorization'];
  if( typeof authHeader!=="undefined"){
     req.token=authHeader;
     next();
  }
  else
    res.json({"error":"not verified"})
}

/*****User Logout******/
router.get("/logout",function(req,resp){
  req.session.destroy();
  resp.redirect("/auth/login");
});

function saveProfile(user,cb){
  isUserExist(user.email,function(Udata){
    console.log(Udata)
    if(!Udata.error&&Udata==false){
      user.save(function(err,doc){
        if(!err)
          cb(true);
        else
          cb(false);
      });
    }
    else
      cb("user email exist");
  });
}

function isUserExist(Useremail,cb){
  UserModel.findOne({email:Useremail},function(err,data){
    if(!err)
      if(data==null)
         cb(false);
      else
        cb(true);
    else
      cb({"error":err});

    });
}

/*****User Logout******/
router.get("/logout",function(req,resp){
  req.session.destroy();
  resp.redirect("/auth/login");
});

// function refreshTokenGmail(tokens){
//   oauth2Client.setCredentials(tokens);
//   //regresh token
//   oauth2Client.refreshAccessToken(function(err,tokens) {
//     // your access_token is now refreshed and stored in oauth2Client
//     // store these new tokens in a safe place (e.g. database)
//   });
// }
//

module.exports = router;
