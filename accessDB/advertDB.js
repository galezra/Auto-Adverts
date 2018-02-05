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

    createAdvert: function (advert,callback) {
        var newAdvert = advert;
        console.log(newAdvert);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("messages").insertOne(newAdvert,function (err,result) {
                if (err) throw err;
                callback(null, result);
                db.close();

            })
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
    },

    updateAdvert: function (editAdvert,callback) {
        var myquery = {"_id" : ObjectId(editAdvert._id)};
        editAdvert._id = ObjectId(editAdvert._id);
        var newEditAdvert = editAdvert;
        console.log(newEditAdvert);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("messages").replaceOne(myquery,newEditAdvert,function (err,result) {
                if (err) throw err;
                callback(null, result);
                db.close();

            })
        });
    },

    getSettings: function (callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("settings").find({name:"init"}).toArray(function (err, result) {
                if (err) throw err;
                callback(null, result);
                db.close();
            });

        });
    },

    getLocation: function (callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("settings").find({name:"googleMap"}).toArray(function (err, result) {
                if (err) throw err;
                callback(null, result);
                db.close();
            });

        });
    },

    updateAdvSettings: function (updateSettings,callback) {
        var myquery = {"_id" : ObjectId(updateSettings._id)};
        updateSettings._id = ObjectId(updateSettings._id);
        var newUpdateSettings = updateSettings;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("settings").replaceOne(myquery,newUpdateSettings,function (err,result) {
                if (err) throw err;
                callback(null, result);
                db.close();

            })
        });
    },

    getSearchScreen: function (searchId,callback) {
        MongoClient.connect(url, function (err, db) {
            var id = parseInt(searchId);
            var query = {id: id};
            if (err) throw err;
            var messagesDB = db.db('myDB');
            messagesDB.collection("messages").find(query).toArray(function (err, result) {
                console.log(result);
                if (err) throw err;
                callback(null, result);
                db.close();
            });

        });
    },
};