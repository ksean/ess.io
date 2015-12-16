// App modules
var mongoose = require('mongoose');
var URL = mongoose.model('URL');

// Helper modules
var tools = require('../tools/tools');

module.exports = function(app, config) {
    app.get('/:token([a-zA-Z0-9-_]{5})', function(request, response, next) {
            if (request.params.token) {
                URL.findOne({ token: request.params.token }, function(error, url) {
						if (error) {
							console.log(error);
						} else if (url != null) {
							if (tools.isDefined(url.url)) {
								if (tools.isDefined(url.paid) && url.paid) {
									response.writeHead(301, {Location: url.url});
									response.end();
								} else {
									response.render('url', url);
								}
							}
						}
					}
				);
            }
			
			next();
        }
	);
};