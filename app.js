// Core modules
var fs = require('fs');

// App modules
var express = require('express');
var toobusy = require('toobusy');
var mongoose = require('mongoose');

// Configuration
var config = require('./config/config');

// Initialize DB connection
mongoose.connect(config.db);
var db = mongoose.connection;

db.on('error', function () {
    throw new Error('Unable to connect to database at ' + config.db);
});

// Load all models
var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
    if (/\.js$/.test(file)) {
        require(modelsPath + '/' + file);
    }
});

// Initialize Express
var app = express();

// Check if server is too busy to answer request
app.use(function(request, response, next) {
    if (toobusy()) {
        response.send(503, "Server Busy");
    } else {
        next();
    }
});

// Load express configuration
require('./config/express')(app, config);

// HTTP server listen
app.listen(config.port);

