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
	console.log(req.body);
	  const newUser = new User();
	  newUser.username = req.body.username;
	  newUser.password = req.body.password;
	  //newUser.
	newUser.save((err) => {
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		console.log(newUser);
		return res.status(200).send();
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
	console.log(req.params);
	User.findOneAndRemove({ username: req.params.user}, (err) => {
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		//console.log(newUser);
		return res.status(200).send();
  	});
};
