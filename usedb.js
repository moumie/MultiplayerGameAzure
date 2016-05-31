mongo.connect(function(err){
    /* Handle any connection error here */
    if (err) throw err;

    /* Print documents in collection named 'col' */
    mongo.db.collection('docs').find({}).each(function (err, doc){
        if (doc != null){
            console.log(doc);
        }
    });
});