var mongoose = require ("mongoose");
var Schema = mongoose.Schema;


//******** Building Schema*******
var items = new Schema({
	_id:Schema.Types.ObjectId,

	clientId:{ type: Schema.Types.ObjectId ,  ref:"users"	},

	prodId:{type: Schema.Types.ObjectId ,ref:"products"},

	quantity:{type: Number}, //ref:"products"

	state: {type: String, enum:['Delivered', 'Ordered', 'Cart']}

});


//******** Registering *******
mongoose.model("items", items);
