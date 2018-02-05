var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/myDB";
var ObjectId = require('mongodb').ObjectID;

var local = module.exports = {

    getGroupByTemplate: function (callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("messages").aggregate([
                {
                    "$group":
                        {_id: "$template", count: {$sum: 1}}
                }

            ])
                .toArray(function (err, result) {
                    if (err) throw err;
                    callback(null, result);
                    db.close();
                });

        });
    },


    getAvgByShowtime: function (callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("messages").aggregate([
                {
                    "$group":
                        {_id: null, avg: {$avg: "$showTime"}}
                }

            ])
                .toArray(function (err, result) {if (err) throw err;
                    callback(null, result);
                    db.close();
                });

        });
    },

    updateScreenIdHistory: function (id, callback) {
        var intId = parseInt(id);
        var myQuery = {name: "screensViews" ,"screens.id": intId};
        var newQuery = { $inc: { "screens.$.count": 1 } };
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("settings").updateOne(myQuery, newQuery, function (err, result) {
                if (err) throw err;
                callback(null, result);
                db.close();

            })
        });
    },

    getScreenIdHistory: function (callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("settings").find({name:"screensViews"}).toArray(function (err, result) {
                if (err) throw err;
                callback(null, result);
                db.close();
            });

        });
    },
};




