/*
* Author: Gal
* */

// Set web server
var express = require('express')
    , advertApi = require('./routes/advertApi')
    , servicesApi = require('./routes/servicesApi')
    , bodyParser = require('body-parser');

var app = module.exports = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));

var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/myDB";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// Main manager page using angular
app.get('/manager', function (req, res) {
    res.sendFile(__dirname + "/public/manager.html")
});

// Main index
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/views/index/home.html")
});

// Adverts
app.get('/api/dataservice/GetAllAdverts', advertApi.getAllAdverts);
app.get('/api/dataservice/EditAdvert/:_id', advertApi.editAdvert);
app.put('/api/dataservice/UpdateAdvert', advertApi.updateAdvert);
app.post('/api/dataservice/CreateAdvert', advertApi.createAdvert);
app.delete('/api/dataservice/DeleteAdverts/:_id', advertApi.deleteAdvertById);
app.post('/public/images/uploads/', advertApi.uploadImages);
app.post('/public/templates/', advertApi.uploadTemplates);
app.get('/api/dataservice/GetSettings', advertApi.getSettings);
app.post('/api/dataservice/updateAdvSettings', advertApi.updateAdvSettings);
app.get('/api/dataservice/GetSearchId/:id', advertApi.getSearchScreen);

// Google maps
app.get('/api/dataservice/GetLocation', advertApi.getLocation);

// Services & Statistics
app.get('/api/dataservice/GetNews', servicesApi.getNews);
app.get('/api/dataservice/GetGroupByTemplate', servicesApi.getGroupByTemplate);
app.get('/api/dataservice/GetAvgByShowtime', servicesApi.getAvgByShowtime);
app.get('/api/dataservice/UpdateScreenIdHistory/:id', servicesApi.updateScreenIdHistory);
app.get('/api/dataservice/GetScreenIdHistory', servicesApi.getScreenIdHistory);

// Get the correct template from the client
app.get('/public/templates/:template', function (res, req) {
    var chooseTemplate = res.params.template;
    req.sendFile(__dirname + "/public/templates/" + chooseTemplate + ".html")

});

// Get 404 page
app.get('/public/404', function (req, res) {
    res.sendFile(__dirname + "/public/404.html")
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
//--<<<<<<End Socket section>>>>>>>--//

http.listen(8080, function () {
    console.log('listening on port 8080...');
});

//--<<<<<<MongoDB init section>>>>>>--//
/*
// Init the messages to collection

// Create messages collection

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


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var messagesDB = db.db('myDB');

    var messages = [
        {
            "name": "message1",
            "id": [1, 2],
            "text": ["Best service", "Good Quality", "Perfect Job", "Nice Place"],
            "images": ["../images/msg1.png", "../images/msg1.2.gif"],
            "template": "templateA",
            "showTime": 4,
            "date": ["2017-01-01", "2018-12-12"],
            "days": {"Sunday": [9, 22], "Tuesday": [9, 19], "Saturday": [10, 16]}
        },
        {
            "name": "message2",
            "id": [1, 3],
            "text": ["Customize your ad title or text based on search queries", "Change the destination URL based on search queries.", "Automatically customize with text ad parameters.", "Apply default text and character limits", "Automatically customize with text ad parameters.", "Change the destination URL based on search queries.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters."],
            "images": ["../images/msg2.gif"],
            "template": "templateB",
            "showTime": 4,
            "date": ["2017-01-01", "2018-12-12"],
            "days": {"Sunday": [8, 17], "Tuesday": [8, 18], "Saturday": [10, 12]}
        },
        {
            "name": "message3",
            "id": [1, 3],
            "text": [],
            "images": [],
            "template": "templateC",
            "showTime": 5,
            "date": ["2017-01-01", "2018-12-12"],
            "days": {"Sunday": [10, 19], "Tuesday": [17, 20], "Saturday": [1, 23]}
        },
        {
            "name": "message4",
            "id": [1],
            "text": ["text1", "text2"],
            "images": [],
            "template": "templateA",
            "showTime": 4,
            "date": ["2017-01-01", "2018-12-12"],
            "days": {"Sunday": [1, 22], "Tuesday": [1, 21], "Saturday": [1, 20]}
        },
        {
            "name": "message5",
            "id": [3],
            "text": ["text1", "text2", "text3", "text4", "text5", "text6", "text7"],
            "images": ["http://www.free.fr/freebox/im/logo_free.png", "http://www.free.fr/freebox/im/logo_free.png"],
            "template": "templateC",
            "showTime": 4,
            "date": ["2017-01-01", "2018-12-12"],
            "days": {"Sunday": [7, 19], "Tuesday": [8, 17], "Saturday": [9, 22]}
        }
    ];
    messagesDB.collection("messages").insertMany(messages,{unique:true}, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });

});


// Create Manager settings collection

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var messagesDB = db.db('myDB');
    messagesDB.createCollection("settings",{unique:true}, function(err, res) {
        if (err);
        console.log("Collection created!");
        db.close();
    });

    db.close();

});


// Init the Manager settings to collection

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var messagesDB = db.db('myDB');
    var settings = {
        "name": "init",
        "ids": [1, 2, 3, 4, 5],
        "templates": ["templateA", "templateB", "templateC"]
    }

    messagesDB.collection("settings").insertOne(settings,{unique:true}, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });

});


// Init location settings to collection

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var messagesDB = db.db('myDB');
    var locations = {
        "name": "googleMap",
        "locations":
            [{"id": 1, "lat": 32.085300, "lng": 34.781768}, {"id": 2, "lat": 32.086018, "lng": 34.793620}, {
                "id": 3,
                "lat": 31.969738,
                "lng": 34.772787
            }]
    }

    messagesDB.collection("settings").insertOne(locations,{unique:true}, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });

});


// Init screens views history settings to collection

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var messagesDB = db.db('myDB');
    var locations = {
        "name": "screensViews",
        "screens": [
                {
                    "id": 1, "count": 2,
                },
                {
                    "id": 2, "count": 1,
                },
                {
                    "id": 3, "count": 0,
                }
                ]
    }

    messagesDB.collection("settings").insertOne(locations, {unique: true}, function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
    });

});
*/
//--<<<<<<End MongoDB section>>>>>>--//
