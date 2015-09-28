// Core module
var path = require('path');

// Get root path
var rootPath = path.normalize(__dirname + '/..');

// Get environment or default to DEVELOPMENT
var environment = process.env.APP_ENVIRONMENT || 'DEVELOPMENT';

// Site constants
var SITE_PORT = 80;
var SITE_URL = "ess.io";
var DB_URL = 'mongodb://localhost/';
var PACKAGE_NAME = 'essio';
var VALID_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
var VALID_URL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&\'()*+,;=';

// Environment specific configuration
var config = {
    'DEVELOPMENT': {
        'db': DB_URL + 'development'
    },
    'TESTING': {
        'db': DB_URL + 'test'
    },
    'STAGING': {
        'db': DB_URL + 'staging'
    },
    'PRODUCTION': {
        'db': DB_URL + 'production'
    }
};

// Export config
module.exports = {
    'root': rootPath,
    'app': {
        'name': PACKAGE_NAME
    },
    'url': SITE_URL,
    'port': SITE_PORT,
    'db': config[environment]['db'],
    'valid': VALID_CHARS
};