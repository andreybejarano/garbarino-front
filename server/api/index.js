'use strict';
const express = require('express');
const api = express();
const cors = require('cors');
const fourOFour = require('../core/404/404-middleware');
const methodOverride = require('method-override');
const httpStatus = require('http-status');
const errorConverter = require('../core/errors/error-converter-middleware');

//enable method-override for old clients
api.use(methodOverride());
// enable CORS - Cross Origin Resource Sharing
api.use(cors());
//api.use(bodyParser.json());
//api.use(bodyParser.urlencoded({extended: true}));


//Mount especific api routes

api.use('/', require('./api-routes'));

//try to convert all error to common interface
api.use(errorConverter);

api.use((error, req, res, next) => { //eslint-disable-line no-unused-vars
	error = (error)? Object.assign({}, {message: error.message}, error)
		: httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
	res.status(error.status).json({error});
});

api.use(fourOFour);

api.use((req, res) => {
	if (res.statusCode === httpStatus.NOT_FOUND) {
		res.json({message: httpStatus[httpStatus.NOT_FOUND]});
	}
});

module.exports = api;
