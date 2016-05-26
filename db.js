var mclient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/test';

module.exports.connect = function connect(callback) {
    mclient.connect(dburl, function(err, conn){
        /* exports the connection */
        module.exports.db = conn;
        callback(err);
    });
};


