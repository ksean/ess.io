var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    URL = mongoose.model('URL'),
    db = mongoose.connection,
    urls = db.collection('urls');

module.exports = function(app) {
    app.use('/', router);
};

router.get('/', function(request, response, next) {
    response.render('index');
});

router.get('/get/:url', function(request, response, next) {
    console.log(request.params.url);
    urls.findOne({ token: request.params.url }, function(error, url) {
        if (error) {
            console.log(error);
        }
        response.render('url', url);
    });
});

router.post('/new/:url', function(request, response, next) {

    urls.insert({token: "1234567890", url: "http://www.google.ca", paid: true}, function(error, docs) {
        if (error) {
            return next(error);
        }
    });
});