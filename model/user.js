var mongoose = require("mongoose");

//Create a schema
var userSchema=new mongoose.Schema ( {
	
	name: { type:String, min:0, max:500 },
	email: String, 
	address: { type : Array , "default" : [] }
	})
//create model if not exists
module.exports = mongoose.model('user', userSchema);
