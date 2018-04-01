const Thesaurus = require('./thesaurus_model');
//const User = require('./user_model');
const express = require('express');
//const router = express.Router();

exports.findAll = function findWord(req, res){
	//if(req.params.user){
	//	query.owner = req.params.user;
	//}
	if(!req.session.user){
		return res.status(401).send("Not logged in!");
	}
	console.log({owner: req.session.user.username});
	Thesaurus.find({owner: req.session.user.username}, (err, allWords) =>{
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		//console.log(newUser);
		//console.log(res);
		//console.log(allWords);
		return res.status(200).send(allWords);
	}
	);
};

exports.findOne = function findWord(req, res) {
	if(!req.session.user){
		return res.status(401).send("Not logged in!");
	}
	Thesaurus.findOne({
		word: req.params.word,
		owner: req.session.user.username,
		type: req.params.type
	}, (err, word) => {
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		//console.log(newUser);
		return res.status(200).send(word);
	});
};

exports.addOne = function addWord(req, res) {
	if(!req.session.user){
		return res.status(401).send("Not logged in!");
	}
	//console.log(req.params.user);
	//console.log(res);
	//return res.status(200).send();
	  const newWord = new Thesaurus();
	  newWord.owner = req.session.user.username;
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
		return res.status(200).send(newWord);
  	});
};

exports.update = function updateWord(req, res) {
	if(!req.session.user){
		return res.status(401).send("Not logged in!");
	}
	Thesaurus.findOne({
		word: req.params.word,
		owner: req.session.user.username,
		type: req.params.type
	}, (err, word) => {
		console.log(req.body.definition);
		word.definition = req.body.definition;
		word.save((err2) => {
			if(err){
				console.log(err);
				return res.status(500).send();
			}
			//console.log(newWord);
			return res.status(200).send(word);
		});

	});
};

exports.delete = function deleteWord(req, res) {
	if(!req.session.user){
		return res.status(401).send("Not logged in!");
	}
	Thesaurus.remove({
		owner: req.session.user.username,
  		word: req.params.word
  	},(err) =>{
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