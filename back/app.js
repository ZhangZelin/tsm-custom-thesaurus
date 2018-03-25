
const express = require('express');
const words = require('./routes');
const app = express();

app.get('/words', words.findAll);

app.get('/words/:word', words.findOne);

app.post('/words', words.addOne);

app.put('/words/:word', words.update);

app.delete('words/:word', words.delete);


