/*
* Author: Gal
* */

// Set web server
var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/myDB";

// Main index
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
});

// Get the parameter for the screen number
app.get('/screen=:id', function (req, res) {
    //var chooseScreenId = req.params.id;
    res.sendFile(__dirname + "/public/screens.html")
});

// Get the correct template from the client
app.get('/public/templates/:template', function (res, req) {
    var chooseTemplate = res.params.template;
    req.sendFile(__dirname + "/public/templates/" + chooseTemplate + ".html")

});

// Get 404 page
app.get('/public/404', function (req, res) {
    res.sendFile(__dirname + "/public/404.html")
});

// Find messages
app.get('/loadMessagesId', function (req, res) {
    var screenId = parseInt(req.query.id);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var messagesDB = db.db('myDB');
        var query = {id: screenId};
        messagesDB.collection("messages").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
            db.close();
        });
    });

});

//--<<<<<<Socket section>>>>>>>--//

// Get messages by screenId
io.on('connection', function (client) {
    // Get screen id from client
    client.on('load messages', function (id) {
        // Send messages to server
        var screenId = parseInt(id);
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var messagesDB = db.db('myDB');
            var query = {id: screenId};
            messagesDB.collection("messages").find(query).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                client.emit('load messages', result)
            });

        });
    });

});

// Insert and update single message
app.get('/TestUpdate?:id', function (req, res) {
    var msgTest = {
        name: "messageTest",
        id: [4],
        text: ["Best service", "Good Quality", "Perfect Job", "Nice Place"],
        images: ["../images/msg1.png", "../images/msg1.2.gif"],
        template: "templateA",
        showTime: 4,
        time: [{date: ["01-01-2017", "12-30-2017"], days: [{Sunday: ["6", "24"], Wednesday: ["13", "20"]}]}]
    };
    var id = req.query.id;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var insertMsg = db.db('myDB');
        insertMsg.collection("messages").insertOne(msgTest, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });


    res.send(id)
});
//--<<<<<<End Socket section>>>>>>>--//

http.listen(8080, function () {
    console.log('listening on port 8080...');
});

//--<<<<<<MongoDB init section>>>>>>--//
// Create messages collection
/*
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var messagesDB = db.db('myDB');
         messagesDB.createCollection("messages",{unique:true}, function(err, res) {
        if (err);
        console.log("Collection created!");
        db.close();
    });

    db.close();

});
*/

// Init the messages to collection
/*
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var messagesDB = db.db('myDB');
    var messages = [
        {name: "message1",
            id: [1, 2],
            text: ["Best service", "Good Quality", "Perfect Job", "Nice Place"],
            images: ["../images/msg1.png", "../images/msg1.2.gif"],
            template: "templateA",
            showTime: 4,
            time: [{date: ["01-01-2017", "12-30-2017"], days: [{Friday:["6", "24"], Wednesday:["13", "20"]}]}]},
        {
            name: "message2",
            id: [1, 3],
            text: ["Customize your ad title or text based on search queries", "Change the destination URL based on search queries.", "Automatically customize with text ad parameters.", "Apply default text and character limits", "Automatically customize with text ad parameters.", "Change the destination URL based on search queries.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters."],
            images: ["../images/msg2.gif"],
            template: "templateB",
            showTime: 4,
            time: [{date: ["01-01-2017", "12-30-2017"], days: [{Friday:["10", "24"], Wednesday:["10", "10"]}]}]
        },
        {
            name: "message3",
            id: [1, 4],
            text: [],
            images: [],
            template: "templateC",
            showTime: 5,
            time: [{date: ["03-1-2017", "12-30-2017"], days: [{Thursday:["8", "22"],Monday:["8", "22"],Tuesday:["8", "22"], Wednesday:["8", "22"], Thursday:["8", "23"], Friday:["8", "22"], Saturday:["8", "22"]}]}]
        },
        {
            name: "message4",
            id: [1],
            text: ["text1", "text2"],
            images: [],
            template: "templateA",
            showTime: 4,
            time: [{date: ["03-29-2017", "04-15-2017"], days: [{Thursday:["15", "22"]}]}]
        },
        {
            name: "message5",
            id: [3],
            text: ["text1", "text2", "text3", "text4", "text5", "text6", "text7"],
            images: ["http://www.free.fr/freebox/im/logo_free.png", "http://www.free.fr/freebox/im/logo_free.png"],
            template: "templateC",
            showTime: 4,
            time: [{date: ["04-01-2017", "04-30-2017"], days: [{Thursday:["1", "23"],Tuesday:["1", "23"], Wednesday:["1", "23"]}]}]
        }
    ];
    messagesDB.collection("messages").insertMany(messages,{unique:true}, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });

});
*/
//--<<<<<<End MongoDB section>>>>>>--//
