var express = require("express");
var session = require("express-session");
var fs = require("fs");
var server = express();
var path = require('path');

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Souq_com");


fs.readdirSync(path.join(__dirname,"models")).forEach(function(filename){
    require('./models/'+filename);
});

server.set("view engine","ejs");
server.set("views","./views");


var authRouter = require("./controllers/Auth");
server.use("/auth",authRouter);
// Auth Mid
// server.use(function(req,resp,next){
//     resp.redirect("/auth/login");
// });

var forgPwRouter = require("./controllers/forgetPw");
server.use("/forgetPw",forgPwRouter);
server.listen(9090,function(){
  console.log("Starting listen...");
});
