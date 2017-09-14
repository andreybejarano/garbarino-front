const onConfig = ($sceDelegateProvider, $locationProvider, $compileProvider, config) => {
	'ngInject';

	if (config.env === 'production') {
		$compileProvider.debugInfoEnabled(false);
		$compileProvider.commentDirectivesEnabled(false);
		$compileProvider.cssClassDirectivesEnabled(false);
	}

	$locationProvider.html5Mode(true);

	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self'
	]);


};

export default onConfig;
