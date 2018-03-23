var mongoose = require ("mongoose");
var Schema = mongoose.Schema;

//******** Building Schema*******
var categories = new Schema({
	_id:Schema.Types.ObjectId,
	Name: String,
	subcategories: [String]
});

//******** Registering ******
mongoose.model("categories", categories);

