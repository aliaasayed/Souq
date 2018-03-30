var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();
var mongoose = require("mongoose");
var CatModel = mongoose.model("categories");

/******** Enable Front-End Access*******/
router.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Content-Type");
  res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
  next();
});
//*****************************************************************
// router.get("/cat",function(req,resp){
// console.log("req.body");
//   var cat = new CatModel({
//     _id: new mongoose.Types.ObjectId,
//     Name:"Apparel, Shoes & Accessories",
//     subcategories:["Footwear","Bags & Wallets","Clothing","Watches & Accessories"],
//   });
//   cat.save(function(err,doc){
//   if(!err)
//       resp.json("added");
//   else
//       resp.json(err);
//   });
// });
/*********** Show All categories (&their subs) ***************/
router.get("/list",function(req,res){
  CatModel.find({},function(err,result){
    res.json(result);
  });
  console.log("items called");
  // res.send("haaay");
});

/*********** Show Subcategories by category ID **************
>>inputs required: categoryId as a parameter */
router.get("/listSub/:catId",function(req,res){
  CatModel.find({_id:req.params.catId},function(err,result){
    res.json(result[0].subcategories);
  });
  console.log("items called");
  // res.send("haaay");
});

router.get("/sub/:name",function(req,res){
  CatModel.find({Name:req.params.name},function(err,result){
    console.log(result[0]);
    res.json(result[0]);
  });
});

module.exports = router;
