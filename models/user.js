var mongoose = require("mongoose");
var MONGODB_DATABASE_URL='mongodb://localhost:27017/test';
mongoose.createConnection(MONGODB_DATABASE_URL);
// create schema
var userSchema  = {
    "userName" : String,
    "userPassword" : String,
    "userFirstname" : String,
    "userLastname" : String,
    "userEmail" : String
};
// create model if not exists.
module.exports = mongoose.model('user',userSchema);