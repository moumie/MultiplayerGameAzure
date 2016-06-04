var mongoose = require("mongoose");
var MONGODB_DATABASE_URL='mongodb://localhost:27017/test';
mongoose.createConnection(MONGODB_DATABASE_URL);
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var scoreSchema  = {
    "userid" : String,
    "questionid" : String,
    "score" : Number
};
// create model if not exists.
module.exports = mongoose.model('score',scoreSchema);