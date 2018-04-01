
const express = require('express');
const words = require('./routes');
const users = require('./user_routes');
const User = require('./user_model');
const session = require('express-session');
//const router = require('./index');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session({secret:"supersecretsessioncodethatyoushouldnotsee",resave:false,saveUninitialized:true}));

app.get('/words', words.findAll);

//app.get('/words/:user', words.findAll);

app.get('/words/:word/:type', words.findOne);

app.post('/words', words.addOne);

app.put('/words/:word/:type', words.update);

app.delete('/words/:word', words.delete);

app.get('/users/:user', users.findOne);

app.get('/users', users.findAll);

app.post('/register', users.addOne);

app.post('/login', users.login);

app.post('/logout', users.logout);

app.get('/welcome', users.checksession);

app.put('/changepassword', users.update);

app.delete('/users/:user', users.delete);

app.listen(3000, function(){
    console.log("ayy lmao");
})
