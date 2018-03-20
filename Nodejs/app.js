var express = require("express");
var session = require("express-session");
var fs = require("fs");
var server = express();
var path = require('path');
var flash = require("connect-flash");
var mongoose = require("mongoose");
//mongodb://admin:123456@localhost:27017/Souq --> AuthMod
mongoose.connect("mongodb://localhost:27017/Souq");


fs.readdirSync(path.join(__dirname,"models")).forEach(function(filename){
    require('./models/'+filename);
});

server.use(express.static('public')); // JS && CSS && Images ...
// // var apiRouter = require("./controllers/api");
// // server.use("/api/users",apiRouter);

// request.session
server.use(session({
  secret:"!@#$#@%#$^%!@#$%" ,
  cookie:{maxAge: 60 * 60 * 24 * 7 * 1000 }
}));

server.use(flash());
// request.flash('key','value')


var authRouter = require("./controllers/auth");
var userRouter = require("./controllers/users");


// // Auth Mid
// server.use(function(req,resp,next){
//   if(req.session.logged){
//     resp.locals={
//       username:req.session.username
//     }
//     next();
//   }

//   else
//     resp.redirect("/auth/login");
// });



server.set("view engine","ejs");
server.set("views","./views");



server.use("/auth",authRouter);
server.use("/users",userRouter);

server.listen(9090);
