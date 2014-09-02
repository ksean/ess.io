// App modules
var mongoose = require('mongoose');

// New Schema object
var Schema = mongoose.Schema;

// URL Schema
var URLSchema = new Schema({
    token: String,
    url: String,
    paid: Boolean
});

// Include model
mongoose.model('URL', URLSchema);