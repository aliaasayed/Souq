var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();
//var multer = require("multer");
var fs = require("fs");
var mongoose = require("mongoose");
var ProductsModel = mongoose.model("products");
var RatingsModel = mongoose.model("ratings");
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

router.get("/Plist/:subCatName/:page?",function(req,res){
  var page = req.params.page ? req.params.page:1;
   // res.json("kk");
  ProductsModel.paginate({ $and: [ {subcategory: req.params.subCatName}, { stock: {$gt: 0}} ] }
    ,{page:page,limit:2},function(err,result){
      console.log(result);
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

/*************Get products (paginated) by subcategory *************
****** Take subCat ID and return orders of his products *****
*if productId is given it will return product (select product) ***/
router.get("/showSubProducts/:subCatName/:page?",function(req,res){
  ProductsModel.paginate({subcategory: req.params.subCatName},{page:req.params.page,limit:5}, function(err,products){
    if (products) {
          res.json(products);
      }
      else {
          res.send("Error: No product Found!");
      }

  });
});

/************* get product by ID  *************/
router.get("/showProduct/:pId",function(request,response)
{
  ProductsModel.find({_id: request.params.pId},function(err,product){
      if (product) {
          response.json(product);
      }
      else {
          response.send("Error: No product Found!");
      }
  });
});


/****************** Rate Product *********************/
/*** ++ calculate total-rating and send along with data ***/
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

      product.rating.T = Math.round(product.rating.T);



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

// ----------------------new rating------------------------------------
router.post("/rating",urlEncodedMid,function(request,response)
{
    var productID = request.body.pId;
    var userID = request.body.uId;
    var newrate = request.body.myRating
    // console.log(typeof newrate)
    // console.log(product.rating[myrate]);


    RatingsModel.find({ $and: [ { product_id: { $eq: productID } }, { user_id: { $eq: userID } } ] } , function(error, results) {
        if (results != "")
        {
            // console.log(results);
            var oldRating = results.rating
            // console.log(typeof oldRating)
            if (oldRating != newrate)
            {
              results.rating = newrate;
              ProductsModel.findById(request.body.pId, function (err, product) {
                if (err)
                  {
                    var error = console.log("error here");
                    return error;
                  }
                else
                  {
                    product.rating.oldRating = product.rating[oldRating]--;
                    product.rating.newrate = product.rating[newrate]++;
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
                    product.save(function (err, updatedProduct)
                    {
                        if (err)
                          {
                            console.log(product);
                            console.log(err);
                            response.send(err)
                          }
                        else
                          {
                          console.log("update success");
                          response.send("update success");
                          }
                    });
                  }
              });
            }
            else
            {
              response.send("no update to record");
            }

        }
        else
        {
          var rating = new RatingsModel({
          product_id: productID,
          user_id: userID,
          rating: newrate,
          });

          rating.save(function(err,doc){})

          ProductsModel.findById(productID, function (err, product) {
            if (err)
              {
                var error = console.log("error here");
                return error;
              }
            else
              {
                console.log(productID)
                console.log(product)
                product.rating.newrate = product.rating[newrate]++;
              }

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
          product.save(function (err, updatedProduct)
          {
              if (err)
                {
                  console.log(err);
                  response.send(err)
                }
              else
                {
                console.log("update success");
                response.send("update success");
                }
          });


        });
      }



});
});


//---------------------------------------------------------------------
//pric 0:100
router.get("/search/:key?/:cat?/:price?/:page?",function(req,res)
{

  var key = req.params.key ? req.params.key:'';
  var page = req.params.page ? req.params.page:1;
  var pricelow = req.params.price ? req.params.price.split(":")[0]:0;
  var pricehigh = req.params.price ? req.params.price.split(":")[1]:10000000;
  console.log(req.params.price,"ccccccccccc",pricelow,pricehigh)
  var cat;

  if(req.params.cat)
    cat =req.params.cat.trim().split(',');
  var regexValue='\.*'+key+'\.';
  console.log("cat",cat)
  if(cat.length>=1&&cat[0].trim()!=''){
     console.log("1kkkkkkkkkkkkkkkkkkkkkkkkkkk")
        ProductsModel.paginate({
           name:new RegExp(regexValue, 'i'),
            subcategory:{"$in":cat},price:{ "$gt" : pricelow, "$lt" : pricehigh},
          },{page:page,limit:2},function(err,result){
        res.json({productsData:result});
        });
  }

  else{
     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ProductsModel.paginate({name:new RegExp(regexValue, 'i')
   ,price:{ "$gt" : pricelow, "$lt" : pricehigh}
  },{page:page,limit:2},function(err,result){
    res.json({productsData:result});
    });
  }

});

// // ----------------------offers without limit------------------------------
// router.get("/ooosoffers",function(request,response)
// {
//     var filter = { offer: { $exists : true } };
//     var fields = {};
//     var options = {sort:{ DateOfEntry: -1 }};
//
//     ProductsModel.find(filter, fields, options, function(err, results){
//         if (!err) {
//           console.log(results);
//           response.json(results)
//         }
//       })
//
// });
// ----------------------offers with limit------------------------------
router.get("/offers",function(request,response)
{

    var filter = { $or: [ { offer: { $gt: 0 } }, { offer: { $ne : null } } ] } ;
    var fields = {};
    var options = {sort:{ DateOfEntry: -1 },limit: 5};
    ProductsModel.find(filter, fields, options, function(err, results){
        if (!err) {
          console.log(results);
          response.json(results)
        }
      })

});


// ------------------show total rating------------------------------
router.post("/avgrating",urlEncodedMid,function(request,response)
{
    ProductsModel.findOne({_id:request.body.Id},function(err,data){
   // response.product = data;

   console.log(data.rating["T"])
    response.json(data.rating["T"]);
});
})

// ---------------------Top Trending---------------------------------
router.post("/toptrending",urlEncodedMid,function(request,response)
{
    ProductsModel.findOne({_id:request.body.Id},function(err,data){
   // response.product = data;

   console.log(data.rating["T"])
    response.json(data.rating["T"]);
});
})

module.exports = router;
