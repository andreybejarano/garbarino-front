export class ProductsService {
	constructor($http, apiPath) {
		'ngInject';
		this.$http = $http;
		this.apiPath = apiPath;
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