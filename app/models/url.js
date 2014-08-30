// URL Model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var URLSchema = new Schema({
    url: String,
    paid: Boolean
});

mongoose.model('URL', URLSchema);

