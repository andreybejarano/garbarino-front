export class ProductsService {
	constructor($http, apiPath) {
		'ngInject';
		this.$http = $http;
		this.apiPath = apiPath;
	}

	saveProduct(product) {
		return this.$http.post(`${this.apiPath}/products`, product)
			.then(response => {
				return response;
			})
			.catch(error => {
				throw new Error(error);
			});
	}

	getProducts() {
		return this.$http.get(`${this.apiPath}/products`)
			.then(response => {
				return response.data;
			})
			.catch(error => {
				throw new Error(error);
			});
	}
}