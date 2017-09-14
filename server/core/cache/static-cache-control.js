const serveStatic = require('serve-static');
const ms = require('ms');
function setCustomCacheControl(res, path) {

	if (path.includes('fonts')) {
		// Custom Cache-Control for i18n files
		const fontsTtl = ms('90d');
		res.setHeader('Cache-Control', `public, max-age=${fontsTtl}`);
	}

	if (path.includes('i18n') && serveStatic.mime.lookup(path) === 'application/json') {
		res.setHeader('Cache-Control', 'public, max-age=0');
	}
}

module.exports = {
	setCustomCacheControl
};
