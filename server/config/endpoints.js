const config = require('./env');

const endpoints = {
	productsSave: `${config.apiBasePath}/products/save`,
	productsList: `${config.apiBasePath}/products/list`
};

module.exports = Object.assign({}, endpoints);

