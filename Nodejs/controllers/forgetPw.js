var nodemailer = require('nodemailer');
var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});//to use qs instead of querystring
var router = express.Router();

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

  var mailOptions = {
    from: 'souqCaret@gmail.com',
    to: req.body.email,
    subject: 'souqCaret forget password helper ',
    text: 'souqCaret password '
  };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          res.json({'error':error});
      } else {
        res.json({'success':info.response});
      }
    });

    // else{
    //   res.json({'error':"Email isnot exist"});
    // }
});

module.exports = router;
