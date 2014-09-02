var express = require('express');
var fs = require('fs');
var path = require('path');

var logger = require('morgan');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');

module.exports = function(app, config) {
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(compress());
    app.use(express.static(config.root + '/public'));
    app.use(methodOverride());

    var controllersPath = path.join(__dirname, '../app/controllers');
    fs.readdirSync(controllersPath).forEach(function (file) {
        if (/\.js$/.test(file)) {
            require(controllersPath + '/' + file)(app);
        }
    });

    app.use(function (request, response, next) {
        var error = new Error('Not Found');
        error.status = 404;
        next(error);
    });

    if(app.get('env') === 'development'){
        app.use(function (error, request, response) {
            response.status(error.status || 500);
            response.render('error', {
                message: error.message,
                error: error,
                title: config.SITE_NAME
            });
        });
    }

    app.use(function (error, request, response) {
        response.status(error.status || 500);
        response.render('error', {
            message: error.message,
            error: {},
            title: config.SITE_NAME
        });
    });
};