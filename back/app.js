
const express = require('express');
const words = require('./routes');
const users = require('./user_routes');
const User = require('./user_model');
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
//const router = require('./index');
const app = express();
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/thesaurusdb', (error) => {
  if (error) console.log(error);
  useMongoClient: true
  console.log('Database connection successful');

});

app.use(cookieParser());

const db = mongoose.connection

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session({secret:"supersecretsessioncodethatyoushouldnotsee",
                 resave:false,
                 saveUninitialized:true,
                cookie: {
                    maxAge: 36000000,
                    httpOnly: false // <- set httpOnly to false
                    }
                }
                ));
//app.get('/', (req, res) => { res.render('/home/hx/CSC309/assignment-3-tsm/index.html')});
app.use(express.static('./'));

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
