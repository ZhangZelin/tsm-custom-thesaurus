const Thesaurus = require('./thesaurus_model');
const User = require('./user_model');

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
  
  	const newWord = new Word(req.body);
	newWord.save((err) => {

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
  		word: req.params.word,
  		username: req.params.user
  	};
	Thesaurus.findOneAndRemove(querry, (err) => {

  	});
};
