const BrandsService = require('./brands-service');

class BrandsController {
	static getBrands(req, res) {
		res.json(BrandsService.getBrands());
	}
}

module.exports = BrandsController;
