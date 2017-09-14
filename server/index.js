'use strict';

const expressApp = require('express')();
const compress = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('./config/env/');
const contextMiddleware = require('./core/contexts/context-middleware');
const basePath = '/garbarino-front/';

// logs to console minimal information
// :method :url :statusCode :time :content length
if (config.env === 'local') {
	expressApp.use(morgan('dev'));
}

// parse body params and attach them to req.body
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

expressApp.use(cookieParser());
expressApp.use(compress());

// disable 'X-Powered-By' header in response
expressApp.disable('x-powered-by');

//Add healthcheck endpoint
expressApp.use(`${basePath}health`, require('express-healthcheck')());

//Resolve general context channel-brand-config
expressApp.use(contextMiddleware);

//Require and mount api application
expressApp.use(`${basePath}api`, require('./api'));

//Require and mount app application
expressApp.use(basePath, require('./app'));

// listen on port config.port
expressApp.listen(config.port, () => {
	console.log(`server started on port ${config.port} (${config.env})`);
});
