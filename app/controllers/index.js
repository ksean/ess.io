// Core modules
var http = require('http');

// App modules
var express = require('express');
var mongoose = require('mongoose');

// MongoDB
var db = mongoose.connection;
var urls = db.collection('urls');

// Router
var router = express.Router();

// Valid token chars
var validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";

module.exports = function(app) {
    app.use('/', router);
};

router.get('/', function(request, response, next) {
    response.render('index');
});

router.get('/:token([a-zA-Z0-9-_]{5})', function(request, response, next) {
    if (request.params.token) {
        urls.findOne({ token: request.params.token }, function(error, url) {
            if (error) {
                console.log(error);
            }
            console.log(url);
            response.render('url', url);
        });
    } else {
        next();
    }
});

router.post('/new', function(request, response, next) {
    if (isDefined(request.body) && isDefined(request.body.url)) {
        var req = http.request({method: 'HEAD', host: request.body.url, port: 80, path: '/'}, function(response) {
                if (response.statusCode === 200 || response.statusCode === 302) {
                    generateToken(function(token) {
                        urls.insert({ token: token, url: request.body.url, paid: false }, function(error, docs) {
                            if (error) {
                                console.log(error);
                            }
                        });
                    });
                }
            }
        );
        req.end();
    }
});

function isDefined(obj) {
    return typeof obj !== 'undefined';
}

function generateToken(callback) {
    var token = '';

    for (var i = 0; i < 5; i++) {
        token+= validChars.charAt(Math.random()*validChars.length);
    }

    callback(token);
}