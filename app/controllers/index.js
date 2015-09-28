var express = require('express');

module.exports = function(app, config) {
    app.get('/', function(request, response) {
        response.render('index');
    });
};