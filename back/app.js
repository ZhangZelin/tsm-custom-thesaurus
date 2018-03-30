
const express = require('express');
const words = require('./routes');
const users = require('./user_routes');
const app = express();

app.get('/words', words.findAll);

app.get('/words/:user', words.findAll);

app.get('/words/:word/:user', words.findOne);

app.post('/words/:user', words.addOne);

app.put('/words/:word/:user', words.update);

app.delete('/words/:word/:user', words.delete);

app.get('/users/:user', users.findOne);

app.get('/users', users.findAll);

app.post('/users', users.addOne);

app.put('/users/:user', users.update);

app.delete('/users/:user', users.delete);
