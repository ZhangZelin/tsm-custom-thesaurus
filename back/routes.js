const Thesaurus = require('./thesaurus_model');
const express = require('express');

exports.findAll = function findWord(req, res){
	if(!req.session.user){
		return res.status(401).send("Not logged in!");
	}
	console.log({owner: req.session.user.username});
	Thesaurus.find({owner: req.session.user.username}, (err, allWords) =>{
		if(err){
			console.log(err);
			return res.status(500).send();
		}
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
		return res.status(200).send(word);
	});
};

exports.addOne = function addWord(req, res) {
	if(!req.session.user){
		return res.status(401).send("Not logged in!");
	}
	  const newWord = new Thesaurus();
	  newWord.owner = req.session.user.username;
	  newWord.word = req.body.word;
	  newWord.type = req.body.type;
	  newWord.definition = req.body.definition;
	newWord.save((err) => {
		if(err){
			console.log(err);
			return res.status(500).send();
		}
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
	}, (err, newWord) => {
		console.log(req.body.definition);
		console.log(req.body);
		console.log(req.params);
		newWord.definition = req.body.definition;
		newWord.save((err2) => {
			if(err){
				console.log(err);
				return res.status(500).send();
			}
			return res.status(200).send(newWord);
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
		return res.status(200).send();
	});
};