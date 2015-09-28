// Core modules
var http = require('http');

// App modules
var express = require('express');
var mongoose = require('mongoose');
var URL = mongoose.model('URL');

module.exports = function(app, config) {
    app.get('/:token([a-zA-Z0-9-_]{5})', function(request, response, next) {
            if (request.params.token) {
                URL.findOne({ token: request.params.token }, function(error, url) {
                    if (error) {
                        console.log(error);
                    }
                    if (url.paid) {
                        response.writeHead(301, {Location: url.url});
                        response.end();
                    } else {
                        response.render('url', url);
                    }
                });
            } else {
                next();
            }
        });
};