const Thesaurus = require('./thesaurus_model');
//const User = require('./user_model');
const express = require('express');
//const router = express.Router();

exports.findAll = function findWord(req, res){
	let query = {};
	if(req.params.user){
		query.username = req.params.user;
	}
	Thesaurus.find(query, (err, allWords) =>{
	
	}
	);
};

exports.findOne = function findWord(req, res) {
  	let query = {
  		word: req.params.word,
  		username: req.params.user
  	};
	Thesaurus.findOne(query, (err, word) => {

	});
};

exports.addOne = function addWord(req, res) {
	
	//console.log(req.params.user);
	//console.log(res);
	//return res.status(200).send();
	  const newWord = new Thesaurus();
	  newWord.owner = req.params.user;
	  newWord.word = req.body.word;
	  newWord.type = req.body.type;
	  newWord.definition = req.body.definition;
	  //console.log(newWord);
	newWord.save((err) => {
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		console.log(newWord);
		return res.status(200).send();
  	});
};

exports.update = function updateWord(req, res) {
	let query = {
  		word: req.params.word,
  		username: req.params.user
  	};
	Thesaurus.findOne(query, (err, word) => {
		word.synonms = req.body.synonms;
		word.save((err2) => {

		});

	});
};

exports.delete = function deleteWord(req, res) {
	let query = {
		owner: req.params.user,
  		word: req.params.word
  	};
	Thesaurus.remove(query,(err) =>{
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		//console.log(newUser);
		return res.status(200).send();
	});
	
	// findOneAndRemove(query, (err) => {
	// 	if(err){
	// 		console.log(err);
	// 		return res.status(500).send();
	// 	}
	// 	//console.log(newUser);
	// 	return res.status(200).send();
  	// });
};

// router.post('/users',function(req,res){
// 	var username = req.body.username;
// 	var password = req.body.password;
// 	var newuser = new User();
// 	newuser.username = username;
// 	newuser.password = password;
// 	newuser.save(function(err,savedUser){
// 		if(err){
// 			console.log("err");
// 			return res.status(500).send();
// 		}
// 		return res.status(200).send();
// 	})
// })