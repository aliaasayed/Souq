var express = require("express");
var multer  = require("multer");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();
var mongoose = require("mongoose");
var fileUploadMid = multer({dest:"./public/images"});
var UserModel = mongoose.model("users");
var fs = require('fs');


router.get("/login",function(req,resp){
  var message = req.flash('msg');
  resp.render("auth/login",{ msg : message });
});

router.post("/login",urlEncodedMid,function(req,resp){


});


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

router.get("/sellerRegister",function(req,resp){
  resp.render("auth/sellerRegister");
})


module.exports = router;
