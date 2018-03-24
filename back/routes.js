const Thesaurus = require('./thesaurus_model');

exports.findAll = function findWord(req, res){

	Thesaurus.find({}, (err, allWords) =>{
	
	}
	);
};

exports.findOne = function findWord(req, res) {
  
	Thesaurus.findOne({ word: req.params.word }, (err, word) => {

	});
};

exports.addOne = function addCourse(req, res) {
  
  	const newWord = new Word(req.body);
	newWord.save((err) => {

  	});
};

exports.update = function updateWord(req, res) {

	Thesaurus.findOne({ word: req.params.word }, (err, word) => {
		word.synonms = req.body.synonms;
		word.save((err2) => {

		});

	});
};

exports.delete = function deleteWord(req, res) {

	Thesaurus.findOneAndRemove({ word: req.params.word }, (err) => {

  	});
};
