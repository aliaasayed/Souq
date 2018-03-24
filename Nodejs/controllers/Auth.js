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
<<<<<<< HEAD
=======

///////////////////////////////////////////////////
/*****User Logout******/
router.get("/logout",function(req,resp){
  req.session.destroy();
  resp.redirect("/auth/login");
});

////////////////////////////////////////////////////////////////////////////////////////////////
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

/*****User Register******/
router.get("/register",function(req,resp){
  resp.render("auth/register");
});

router.post("/register",bodyParser.json(),function(req,resp){
console.log(req.body);
  //fs.renameSync("./public/images/"+req.file.filename,"./public/images/"+req.file.originalname)
  var user = new UserModel({
    name:req.body.username,
    password:req.body.password,
    email:req.body.email,
    address:req.body.address,
    //image:req.body.imag,
  });
  saveProfile(user,function(DBRes){
      resp.json(DBRes);
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
    nationalID:req.body.ID
  });

  saveProfile(user,function(DBRes){
      resp.json(DBRes);
  });
});

/*****Login with Google******/
router.get("/login/GooglePlusLogin",function(req,res){
  // Generate Login URL
  var urlG = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  res.json(urlG);
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
            CreateProfile(response,tokens,function(addRes){
              if(addRes==true)
                res.redirect("/auth/SaveProfile");
              else
                 res.json({"error":addRes});
             });
          }
          else
               res.json({"error":err});
        });
    }
    else
       res.json({"error":"error while try login with gmail"});
  });
});


>>>>>>> 946ecb84fe0be0c0aa60653245480cebf038a315
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
