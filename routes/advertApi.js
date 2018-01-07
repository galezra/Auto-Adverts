var db = require('../accessDB/advertDB');
var formidable = require('formidable');
var fs = require('fs');

exports.getAllAdverts = function (req, res) {
    db.getAllAdverts(function(err, advert) {
        if (err) {
            console.log('*** GetAllAdverts API Err');
            res.json({
            });
        } else {
            console.log('*** GetAllAdverts API OK');
            res.json(advert);
        }
    });
};

exports.createAdvert = function (req, res) {
    var newAdvert = req.body;
    db.createAdvert(newAdvert,function(err ,advert) {
        if (err) {
            console.log('*** CreateAdvert API Err');
            res.json({'status': false});
        } else {
            console.log('*** CreateAdvert API OK');
            res.json(advert);
        }
    });
};

exports.deleteAdvertById = function (req, res) {
    var id = req.params._id;
    db.deleteAdvertById(id,function(err) {
        if (err) {
            console.log('*** DeleteAdvertById API Err');
            res.json({'status': false});
        } else {
            console.log('*** DeleteAdvertById API OK');
            res.json({'status': true});
        }
    });
};

exports.editAdvert = function (req, res) {
    var id = req.params._id;
    db.editAdvert(id,function(err ,advert) {
        if (err) {
            console.log('*** EditAdvert API Err');
            res.json({'status': false});
        } else {
            console.log('*** EditAdvert API OK');
            res.json(advert);
        }
    });
};

exports.updateAdvert = function (req, res) {
    console.log('*** UpdateAdvert API');
    var editAdvert = req.body;
    db.updateAdvert(editAdvert,function(err ,advert) {
        if (err) {
            console.log('*** UpdateAdvert API Err');
            res.json({'status': false});
        } else {
            console.log('*** UpdateAdvert API OK');
            res.json(advert);
        }
    });
};

exports.upload = function (req,res) {
    console.log('*** UploadImage API OK');
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.file.path;
        var newpath = 'public/images/uploads/' + files.file.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });
    });
};


