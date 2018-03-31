const mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
const Schema = mongoose.Schema;

const userSchema = new Schema({

	username: String,
	password: String,



},{collection: 'myusers'}

);

//mongoose.connect('mongodb://localhost/thesaurusdb', (error) => {
//  if (error) console.log(error);

//  console.log('Database connection successful');

//});

// Doc for Mongoose Models: http://mongoosejs.com/docs/models

// Use the schema to create a model
module.exports = mongoose.model('User', userSchema);
