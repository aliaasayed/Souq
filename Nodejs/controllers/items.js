var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();
var mongoose = require("mongoose");
var ItemModel = mongoose.model("items");

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
  console.log("items called");
  // res.send("haaay");
});

/**************** Show My cart ********************
>>inputs required: clientId as a parameter */
router.get("/myCart/:cId",function(req,res){
  ItemModel.find({clientId:req.params.cId},function(err,result){
    res.json(result);
  });
  console.log("items called");
  // res.send("haaay");
});

/**************** Add to cart ********************
>>inputs required: clientId, prodId */
router.post("/addToCart",urlEncodedMid, function(req, res){
	var newCartItem = new ItemModel();
	newCartItem._id = new mongoose.Types.ObjectId;
	newCartItem.clientId = req.body.clientId;
	newCartItem.prodId = req.body.prodId;
	newCartItem.quantity = 1;
	newCartItem.state = 'Cart';

	newCartItem.save(function(err, item){
		if(err){
			res.send(err);
		}
		else{
			console.log("item is added");
			res.send(item._id);
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