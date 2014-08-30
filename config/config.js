var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var SITE_NAME = 'ESS.IO - minimal url shortener';
var SITE_PORT = 80;
var PACKAGE_NAME = 'essio';

var DB_URL = 'mongodb://localhost/';

var config = {
    development: {
        root: rootPath,
        app: {
            name: PACKAGE_NAME
        },
        port: SITE_PORT,
        db: DB_URL + 'essio-development'
    },

    test: {
        root: rootPath,
        app: {
            name: PACKAGE_NAME
        },
        port: SITE_PORT,
        db: DB_URL + 'essio-test'
    },

    staging: {
        root: rootPath,
        app: {
            name: PACKAGE_NAME
        },
        port: SITE_PORT,
        db: DB_URL + 'essio-staging'
    },

    production: {
        root: rootPath,
        app: {
            name: PACKAGE_NAME
        },
        port: SITE_PORT,
        db: DB_URL + 'essio-production'
    }
};

module.exports = config[env];