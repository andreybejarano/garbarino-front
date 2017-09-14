const config = require('../../config');
const request = require('request-promise');
const CategoriesService = require('../categories/categories-service');
class ProductsService {
	constructor() {
		this.endpoints = config.endpoints;
	}

	getProducts() {
		return new Promise((resolve, reject) => {
			let options = {
				method: 'GET',
				uri: 'http://localhost:3000/api/products/list',
				json: true
			};
			request(options)
				.then(response => {
					resolve(this.transformerProductsResponse(response));
				})
				.catch(error => {
					reject(error);
				});
		});
	}


	transformerProductsResponse(products) {
		const categories = CategoriesService.getCategories();
		products.forEach(element => {
			let category = categories.find(category => {
				return category.id == element.category_id;
			});
			delete element.category_id;
			delete element.id;
			element.category = category.description;
			element.img = (`${element.brand}_${element.category}.jpg`).toLowerCase();
		});

		return products;
	}
}

module.exports = ProductsService;