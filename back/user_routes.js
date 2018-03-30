const User = require('./user_model');

exports.findAll = function findUser(req, res){

	User.find({}, (err, allWords) =>{
	
	}
	);
};
exports.login = function findUser(req, res){
	user.findOne({username : req.params.username, password : req.params.password}, (err, user) =>{});
};
exports.findOne = function findWord(req, res) {
  
	User.findOne({ username: req.params.username }, (err, user) => {

	});
};

exports.addOne = function addUser(req, res) {
  
  	const newUser = new User(req.body);
	newUser.save((err) => {

  	});
};

exports.update = function updateUser(req, res) {

	User.findOne({ username: req.params.username }, (err, user) => {
		user.password = req.body.password;
		word.save((err2) => {

		});

	});
};

exports.delete = function deleteUser(req, res) {

	User.findOneAndRemove({ username: req.params.username }, (err) => {

  	});
};
