var request = require("request");
var db = require('../accessDB/statsDB');

exports.getNews = function (req, res) {
    console.log('*** GetNews API OK');
    var url = 'https://newsapi.org/v2/top-headlines?sources=ynet&apiKey=a816d16a06bb41ec8f4b94c6f29da48a';
    request({uri: url, method: "GET",}, function(error, response, body) {
        res.send(body)
    });


};

exports.getGroupByTemplate = function (req, res) {
    db.getGroupByTemplate(function(err, countDays) {
        if (err) {
            console.log('*** GetAdvertByDay API Err');
            res.json({
            });
        } else {
            console.log('*** GetAdvertByDay API OK');
            res.json(countDays);
        }
    });

};

exports.getAvgByShowtime = function (req, res) {
    db.getAvgByShowtime(function(err, avgShowTime) {
        if (err) {
            console.log('*** GetAvgByShowtime API Err');
            res.json({
            });
        } else {
            console.log('*** GetAvgByShowtime API OK');
            res.json(avgShowTime);
        }
    });

};

exports.updateScreenIdHistory = function (req, res) {
    var id = req.params.id;
    db.updateScreenIdHistory(id,function(err, screenId) {
        if (err) {
            console.log('*** UpdateScreenIdHistory API Err');
            res.json({
            });
        } else {
            console.log('*** UpdateScreenIdHistory API OK');
            res.json(screenId);
        }
    });

};

exports.getScreenIdHistory = function (req, res) {
    db.getScreenIdHistory(function(err, settings) {
        if (err) {
            console.log('*** GetScreenIdHistory API Err');
            res.json({
            });
        } else {
            console.log('*** GetScreenIdHistory API OK');
            res.json(settings);
        }
    });
};