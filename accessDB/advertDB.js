var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/myDB";
var ObjectId = require('mongodb').ObjectID;


// Connect to database
var local = module.exports = {
    getAllAdverts: function (callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("messages").find({}).toArray(function (err, result) {
                if (err) throw err;
                callback(null, result);
                db.close();
            });

        });
    },

    deleteAdvertById: function (_id,callback) {
        var myquery = {"_id" : ObjectId(_id)};
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("messages").deleteOne(myquery,function (err,res) {
                if (err) throw err;
                console.log("1 document deleted");
                callback(null, _id +"document deleted");
                db.close();
            })
        });
    },

    editAdvert: function (_id,callback) {
        var myquery = {"_id" : ObjectId(_id)};
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("messages").findOne(myquery,function (err,result) {
                if (err) throw err;
                callback(null, result);
                db.close();

            })
        });
    }


};