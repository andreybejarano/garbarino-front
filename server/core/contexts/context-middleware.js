const contextService = require('./context-service');

/**
 * appends context context data
 * for further manipulation
 * @returns {Function} context middleware
 */
class ContextMiddleware {

	constructor() {
		return this.handler();
	}

	handler() {
		return (req, res, next) => {
			const hostname = (req.headers.host.match(/:/g)) ?
				req.headers.host.slice(0, req.headers.host.indexOf(':')) : req.headers.host;
			try {
				const hostDomain = {hostname, locale: 'es-AR'};

				req.context = new contextService(Object.assign({}, { language: 'es-AR', country_code: 'arg' }));

				if (req.headers['x-forwarded-for']) {
					const ips = req.headers['x-forwarded-for'].split(',');
					req.client_ip = ips[0];
				}
				req.client_ip = req.client_ip ? req.client_ip : '0.0.0.0';
				res.locals.domain = hostDomain;
				res.locals.context = Object.assign({}, res.locals.domain, { lang: 'es-AR', country_code: 'arg', env: process.env.NODE_ENV });
				next();
			} catch (err) {
				next(err);
			}
		};
	}

	getCookie(name, req) {
		const value = `; ${req.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length == 2) return parts.pop().split(';').shift();
	}
}

module.exports = new ContextMiddleware;


