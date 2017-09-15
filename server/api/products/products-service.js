const config = require('../../config');
const request = require('request-promise');
const CategoriesService = require('../categories/categories-service');
class ProductsService {
	constructor() {
		this.endpoints = config.endpoints;
	}

	saveProduct(product) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'POST',
				uri: 'http://localhost:3000/api/products/save',
				json: true,
				body: this.transformerProductForRequest(product),
				resolveWithFullResponse: true
			};
			request(options)
				.then((response) => {
					resolve(this.transformerProductApiResponse(response));
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	transformerProductForRequest(product) {
		let response = {
			name: product.nameProduct,
			price: product.priceProduct,
			list_price: product.priceListProduct,
			brand: product.brandProduct,
			category_id: product.categoryProduct.id,
			virtual: product.typeProduct || false 

		};

		return response;
	}

	transformerProductApiResponse(response) {
		return {
			'statusCode': response.statusCode,
			'data': response.body
		};
	}

	getProducts() {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'GET',
				uri: 'http://localhost:3000/api/products/list',
				json: true
			};
			request(options)
				.then((response) => {
					resolve(this.transformerProductsResponse(response));
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	transformerProductsResponse(products) {
		const categories = CategoriesService.getCategories();
		products.forEach((element) => {
			const category = categories.find((category) => {
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