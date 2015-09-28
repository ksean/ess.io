// Core modules
var fs = require('fs');
var path = require('path');

// Express modules
var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');

module.exports = function(app, config) {
    // Use jade templates
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    // Enable json/urlencoded body parsing
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Use compression for all requests
    app.use(compress());

    // Use public folder for static content
    app.use(express.static(config.root + '/public'));

    // Try to match incoming request to controller
    var controllersPath = path.join(__dirname, '../app/controllers');
    fs.readdirSync(controllersPath).forEach(function (file) {
        if (/\.js$/.test(file)) {
            require(controllersPath + '/' + file)(app, config);
        }
    });

    // If no controller route found, default to index
    app.use(function (request, response) {
        response.render('index');
    });

    // Display errors in development
    app.use(function (error, request, response) {
        response.status(error.status || 500);
        response.render('error', {
            message: error.message,
            error: (app.get('env') === 'DEVELOPMENT' ? error : {}),
            title: config.SITE_NAME
        });
    });
};