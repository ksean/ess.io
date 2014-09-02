// Core module
var path = require('path');

// Get root path
var rootPath = path.normalize(__dirname + '/..');

// Get environment or default to DEVELOPMENT
var environment = process.env.APP_ENVIRONMENT || 'DEVELOPMENT';

// Site constants
var SITE_PORT = 80;
var PACKAGE_NAME = 'essio';
var DB_URL = 'mongodb://localhost/';

// Environment specific configuration
var config = {
    DEVELOPMENT: {
        root: rootPath,
        app: {
            name: PACKAGE_NAME
        },
        port: SITE_PORT,
        db: DB_URL + 'development'
    },

    TESTING: {
        root: rootPath,
        app: {
            name: PACKAGE_NAME
        },
        port: SITE_PORT,
        db: DB_URL + 'test'
    },

    STAGING: {
        root: rootPath,
        app: {
            name: PACKAGE_NAME
        },
        port: SITE_PORT,
        db: DB_URL + 'staging'
    },

    PRODUCTION: {
        root: rootPath,
        app: {
            name: PACKAGE_NAME
        },
        port: SITE_PORT,
        db: DB_URL + 'production'
    }
};

module.exports = config[environment];