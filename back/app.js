
const express = require('express');
const words = require('./routes');
const app = express();

app.get('/words', words.findAll);

app.get('/words/:user', words.findAll);

app.get('/words/:word/:user', words.findOne);

app.post('/words/:user', words.addOne);

app.put('/words/:word/:user', words.update);

app.delete('words/:word/:user', words.delete);


