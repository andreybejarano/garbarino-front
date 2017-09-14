'use strict';
const config = require('./gulp.config.js')();
const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const vinylSourceStream = require('vinyl-source-stream');
const vinylBuffer = require('vinyl-buffer');
const gulpLoadPlugins = require('gulp-load-plugins');

const mainBowerFiles = require('main-bower-files');
const series = require('stream-series');

const runSequence = require('run-sequence');
const eventStream = require('event-stream');
const browserSync = require('browser-sync');
const plugins = gulpLoadPlugins();
const argv = require('yargs').argv;
const env = process.env.NODE_ENV || 'local';
let optimize = false;

if (env === 'production') {
	log('static files will be optimized!!');
	optimize = true;
}

const paths = {
	js: ['./server/**/*.js', './public/**/*.js'],
	nonJs: ['./package.json', './.gitignore'],
	tests: './tests/*.js'
};

/**
 * Compiling jade into html for components.
 */
gulp.task('compile-jade', () => {
	log('compiling jade into html');


	return gulp
		.src(`${config.appFolder }**/*.jade`)
		.pipe(plugins.jade())
		.pipe(plugins.htmlmin())

		.pipe(gulp.dest(config.appFolder));
});


gulp.task('template-cache', ['compile-jade'], () => {


	return gulp.src(`${config.appFolder }**/*.html`)
		.pipe(plugins.angularTemplatecache(config.templateCache.file, config.templateCache.options))
		.pipe(gulp.dest(config.appFolder));
});

/**
 * Concat app js files.
 */
gulp.task('scripts-app', ['template-cache'], () => {
	log('create app js files');

	const sources = browserify({
		entries: config.app,
		// Build source maps
		debug: !optimize
	}).transform(babelify.configure({
		// You can configure babel here!
		// https://babeljs.io/docs/usage/options/
		presets: ['es2015']
	}));


	return sources.bundle()
		.pipe(vinylSourceStream(`${config.projectName}.js`))
		.pipe(vinylBuffer())
		.pipe(plugins.if(!optimize, plugins.sourcemaps.init({
			loadMaps: true // Load the sourcemaps browserify already generated
		})))
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.if(optimize, plugins.uglify()))
		.pipe(plugins.if(!optimize, plugins.sourcemaps.write('./', {
			includeContent: true
		})))
		.pipe(plugins.if(optimize, plugins.rename({extname: '.min.js'})))
		.pipe(plugins.if(optimize, plugins.rev()))
		.pipe(gulp.dest(config.build));

});


// Lint Javascript
gulp.task('lint', () =>
	gulp.src(paths.js)
		// eslint() attaches the lint output to the "eslint" property
		// of the file object so it can be used by other modules.
		.pipe(plugins.eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(plugins.eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(plugins.eslint.failAfterError())
);


/**
 * Concat vendor js files.
 */
gulp.task('scripts-lib', () => {
	log('concat vendor js files');
	return gulp
		.src(mainBowerFiles('**/*.js'))
		//.pipe(plugins.debug())
		.pipe(plugins.concat(`${config.projectName }-lib.js`))
		.pipe(plugins.if(optimize, plugins.uglify()))
		.pipe(plugins.if(optimize, plugins.stripDebug()))
		.pipe(plugins.if(optimize, plugins.rename({extname: '.min.js'})))
		.pipe(plugins.if(optimize, plugins.rev()))
		.pipe(gulp.dest(config.build));
});


/**
 * Compiling scss into css.
 */
gulp.task('styles-app', () => {
	log('compiling app scss into css');
	return gulp
		.src(config.mainscss)
		.pipe(plugins.sass())
		.pipe(plugins.rename(`${config.projectName}.css`))
		.pipe(plugins.if(optimize, plugins.csso()))
		.pipe(plugins.if(optimize, plugins.rev()))
		.pipe(gulp.dest(config.build));
});


gulp.task('styles-lib', () => {
	log('concat lib css');
	return gulp
		.src(mainBowerFiles('**/*.css'))
		.pipe(plugins.concat(`${config.projectName }-lib.css`))
		.pipe(plugins.if(optimize, plugins.csso()))
		.pipe(plugins.if(optimize, plugins.rename({extname: '.min.css'})))
		.pipe(plugins.if(optimize, plugins.rev()))
		.pipe(gulp.dest(config.build));
});


gulp.task('inject', ['build'], () => {
	log('inject dependencies in layout');
	// It's not necessary to read the files (will speed up things), we're only after their paths:
	const styleLib = gulp.src([`${config.build}*lib*.css`], {read: false});
	const scriptLib = gulp.src([`${config.build}*lib*.js`], {read: false});
	const styleApp = gulp.src([`${config.build}*.css`, `!${config.build}*lib*.css`], {read: false});
	const scriptApp = gulp.src([`${config.build}*.js`, `!${config.build}*lib*.js`], {read: false});

	const injectOptions = {
		//addRootSlash: false,
		//ignorePath: config.build.replace('./', '').replace('/', ''),
		addPrefix: 'garbarino-front'
	};

	const errorPageStream = gulp.src(`${config.views}error.jade`)
		.pipe(plugins.inject(styleApp, injectOptions))
		.pipe(gulp.dest(config.views));


	const layoutStream = gulp.src(`${config.views}layout.jade`)
		.pipe(plugins.inject(series(styleLib, scriptLib, styleApp, scriptApp), injectOptions))
		.pipe(gulp.dest(config.views));


	return eventStream.merge(errorPageStream, layoutStream);

});


gulp.task('images', () => {
	log('optimizing images for deliver');
	gulp.src(`${config.images }**/*`)
		.pipe(plugins.imagemin())
		.pipe(gulp.dest(`${config.build }images`));

});


gulp.task('fonts', () => {

	log('copy fonts to build folder');

	return gulp
		.src(`${config.fonts }**/*`)
		.pipe(gulp.dest(`${config.build }fonts`));


});

/**
 * Build!!!!
 */
gulp.task('build', ['styles-lib', 'styles-app', 'scripts-lib', 'scripts-app', 'images', 'fonts']);

/**
 * Cleans build folder.
 */
gulp.task('clean', () => {
	log('clean build folder');

	return gulp
		.src(config.build, {read: false})
		.pipe(plugins.clean());
});


gulp.task('release', () => runSequence('clean', 'bundle'));

// gulp serve for development
gulp.task('default', () => runSequence('clean', 'bundle', 'serve-dev'));


gulp.task('serve-dev', () => {
	serve(true /*isDev*/);
});


/**
 * Create build bundle.
 */
gulp.task('bundle', ['inject']);


/**
 * Create build bundle.
 */
gulp.task('wiredep', ['inject']);

/**
 * Optimize the code and re-load browserSync
 */
gulp.task('bs-reload', ['styles-lib', 'styles-app', 'scripts-lib', 'scripts-app', 'compile-jade'], browserSync.reload);


/**
 * serve the code
 * --debug-brk or --debug
 * --nosync
 * @param  {Boolean} isDev - dev or build mode
 * @param  {Boolean} specRunner - server spec runner html
 */
function serve(isDev) {

	const nodeOptions = {
		script: 'server/index.js',
		nodeArgs: ['--inspect=5820'],
		watch: 'server/*',
		delay: 1000,
		env: {
			'DEBUG': 'app:server'
		}
	};

	return plugins.nodemon(nodeOptions)
		.on('restart', (ev) => {
			log('*** nodemon restarted');
			log(`files changed:\n${ ev}`);
			setTimeout(() => {
				browserSync.notify('reloading now ...');
				browserSync.reload({stream: false});
			}, config.browserReloadDelay);
		})
		.on('start', () => {
			log('*** nodemon started');
			startBrowserSync(isDev);
		})
		.on('crash', () => {
			log('*** nodemon crashed: script crashed for some reason');
		})
		.on('exit', () => {
			log('*** nodemon exited cleanly');
		});
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
	if (typeof(msg) === 'object') {
		for (const item in msg) {
			if (msg.hasOwnProperty(item)) {
				plugins.util.log(plugins.util.colors.blue(msg[item]));
			}
		}
	} else {
		plugins.util.log(plugins.util.colors.blue(msg));
	}
}

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
	const srcPattern = new RegExp(`/.*(?=/${ config.source })/`);
	log(`File ${event.path.replace(srcPattern, '')} ${event.type}`);
}

/**
 * Start BrowserSync
 * --nosync will avoid browserSync
 */
function startBrowserSync(isDev) {

	if (argv.nosync || browserSync.active) {
		return;
	}

	const port = 5001;
	log(`Starting BrowserSync on port ${port}`);


	gulp.watch(config.files.sass, ['bs-reload'])
		.on('change', changeEvent);

	gulp.watch(config.files.js, ['bs-reload'])
		.on('change', changeEvent);

	gulp.watch([config.files.jade], ['bs-reload'])
		.on('change', changeEvent);

	gulp.watch([config.files.json], ['bs-reload'])
		.on('change', changeEvent);


	const options = {
		proxy: `dev.garbarinofront.com.ar:${port}`,
		port: 3000,
		files: isDev ? [] : [],
		ghostMode: { // these are the defaults t,f,t,t
			clicks: true,
			location: false,
			forms: true,
			scroll: true
		},
		injectChanges: true,
		logFileChanges: true,
		logLevel: 'info',
		logPrefix: config.projectName,
		notify: true,
		reloadDelay: 1000,
		reloadDebounce: 2000,
		startPath: '/garbarino-front/'

	};


	browserSync(options);
}
