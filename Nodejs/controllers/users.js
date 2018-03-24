var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();
var multer = require("multer");
var fs = require("fs");
var mongoose = require("mongoose");
var jwt=require("jsonwebtoken");

var UserModel = mongoose.model("users");
var fileUploadMid = multer({dest:"./public/images"});


function verifyJWToken(req,res,next){
  const authHeader=req.headers['authorization'];
  if( typeof authHeader!=="undefined"){
    jwt.verify(authHeader,'myscret',(err,data)=>{
      if(!err){
        req.data=data;
        next();
      }
      else
        res.json({"error":"not verified"})
      });
  }
  else
    res.json({"error":"no token exist"})
}


router.get("/list",function(req,resp){
  UserModel.find({},function(err,result){
    resp.render("users/list",{users:result});
  });
});


router.get("/profile",verifyJWToken,function(req,resp){
  UserModel.findOne({email:req.data.email},function(err,data){
    resp.json({user:data});
  });
});

router.get("/edit/:id",function(req,resp){
  UserModel.findOne({_id:req.params.id},function(err,data){
    resp.render("users/edit",{user:data});
  });
});


router.post("/edit/:id",fileUploadMid.single('image'),function(req,resp){
  // req.file.filename
  UserModel.update({_id:req.params.id},{"$set":{name:req.body.username,email:req.body.email,password:req.body.password,address:req.body.address}},function(err,data){
    if(!err)
      resp.send("TRUE");
    else
    {
      resp.send("error");
    }
  })
});
module.exports = router;
