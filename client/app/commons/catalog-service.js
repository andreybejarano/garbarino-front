export class CatalogService {
	constructor($http, apiPath) {
		'ngInject';
		this.$http = $http;
		this.apiPath = apiPath;
	}

	getBrands() {
		return this.$http.get(`${this.apiPath}/brands`)
			.then(response => {
				return response.data;
			})
			.catch(error => {
				throw new Error(error);
			});
	}

	getCategories() {
		return this.$http.get(`${this.apiPath}/categories`)
			.then(response => {
				return response.data;
			})
			.catch(error => {
				throw new Error(error);
			});
	}
}