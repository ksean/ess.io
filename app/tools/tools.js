var mongoose = require('mongoose');
var URL = mongoose.model('URL');

var config = require('../../config/config');

var VALID_PROTOCOLS = ['http', 'https'];

module.exports.isDefined = function(obj) {
    return typeof obj !== 'undefined';
};

module.exports.generateToken = function(callback) {
    var token = '';

    for (var i = 0; i < 5; i++) {
        token+= config.valid.charAt(Math.random() * config.valid.length);
    }

    URL.count({token: token}, function(error, count) {
        if (error) {
            console.log(error);
        }
        if (count > 0) {
            this.generateToken(callback);
            return;
        }
    });

    callback(token);
};

// Modified code from https://github.com/chriso/validator.js
module.exports.validUrl = function(url) {
    if (!url || url.length >= 2083) {
        return false;
    }

    var ipv4_url_parts = [
        '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])',
        '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}',
        '(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))'
    ];

    var protocol = '(?:(?:' + VALID_PROTOCOLS.join('|') + ')://)';
    var auth = '(?:\\S+(?::\\S*)?@)?';
    var ipv4 = '(?:' + ipv4_url_parts.join('') + ')';
    var sep = '-?-?_?';
    var alpha = 'a-z\\u00a1-\\uffff';
    var alphanum = alpha + '0-9';
    var subdomain = '(?:(?:[' + alphanum + ']+' + sep + ')*[' + alphanum + ']+)';
    var tld = '(?:\\.(?:[' + alpha + ']{2,}))';
    var domain = '(?:' + subdomain + '(?:\\.' + subdomain + ')*' + tld + ')';
    var hostname = '(' + ipv4 + '|' + domain + '|localhost)';
    var port = '(\\d{1,5})';
    var host = hostname + '(?::' + port + ')?';
    var path_query_anchor = '(?:(?:/|\\?|#)[^\\s]*)?';
    var is_url = new RegExp('^(?!mailto:)' + protocol + auth + host + path_query_anchor + '$', 'i');
    var match = url.match(is_url);

    if (!match) {
        return false;
    }

    port = match[2];

    if (port && !(port > 0 && port <= 65535)) {
        return false;
    }

    return true;
};