var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();
var mongoose = require("mongoose");
var ItemModel = mongoose.model("items");
var UserModel = mongoose.model("users");
var ProductsModel = mongoose.model("products");


console.log("Iam INNNN");

/******** Enable Front-End Access*******/
router.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Content-Type");
  res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
  next();
});

/**************** Show All Items ********************/
router.get("/show",function(req,res){

  ItemModel.find({},function(err,result){
      res.json(result);
    });
  });

///****************8 my update////////////////////////
 router.get("/mycartCount",function(req,res){
   ItemModel.find({"state":"Cart"},function(err,result){
       if(!err)
        res.json(result.length);
      else
          res.json({"error":"DB error"})
       });
 });

  router.get("/myCart",function(req,res){

    ItemModel.find({},function(err,result){
      if(!err){
        ProductsModel.populate(result,{path:"prodId",select:"price"}, function(err,result){
      if(!err)
        res.json(result);
      else
        res.json({"error":"DB error"})
        });
      }
      else
          res.json({"error":"no DB exist"})
    });

  });

/**************** Show My cart ********************
>>inputs required: clientId as a parameter */
router.get("/myCart/:cId",function(req,res){
  ItemModel.find({clientId:req.params.cId},function(err,result){
    res.json(result);
  });
  console.log("items called");
});

/**************** Add to cart ********************
>>inputs required: clientId, prodId */
router.post("/addToCart",bodyParser.json(), function(req, res){
	var newCartItem = new ItemModel();
	newCartItem._id = new mongoose.Types.ObjectId;
	newCartItem.clientId = req.body.clientId;
	newCartItem.prodId = req.body.prodId;
	newCartItem.quantity = 1;
	newCartItem.state = 'Cart';
    console.log("ssmmmmmmmmmmmms",req.body)
	newCartItem.save(function(err, item){
		if(err){
			res.json(err);
		}
		else{
			res.json({"success":true});
		}
	});
});

/**************** Checkout ********************
>>take clientId and
>>Change all products with 'Cart' state to 'Ordered'*/
router.put('/checkout/:clientId', function(req, res){
	ItemModel.update({'state':"Cart", 'clientId': req.params.clientId},
		{'$set': {'state':'Ordered'} }, { multi: true },
		function(err){
			if(err){
				res.send(err);
			}
			res.send("Checkout was done successfuly");
		})
});

/**************** In cart check ********************
>>take clientId and prodId and
>>check the existance of the product in customer cart'*/
router.post("/checkCart",urlEncodedMid, function(req, res){
	ItemModel.count({
		'clientId': req.body.clientId,
		'prodId': req.body.prodId,
		'state':"Cart"
	}, function (err, docs) {
  		res.json(docs);
		console.log(docs>0?"Already Exists":"New");
	});
});

/**************** Deliver ********************
>>take _id and
>>Change state to Delivered */
router.put('/deliver/:id', function(req, res){
	ItemModel.update({'_id': req.params.id},
		{'$set': {'state':'Delivered'} },
		function(err){
			if(err){
				res.send(err);
			}
			res.send("Item was successfuly Delivered");
		})
});

/*--------------------------------------------------*/

module.exports = router;
