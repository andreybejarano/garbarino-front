'use strict';

const httpStatus = require('http-status');

/**
 * @extends Error
 */
class ExtendableError extends Error {
	constructor(message, status, isPublic, code) {
		super(message);
		this.name = this.constructor.name;
		this.message = message;
		this.status = status;
		this.isPublic = isPublic;
		this.code = code;
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor.name);
	}
}

/**
 * Class representing an HttpError error.
 * @extends ExtendableError
 */
class HttpError extends ExtendableError {
	/**
	 * Creates an HttpError error.
	 * @param {string} message - Error message.
	 * @param {number} status - HTTP status code of error.
	 * @param {boolean} isPublic - Whether the message should be visible to user or not.
	 */
	constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false, code = 0) {
		super(message, status, isPublic, code || 0);
	}
}

module.exports = HttpError;
