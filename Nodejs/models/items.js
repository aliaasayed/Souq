var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var mongoose_paginate= require("mongoose-paginate");


//******** Building Schema*******
var items = new Schema({
	_id:Schema.Types.ObjectId,

	clientId:{ type: Schema.Types.ObjectId ,  ref:"users"	},

	prodId:{ type: Schema.Types.ObjectId, ref: 'products' },
	
	quantity:{type: Number}, //Note = quantity required from the same item 

	state: {type: String, enum:['Delivered', 'Ordered', 'Cart']}

});

items.plugin(mongoose_paginate);
//******** Registering *******
mongoose.model("items", items);
