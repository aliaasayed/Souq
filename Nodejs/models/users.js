var mongoose = require("mongoose");

// ORM Mapping ...
var Schema = mongoose.Schema;

var users = new Schema({
  name:String,
  password:String,
  email:String,
  address:String,
  image:String,
  nationalID:Number,
  tokens:Schema.Types.Mixed,
});

// Register ...
mongoose.model("users",users);
// Mongoose Hooks ...


