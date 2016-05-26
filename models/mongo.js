var MONGODB_DATABASE_URL='mongodb://localhost:27017/test';
var mongoose = require("mongoose");
mongoose.connect(MONGODB_DATABASE_URL);
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "userEmail" : String,
    "userPassword" : String
};
// create model if not exists.
module.exports = mongoose.model('userlogins',userSchema);