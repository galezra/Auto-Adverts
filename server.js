/*
* Author: Gal
* */

// Set web server
var express = require('express')
    , advertApi = require('./routes/advertApi')
    , bodyParser = require('body-parser');

var app = module.exports = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/myDB";

// Configuration

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Main manager page using angular
app.get('/manager', function (req, res) {
    res.sendFile(__dirname + "/public/manager.html")
});

// Adverts
app.get('/api/dataservice/GetAllAdverts', advertApi.getAllAdverts);
app.get('/api/dataservice/EditAdvert/:_id',advertApi.editAdvert);
app.put('/api/dataservice/UpdateAdvert', advertApi.updateAdvert);
app.post('/api/dataservice/CreateAdvert', advertApi.createAdvert);
app.delete('/api/dataservice/DeleteAdverts/:_id',advertApi.deleteAdvertById);
app.post('/public/images/uploads/',advertApi.upload);


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
        "name": "test2",
        "id": [1,2],
        "text":
            ["Nice",
                "Nice",
                "Nice",
                "Nice Place"],
        "images": [
            "../images/msg1.png",
            "../images/msg1.2.gif"
        ],
        "template": "templateB",
        "showTime": 4,
        "date": ["01-01-2017", "12-30-2017"],
        "days": {"Sunday":["1", "23"],"Tuesday":["1", "23"], "Friday":["1", "23"]}


    };


    var id = req.query.id;

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var insertMsg = db.db('myDB');
        insertMsg.collection("messages").insertOne(msgTest, function (err) {
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

app.all('/*',function (req,res) {
    res.sendFile(__dirname ,'/public/index.html');

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
        {
            "name": "test2",
            "id": [1, 2],
            "text": ["Nice", "Nice", "Nice", "Nice Place"],
            "images": ["../images/msg1.png", "../images/msg1.2.gif"],
            "template": "templateB",
            "showTime": 4,
            "date": ["01-01-2017", "2018-12-12"],
            "days": {"Sunday": [1, 23], "Tuesday": [1, 23], "Saturday": [1, 23]}


        },
        {
            "name": "message1",
            "id": [1, 2],
            "text": ["Best service", "Good Quality", "Perfect Job", "Nice Place"],
            "images": ["../images/msg1.png", "../images/msg1.2.gif"],
            "template": "templateA",
            "showTime": 4,
            "date": ["2017-01-01", "2018-12-12"],
            "days": {"Sunday": [1, 23], "Tuesday": [1, 23], "Saturday": [1, 23]}
        },
        {
            "name": "message2",
            "id": [1, 3],
            "text": ["Customize your ad title or text based on search queries", "Change the destination URL based on search queries.", "Automatically customize with text ad parameters.", "Apply default text and character limits", "Automatically customize with text ad parameters.", "Change the destination URL based on search queries.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters."],
            "images": ["../images/msg2.gif"],
            "template": "templateB",
            "showTime": 4,
            "date": ["2017-01-01", "2018-12-12"],
            "days": {"Sunday": [1, 23], "Tuesday": [1, 23], "Saturday": [1, 23]}
        },
        {
            "name": "message3",
            "id": [1, 4],
            "text": [],
            "images": [],
            "template": "templateC",
            "showTime": 5,
            "date": ["2017-01-01", "2018-12-12"],
            "days": {"Sunday": [1, 23], "Tuesday": [1, 23], "Saturday": [1, 23]}
        },
        {
            "name": "message4",
            "id": [1],
            "text": ["text1", "text2"],
            "images": [],
            "template": "templateA",
            "showTime": 4,
            "date": ["2017-01-01", "2018-12-12"],
            "days": {"Sunday": [1, 23], "Tuesday": [1, 23], "Saturday": [1, 23]}
        },
        {
            "name": "message5",
            "id": [3],
            "text": ["text1", "text2", "text3", "text4", "text5", "text6", "text7"],
            "images": ["http://www.free.fr/freebox/im/logo_free.png", "http://www.free.fr/freebox/im/logo_free.png"],
            "template": "templateC",
            "showTime": 4,
            "date": ["2017-01-01", "2018-12-12"],
            "days": {"Sunday": [1, 23], "Tuesday": [1, 23], "Saturday": [1, 23]}
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
