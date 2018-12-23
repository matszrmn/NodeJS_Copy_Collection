let urlSource = "mongodb+srv://telbd123:telbd12345@telbd-bwh8f.mongodb.net/test?retryWrites=true";
let dbSource = "telbd123";
let collectionSource = "recipes";
let MongoClientSource = require('mongodb').MongoClient;

let urlTarget = "mongodb://localhost:27017/";
let dbTarget = "ep3";
let collectionTarget = "recipes";
let MongoClientTarget = require('mongodb').MongoClient;

let chunks = 100;
let timeOut = 7000;


function copyDocumentsInChunks(skip, limit, count) {
    if(skip >= count) {
        console.log("Ended!");
        process.exit(); // Replace this line with "return;" if there is a trouble
    }
    console.log("Written " + skip + " of " + count + " documents");
    MongoClientSource.connect(urlSource, { useNewUrlParser: true }, function(error, mongo) {
        if (error) throw error;
        
        let db = mongo.db(dbSource);
        db.collection(collectionSource).find({}).sort({_id:1}).skip(skip).limit(limit).toArray(function(err, result) {
            if (err) throw err;
            
            insertDocuments(result);
            setTimeout(copyDocumentsInChunks, timeOut, skip + limit, limit, count);
            //copyDocumentsInChunks(skip + limit, limit, count);
            mongo.close();
        });
    });
}
function insertDocuments(documents) {
    MongoClientTarget.connect(urlTarget, { useNewUrlParser: true }, function(error, mongo) {
        if (error) throw error;
        
        let db = mongo.db(dbTarget);
        db.collection(collectionTarget).insertMany(documents, function(err, result) {
            if(err) throw err;
            mongo.close();
        });
    });
}
function countDocumentsDBSource(callback, limit) {
    MongoClientSource.connect(urlSource, { useNewUrlParser: true }, function(error, mongo) {
        if (error) throw error;
        
        let db = mongo.db(dbSource);
        db.collection(collectionSource).countDocuments().then((count) => {
            callback(0, limit, count);
            mongo.close();
        });
    });
}

countDocumentsDBSource(copyDocumentsInChunks, chunks);
