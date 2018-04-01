
const express = require('express');
const words = require('./routes');
const users = require('./user_routes');
const User = require('./user_model');
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
//const router = require('./index');
const app = express();
var bodyParser = require('body-parser');

mongoose.connect('mongodb://testuser:123@ds131329.mlab.com:31329/heroku_47wnncn2', (error) => {
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
app.use(express.static('./'));
app.get('/', (req, res) => { return res.sendFile(path.resolve(path.join(__dirname,'/../index.html')))});


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

var port_number = process.env.PORT || 3000;
app.listen(port_number, () => console.log(`Listening on ` + port_number));
// app.listen(3000, function(){
//     console.log("ayy lmao");
// })
