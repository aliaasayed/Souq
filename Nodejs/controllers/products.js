var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();
//var multer = require("multer");
var fs = require("fs");
var mongoose = require("mongoose");
var ProductsModel = mongoose.model("products");
//var fileUploadMid = multer({dest:"./public/images"});

/******** Enable Front-End Access*******/
router.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Content-Type");
  res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
  next();
});


/****************** Add Product ******************/
router.post("/add",bodyParser.json(),function(request,response)
{
  console.log(request.body);
    var product = new ProductsModel({

         _id: new mongoose.Types.ObjectId,
        name:request.body.name,
        price:request.body.price,
        offer:request.body.offer,
        stock:request.body.stock,
        description:request.body.description,
        category:request.body.category,
        subcategory:request.body.subcategory,
        DateOfEntry: new Date(),
        specifications:request.body.specifications,
        SellerID:request.body.SellerID,
        image:request.body.image,
        rating:{1:0, 2:0, 3:0, 4:0, 5:0, T:0}

      });
    product.save(function(err,doc){
    if(!err)
    {
        console.log("entry success");
        response.json("added");
    }
    else
        response.json(err);
    });
});

//**************************************************
router.post("/update/:id",bodyParser.json(),function(req,resp){
  // req.file.filename
  console.log(req.body);

  if(req.body.image)
  {
      ProductsModel.update({_id:req.params.id},{"$set":{
        name:req.body.name,
        price:req.body.price,
        offer:req.body.offer,
        stock:req.body.stock,
        description:req.body.description,
        category:req.body.category,
        subcategory:req.body.subcategory,
        specifications:req.body.specifications,
        image:req.body.image,
      }},function(err,data){
      if(!err)
        resp.json("done image");
    });
  }
else{
    ProductsModel.update({_id:req.params.id},{"$set":{
      name:req.body.name,
      price:req.body.price,
      offer:req.body.offer,
      stock:req.body.stock,
      description:req.body.description,
      category:req.body.category,
      subcategory:req.body.subcategory,
      specifications:req.body.specifications,
    }},function(err,data){
    if(!err)
      resp.json("done");
  });
}
});
/////////

router.get("/Plist/:page?",function(req,res){
  var page = req.params.page ? req.params.page:1;
   // res.json("kk");
  ProductsModel.paginate({},{page:page,limit:2},function(err,result){
  res.json({productsData:result});
  });
});

//******************************************************
router.get("/update/:Id",function(request,response)
{
    ProductsModel.findOne({_id:request.params.Id},function(err,data){
   // response.product = data;
    response.json(data);
});
});

router.post("/delete",urlEncodedMid,function(request,response)
{
    ProductsModel.remove({_id:request.body.Id},function(err,data){
        if(!err)
        {
            console.log("success");
            response.send("delete success");
        }

        else
          response.json(err);
      });
});

/*************get All products *************/
router.get("",function(request,response)
{
  ProductsModel.find({},function(err,data){
      response.send(data)
  });
});



/*************Get products by seller ID *************/
/*** ++ calculate total-rating and send along with data ***/
router.get("/seller/:sellerId/:page",function(request,response)
{
  ProductsModel.paginate({SellerID:request.params.sellerId} , {page:request.params.page,limit:3}, function(err,data){
    response.json(data);
  });
});


/****************** Rate Product*********************/
router.post("/rate",urlEncodedMid,function(request,response)
{
    ProductsModel.findById(request.body.Id, function (err, product) {
        if (err)
        {
           var error = console.log("error here");
           return error;
        }


        var myrate = request.body.myRating

        console.log(product.rating[myrate]);

       product.rating.myrate = product.rating[myrate]++;

       //calculate total rating:
       product.rating.T = (
                            product.rating[1] * 1 +
                            product.rating[2] * 2 +
                            product.rating[3] * 3 +
                            product.rating[4] * 4 +
                            product.rating[5] * 5
                          )/
                          (
                            product.rating[1] +
                            product.rating[2] +
                            product.rating[3] +
                            product.rating[4] +
                            product.rating[5]
                          );

      product.rating.T = Math.round(product.rating.T*10)/10;



        product.save(function (err, updatedProduct) {
          if (err)
          {
            console.log("error here2");
            // return error2;
            response.send("er")
          }
          else
          {
          console.log("update success");
          response.send("update success");
          }
        });
      });
});

//---------------------------------------------------------------------

router.get("/search/:key?/:cat?/:page?",function(req,res)
{

  var key = req.params.key ? req.params.key:'';
  var page = req.params.page ? req.params.page:1;
  var cat;

  if(req.params.cat)
    cat =req.params.cat.split('+');

  var regexValue='\.*'+key+'\.';
  console.log(key)
  console.log(cat.length)
  if(cat.length>1){
     console.log(1)
        ProductsModel.paginate(
          {
            $and:[{name:new RegExp(regexValue, 'i')}
            ,{subcategory:{$in:cat}} ]
          },{page:page,limit:2},function(err,result){
        res.json({productsData:result});
        });
  }

  else{
     console.log(2)
    ProductsModel.paginate(
      {name:new RegExp(regexValue, 'i')},{page:page,limit:2},function(err,result){
    res.json({productsData:result});
    });
  }
});

//{name:new RegExp(/lack/, 'i'),subcategory:{$in:["shoes"," "]}}

module.exports = router;
