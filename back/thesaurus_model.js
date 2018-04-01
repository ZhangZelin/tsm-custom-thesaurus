const mongoose = require('mongoose');

// Doc for Mongoose Schemas: http://mongoosejs.com/docs/guide
const Schema = mongoose.Schema;

const wordSchema = new Schema({
	owner: {type: String},
	word: {	type: String},
	type: {type: String},
	definition: [String]


},{collection: 'thesaurus'}

);



// Doc for Mongoose Models: http://mongoosejs.com/docs/models

// Use the schema to create a model
module.exports = mongoose.model('Word', wordSchema);
