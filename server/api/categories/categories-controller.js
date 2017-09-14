const CategoriesService = require('./categories-service');

class CategoriesController {
	static getCategories(req, res) {
		res.json(CategoriesService.getCategories());
	}
}

module.exports = CategoriesController;
