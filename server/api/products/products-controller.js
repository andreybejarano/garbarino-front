const ProductsService = require('./products-service');
const service = new ProductsService();

class ProductsController {
	static getProducts(req, res) {
		service.getProducts()
			.then((response) => {
				res.json(response);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}

	static saveProduct(req, res) {
		service.saveProduct(req.body)
			.then((response) => {
				res.status(response.statusCode).json(response.data);
			})
			.catch((error) => {
				res.status(500).json(error);
			});
	}
}

module.exports = ProductsController;
