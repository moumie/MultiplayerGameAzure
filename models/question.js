var mongoose = require("mongoose");
var MONGODB_DATABASE_URL='mongodb://localhost:27017/test';
mongoose.createConnection(MONGODB_DATABASE_URL);
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var questionSchema  = {
    "random" : Number,
    "quest" : String,
    "answer" : String,
    "answer1" : String,
    "answer2" : String,
    "answer3" : String
};
// create model if not exists.
module.exports = mongoose.model('question',questionSchema);