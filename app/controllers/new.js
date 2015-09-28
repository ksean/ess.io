// Core modules
var http = require('http');

// App modules
var express = require('express');
var router = express.Router();

// Mongoose
var mongoose = require('mongoose');
var URL = mongoose.model('URL');

// Helper modules
var tools = require('../tools/tools');

module.exports = function(app, config) {
    app.post('/new', function(request, response, next) {
        if (tools.isDefined(request.body) && tools.isDefined(request.body.url)) {
            var protocolUrl = request.body.url;
            if (protocolUrl.indexOf('http://') != 0 && protocolUrl.indexOf('https://') != 0) {
                protocolUrl = 'http://' + protocolUrl;
            }

            if (!tools.validUrl(protocolUrl)) {
                response.render('index', {'url': protocolUrl});
            }

            URL.findOne({url: protocolUrl}, function(error, url) {
                if (error) {
                    console.log(error);
                }
                if (url !== null) {
                    response.render('done', {'url': config.url + "/" + url.token});
                }
            });

            tools.generateToken(function(token) {
                var shortUrl = new URL({token: token, url: protocolUrl, paid: false});
                shortUrl.save(function(error) {
                    if (error) {
                        next(error);
                    }
                    response.render('done', {'url': config.url + "/" + token});
                });
            });
        }
    });
};