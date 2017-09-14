'use strict';

module.exports = function () {
	const pkg = require('./package.json');

	const root = './';
	const server = './server/';
	const client = './client/';
	const views = `${server }app/views/`;
	const scssfolder = `${client }scss/`;
	const mainscss = `${scssfolder }main.scss`;
	const build = './build/';
	const appFolder = `${client}app/`;

	const config = {
		projectName: pkg.name,
		version: pkg.version,
		appFolder,
		app: `${appFolder }app.module.js`,
		scssfolder,
		root,
		mainscss,
		angularRootApp: `${appFolder}core/`,
		build,
		server,
		views,
		images: `${client }images/`,
		fonts: `${scssfolder }fonts/`,
		vendorfolder: `${client }vendor/`,
		templateCache: {
			file: 'app.templates.js',
			options: {
				standalone: true,
				module: 'app.templates',
				templateHeader: 'export const AppTemplates = ' +
				' angular.module("<%= module %>"<%= standalone %>)' +
				'.run(["$templateCache", function($templateCache) {',
				templateFooter: '}]).name;'
			}
		},
		jsOrder: ['**/app.module.js', '**/*.module.js', '**/*.js'],
		browserReloadDelay: 1000,
		files: {
			sass: [`${client}**/*.scss`],
			js: [`${client}**/*.js`, `!${client}**/*.templates.js`],
			html: `${client}**/*.html`,
			jade: `${client}**/*.jade`,
			json: `${client}**/*.json`

		},
		locales: ['es', 'es-AR', 'es-CO', 'es-MX']
	};

	return config;
};
