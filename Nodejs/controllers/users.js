var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();
var multer = require("multer");
var fs = require("fs");
var mongoose = require("mongoose");

var UserModel = mongoose.model("users");

var fileUploadMid = multer({dest:"./public/images"});


router.get("/list",function(req,resp){
  UserModel.find({},function(err,result){
    resp.render("users/list",{users:result});
  });
});


module.exports = router;
