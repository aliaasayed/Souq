var express = require("express");
var session = require("express-session");
var https = require("https");
var fs = require("fs");
var server = express();
var path = require('path');
var flash = require("connect-flash");
var mongoose = require("mongoose");
//mongodb://admin:123456@localhost:27017/Souq --> AuthMod
mongoose.connect("mongodb://localhost:27017/Souq");

var options = {
  key: fs.readFileSync(__dirname+"/httpslicense/server.key"),
  cert: fs.readFileSync(__dirname+"/httpslicense/server.crt")
};

var httpsServer = https.createServer(options,server);

server.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

// var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/Souq_com");


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


var signUpRouter = require("./controllers/auth");
var userRouter = require("./controllers/users");


server.use("/signUp",signUpRouter);
server.use("/users",userRouter);


server.set("view engine","ejs");
server.set("views","./views");

var forgPwRouter = require("./controllers/forgetPw");
server.use("/forgetPw",forgPwRouter);

var authRouter = require("./controllers/Auth");
server.use("/auth",authRouter);

//Auth Mid
// server.use(function(req,res,next){
//   if(req.session.logged){
//     res.locals={
//       //save suer id
//       username:req.session.username,
//       userimage:req.session.image
//     }
//     res.json(res.locals)
//   }
//   else
//   res.redirect("/auth/login/GooglePlusLogin");
// });



httpsServer.listen(9090,function(){
  console.log("Starting listen...");
});
