
const express = require('express');
const words = require('./routes');
const users = require('./user_routes');
const User = require('./user_model');
//const router = require('./index');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/words', words.findAll);

app.get('/words/:user', words.findAll);

app.get('/words/:user/:word', words.findOne);

app.post('/words/:user', words.addOne);

app.put('/words/:user/:word', words.update);

app.delete('/words/:user/:word', words.delete);

app.get('/users/:user', users.findOne);

app.get('/users', users.findAll);

app.post('/users', users.addOne);
//app.post('/users', router.post);
// function(req,res){
// 	//var username = req.body.username;
// 	//var password = req.body.password;
// 	var newuser = new User();
// 	//newuser.username = username;
// 	//newuser.password = password;
// 	newuser.save(function(err,savedUser){
// 		if(err){
// 			console.log("err");
// 			return res.status(500).send();
// 		}
// 		return res.status(200).send();
// 	})
// })

app.put('/users/:user', users.update);

app.delete('/users/:user', users.delete);

app.listen(3000, function(){
    console.log("ayy lmao");
})
