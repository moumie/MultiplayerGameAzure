var mongoose = require("mongoose");
var MONGODB_DATABASE_URL='mongodb://localhost:27017/test';
mongoose.createConnection(MONGODB_DATABASE_URL);
// create schema
var peopleSchema  = {
    "name" : String,
    "random" : Number
};
// create model if not exists.
module.exports = mongoose.model('people',peopleSchema);