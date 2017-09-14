const default_config = { store: 'memory', max: 8600, ttl: 8600 }

const Cache = {
	default_config,
	getCountriesAsOptions: default_config,
	getFinancialEntities: default_config,
	getCreditCars: default_config,
	getDocumentTypes: default_config
};

module.exports = Cache;