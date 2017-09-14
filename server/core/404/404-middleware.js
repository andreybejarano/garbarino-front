/*************************
 * Application middleware that sets a 404 status
 * Used to later process a not founded request
 ************************/

const httpStatus = require('http-status');


function fourOFour(req, res, next) {
	// Checks if headers are already sent
	if (res.headersSent) {
		return next();
	}

	res.status(httpStatus.NOT_FOUND);
	return next();
}

module.exports = fourOFour;
