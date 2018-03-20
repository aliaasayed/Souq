var express = require("express");
var session = require("express-session");
var fs = require("fs");
var server = express();
var path = require('path');

var session = require('express-session');
server.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Souq_com");


fs.readdirSync(path.join(__dirname,"models")).forEach(function(filename){
    require('./models/'+filename);
});

server.set("view engine","ejs");
server.set("views","./views");

var forgPwRouter = require("./controllers/forgetPw");
server.use("/forgetPw",forgPwRouter);

var authRouter = require("./controllers/Auth");
server.use("/auth",authRouter);
//Auth Mid
server.use(function(req,res,next){
  if(req.session.logged){
    res.locals={
      //save suer id
      username:req.session.username,
      userimage:req.session.image
    }
    res.json(res.locals)
  }
  else
  res.redirect("/auth/login/GooglePlusLogin");
});



server.listen(9090,function(){
  console.log("Starting listen...");
});
