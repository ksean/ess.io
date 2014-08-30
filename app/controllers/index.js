var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    URL = mongoose.model('URL');

module.exports = function (app) {
    app.use('/', router);
};

router.get('/', function (request, response, next) {
    response.render('index');
});

router.get('/:url([0-9a-zA-Z]+)/', function (request, response, next) {
    response.render('url', {
        url: request.params.url
    });
});
