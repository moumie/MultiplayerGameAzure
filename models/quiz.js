var mongoose = require("mongoose");
var random = require('mongoose-simple-random');
var MONGODB_DATABASE_URL='mongodb://localhost:27017/test';
mongoose.createConnection(MONGODB_DATABASE_URL);
// create schema
var s = new mongoose.Schema({
  message: String
});
s.plugin(random);
// create model if not exists.
module.exports = mongoose.model('quiz',s);