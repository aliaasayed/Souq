var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ratings = new Schema({
    product_id:
    {
        type: Schema.Types.ObjectId,
        ref:"products"
    },
    user_id:
    {
        type: Schema.Types.ObjectId,
        ref:"users"
    },
    rating:
    {
        type:Number
    }

});
mongoose.model("ratings",ratings);
