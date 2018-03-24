var nodemailer = require('nodemailer');
var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});//to use qs instead of querystring
var router = express.Router();
var mongoose = require("mongoose")
var UserModel = mongoose.model("users");
var randomstring = require("randomstring");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'souqCaret@gmail.com',
    pass: 'souqCaret1234'
  }
});

 router.get("/sendPw",function(req,res){

      res.render("forget")
 });

router.post("/sendPw",urlEncodedMid,function(req,res){

  UserModel.findOne({email:req.body.email},function(err,data){

   if(data != null){//email exist in data base

    randomstring.generate();
     var newPw= randomstring.generate(8);

    //update exist Pw with sended one
     var mailOptions = {
       from: 'souqCaret@gmail.com',
       to: req.body.email,
       subject: 'souqCaret forget password helper ',
       text: 'souqCaret Newpassword is :'+newPw
     };
       transporter.sendMail(mailOptions, function(error, info){
         if (error)
             res.json({'error':error});
         else
           res.json({'success':info.response});
       });//transporter
   }

   else
       res.json({'error':"Email isnot exist"});
     });
   });

module.exports = router;
