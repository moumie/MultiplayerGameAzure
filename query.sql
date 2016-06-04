db.scores.aggregate([
        { $group: {
            _id: '$userid',
            scoreSum: { $sum: '$score'},
            scoreCount: {$sum:1},
            scoreAvg: {$avg: '$score'}
        }}]);
        
        
db.scores.aggregate([
        { $group: {
            _id: '$userid',
            scoreSum: { $sum: '$score'},
            scoreCount: {$sum:1},
            scoreAvg: {$avg: '$score'}
        }}
        ,
        { $match: { _id:'5752aa2fd2ea14f41c211d70' } }
        ]);