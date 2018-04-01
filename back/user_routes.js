const User = require('./user_model');

exports.findAll = function findUser(req, res){

	User.find({}, (err, allWords) =>{
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		//console.log(newUser);
		return res.status(200).send(allWords);
		}
	);
};
exports.login = function findUser(req, res){

	User.findOne({username : req.body.username, password : req.body.password}, (err, user) =>{
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		if(!user){
			return res.status(404).send();
		}
		//console.log(newUser);
		req.session.user = user;
		return res.status(200).send(user);
	});
};

exports.logout = function logOut(req, res){

		if(!req.session.user){
			return res.status(404).send();
		}
		//console.log(newUser);
		req.session.user = null;
		return res.status(200).send("Logged out successfully.");
};
exports.findOne = function findWord(req, res) {
  
	User.findOne({ username: req.params.username }, (err, user) => {
		if(err){
			console.log(err);
			return res.status(500).send();
		}
		//console.log(newUser);
		return res.status(200).send(user);
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
	if(!req.session.user){
		return res.status(401).send();
	}
	User.findOne({ username: req.session.user.username }, (err, user) => {
		user.password = req.body.password;
		user.save((err2) => {
			if(err){
				console.log(err);
				return res.status(500).send();
			}
			//console.log(newUser);
			return res.status(200).send();
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

exports.checksession = function checkSession(req, res){
	if(!req.session.user){
		return res.status(401).send();
	}
	return res.status(200).send(req.session.user.username);
}