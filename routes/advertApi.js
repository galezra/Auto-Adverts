var db = require('../accessDB/advertDB')

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


