export const HomePage = {
	templateUrl: 'home-page/home-page.html',
	controller: class HomePage {
		constructor(ProductsService) {
			'ngInject';
			this.ProductsService = ProductsService;
		}

		$onInit() {
			this.getProducts();
		}

		getProducts() {
			this.ProductsService.getProducts()
				.then(products => {
					this.products = products;
				});
		}
	}
};
