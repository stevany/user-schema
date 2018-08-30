var User = require('../model/user');
var express = require('express');
var router = express.Router();
//get all users
router.route('/users')
	.get(function(req,res) {
		var response = {};
		User.find( {}, function(err,data) {
			//Mongo command to fetch all data from collection.
			if(err){
				response = { "err": true, "data": "Error fetching data " };
			}else{
				response = { "data" : data };
			}
			res.json(response);
		});
	})
	.post(function(req,res) {
		var user = new User(req.body);
		var response = {};
		//post user
		user.save(function(err,data) {
			if(err) {
				response = {"error" : true, "data" : "Error adding data"};
			}else{
				response = { "data": data };
			}
			res.json(response)
		})
	})

router.route("/users/:id")
	.get(function(req,res) {
		var response = {};
		User.findById(req.params.id,function(err,data) {
			if(err) {
				response={"error ": true, "data" : "Error fetching data"};
			}else{data
				response={"error" : false, "data" : data};
			}
			res.json(response);
		});
	})
	.put(function(req,res) {
		var response = {};
		//find the data
		User.findById(req.params.id,function(err,data) {
			if(err) {
				response = { "error": true, "data" : "Error fetching data" };
			}else {
				//data exists
				if(req.body.name !== undefined){
					data.name=req.body.name;
				}
				//save the data
				data.save(function(err){
					if(err){
						response={ "error" : false, "data" : "Data is updated for " + req.params.id };
					}
					
					res.json(response);
				})
			}
		})
	})
	.delete(function(req,res){
		var response = {};
		//find the data
		User.findById(req.params.id, function(err,data) {
			if(err) {
				response = { "error" : true , "data" : "Error fetching data" };
			}else{
				//data exists, remove it.
				User.remove({ _id:req.params.id },function(err){
					if(err){
						response = { "error" : true, "data" : "Error deleting data" };
					}else{
						response = { "error" : true, "data" : "Data associated with " + req.params.id + "is deleted" };
					}
					res.json(response);
				});
			}
		});

	})
//find name
router.route("/user/name/:name")
.get(function(req,res){
	var response = {};
		User.find({ username:(req.params.name) },function(err,data) {
		if(err){
			response = { "error ": true, "data" : "Error fetching data" };
		}else{data
			response = { "error" : false, "data" : data };
		}
		res.json(response);
	});
})
//find city
router.route("/users/:id/address/city")
	.get(function(req,res) {
		var response={};
		User.find({ _id:req.params.id }, { 'address.city':1, '_id':0 }, function(err,data) {
			if(err){
				response = { "error ": true, "data" : "Error fetching data" };
			}else{
				response = { data };
			}
			res.json(response);
		});
	})
router.route("/users/:id/address")
	.delete(function(req,res) {
		var response = {};
		//find the data
		User.update({ _id:req.params.id }, { $unset: { address:true } }, function(err,data) {
			if(err){
				response = { "error" : true, "data" : "Error deleting data" };
			}else{
				response = { "error" : false, "data" : "Address associated with " + req.params.id + "is deleted" };
			}
			res.json(response);
		});
		});

module.exports=router;