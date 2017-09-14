'use strict';

const express = require('express');
const fourOFour = require('../core/404/404-middleware');
const httpStatus = require('http-status');
const errorConverter = require('../core/errors/error-converter-middleware');
const config = require('../config');
const staticCacheControl = require('../core/cache/static-cache-control');
const app = express();


app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

//Set enviroment as wide application variable,
// so we can access it in views rendering explicitly
app.locals.env = config.env;

//Mount especific app routes
app.use('/build', express.static('build', {
	maxage: '1y',
	setHeaders: staticCacheControl.setCustomCacheControl
}));

app.use('/fonts', express.static('build/fonts', {
	maxage: '1y',
	setHeaders: staticCacheControl.setCustomCacheControl
}));



app.use(require('./app-routes'));

app.use(errorConverter);

app.use((err, req, res, next) => { //eslint-disable-line no-unused-vars
	let status = err.status;
	if (config.env === 'production') {
		status = httpStatus.INTERNAL_SERVER_ERROR;
	}
	res.render('error', { code: status, stack: err.stack });
});

app.use(fourOFour);

app.use((req, res) => {
	if (res.statusCode === httpStatus.NOT_FOUND) {
		res.render('error', { code: res.statusCode });
	}
});


module.exports = app;
