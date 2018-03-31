var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();
var mongoose = require("mongoose");
var ItemModel = mongoose.model("items");
var UserModel = mongoose.model("users");
var ProductsModel = mongoose.model("products");
var jwt=require("jsonwebtoken");


console.log("Iam INNNN");


//*****************veifyToken***********************//
function verifyJWToken(req,res,next){
  const authHeader=req.headers['authorization'];
  if( typeof authHeader!=="undefined"){
     req.token=authHeader;
     jwt.verify(req.token,'myscret',(err,data)=>{
        if(!err){
        req.uid=data.userdata._id;
        next();
      }
      });
  }
  else
    res.json({"error":"not no token exist for autherize"})
}
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


/**************** Show my Orders *********************
** Return client orders not in cart (Ordered or Delivered) **/
router.get("/cOrders/:cId/:page",function(req,res){
  ItemModel.find(
    {clientId:req.params.cId, state: {$in: ['Ordered', 'Delivered']} },
     function(err,result){
        prodIds = [];
        stateArr = [];
        for (i in result){
          prodIds.push(result[i].prodId);
          stateArr.push(result[i].state);
        }

        ProductsModel.paginate(
          {_id: {$in: prodIds} },
          {page:req.params.page,limit:3},
          function(err,product){
            if (product) {
              product = product.docs;
            }
            else {
                res.send("Error: No product Found!");
            }

            final = [];
            for(p in product){
              cPro={trate: Math.round(product[p].rating.T),
                    name: product[p].name,
                    id:product[p]._id,
                    description: product[p].description,
                    image: product[p].image,
                    stock: product[p].stock,
                    price: product[p].price,
                    state: stateArr[p]
                   }
              final.push(cPro);
            }

            res.json(final);
          });
    });
  });


/**************** Show Seller Ordered Items *******************
****** Take seller ID and return orders of his products *****
***** if itemID is given it will return item (select item) ***/
router.get("/sellerOrders/:sID/:page/:OID?",function(req,res){
  ItemModel.find({state:'Ordered'}).
  populate('prodId').
  exec(function(err,orders){
    if (err) return handleError(err);
    ordersArr=[]
    for (i in orders){
      if(orders[i].prodId.SellerID == req.params.sID){
        ordersArr.push(orders[i]);
      }
    }

    if(req.params.OID){       //if orderId was given
      for(j = 0; j < ordersArr.length; j++){
        if(ordersArr[j]._id == req.params.OID){
          res.json(ordersArr[j]);
          console.log("An order selected");
          break;
        }
      }
    }
    else{
      p = req.params.page;
      final=[ordersArr.length, ordersArr.slice(p*3-3, p*3)];
      res.json(final);
      console.log("Seller orders retrieved");
    }

  });
});

///****************8 my update////////////////////////
 router.get("/mycartCount",verifyJWToken,function(req,res){
  console.log("mycartCount ",req.uid);
   ItemModel.find({"clientId":req.uid,"state":"Cart"},function(err,result){
       if(!err)
        res.json(result.length);
      else
        res.json({"error":"DB error"})
       });
 });

  router.get("/myCart/:page?",verifyJWToken,function(req,res){
    var page = req.params.page ? req.params.page:1;

    ItemModel.find({'state':"Cart","clientId":req.uid},function(err,result){
      if(!err){
        ProductsModel.populate(result,{path:"prodId",select:["name","price","image","stock"]}, function(err,result){
            if(!err)
            {
              chunk=2;
              pagesNumber=Math.ceil(result.length/chunk);
              p=0;
              tempres=[];
              totalPrice=0;
              for (i=0; i<result.length ; i++) {
                   totalPrice += result[i].prodId.price*result[i].quantity;
              }
              for (i=0,j=pagesNumber; i<j,p<page ; i+=chunk,p++) {
                   tempres = result.slice(i,i+chunk);
              }

                 res.json({"resultArr":tempres,"pages":pagesNumber,"totalprice":totalPrice});

            }

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
router.post("/addToCart",[verifyJWToken,bodyParser.json()], function(req, res){
	var newCartItem = new ItemModel();
	newCartItem._id = new mongoose.Types.ObjectId;
	newCartItem.clientId = req.uid;
	newCartItem.prodId = req.body.prodId;
	newCartItem.quantity = 1;
	newCartItem.state = 'Cart';
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
>>Change all products with 'Cart' state to 'Ordered' if it's stock >0*/
router.post('/mycart/checkout',[verifyJWToken,bodyParser.json()] ,function(req, res){
 console.log("check out")
  checkedout=[];
  notcheckedout=[];
  ItemModel.find({'state':"Cart","clientId":req.uid},function(err,result){
    if(!err){
      ProductsModel.populate(result,{path:"prodId",select:["_id","stock","name"]}, function(err,result){
        for (var i=0;i<result.length;i++){
                 if(result[i].prodId.stock>=result[i].quantity) //update order to delviered then subtract quantity of product
                   {
                     newquan=result[i].prodId.stock-result[i].quantity;
                    ItemModel.update({'state':"Cart", 'clientId': req.uid,'prodId':result[i].prodId},
                      {'$set': {'state':'Ordered'} },
                      function(err,data){
                       console.log(" error in update ItemModel",data)
                      });

                      ProductsModel.update({'_id':result[i].prodId},
                          {'$set': {'stock':newquan} },
                          function(err,data){
                               console.log(" error in update ProductsModel",data)

                          });
                          checkedout.push(result[i].prodId.name)
                 }
                 else {

                    key=result[i].prodId.name;
                    val=result[i].prodId.stock;
                      notcheckedout.push({key:key})
                 }
       }
         console.log(checkedout,notcheckedout)
         res.json({"checkedout":checkedout,"notcheckedout":notcheckedout})
      });

    }
  });
});

/**************** In cart check ********************
>>take clientId and prodId and
>>check the existance of the product in customer cart'*/
router.post("/checkCart",[verifyJWToken,bodyParser.json()], function(req, res){
	ItemModel.count({
		'clientId': req.uid,
		'prodId': req.body.prodId,
		'state':"Cart"
	}, function (err, docs) {
     if(!err){
             if (docs>0 )
               res.json({"mes":"exist"});

            else
              res.json({"mes":"notexist"});
              }
    else{
        console.log("error")
  		  res.json({"mes":"db err"});
     }

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
router.post('/myCart/delete', [verifyJWToken,bodyParser.json()],function(req, res){
 console.log(req.uid,req.body)
 ItemModel.findOne({_id:req.body.orderId},function(err,data){
  if(!err)
   {
     console.log("remove")
     ItemModel.remove({_id:req.body.orderId},function(err,data){
       if(! err)
        res.json({"sucess":"removed"})
       else
         res.json({"fail":"Db delete"})
     });
   }
   else {
     res.json("DB error");
   }
 });
});

router.post('/myCart/updateQuan', [verifyJWToken,bodyParser.json()],function(req, res){ //update orderQaun item
  ItemModel.update({'_id': req.body.orderId},
    {'$set': {'quantity':req.body.newQuan} },
    function(err){
      if(err){
        res.json({"err":err});
      }
      else
        res.json("Item quan updated successfuly");
    })
});

module.exports = router;
