export const HomePage = {
	templateUrl: 'home-page/home-page.html',
	controller: class HomePage {
		constructor($scope, ProductsService) {
			'ngInject';
			this.$scope = $scope;
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

		sendProduct($event) {
			this.ProductsService.saveProduct($event)
				.then(() => {
					this.getProducts();
					this.$scope.$broadcast('clearFormProduct');
					$('#createProductModal').modal('close'); //eslint-disable-line
					Materialize.toast('Producto creado correctamente', 2000); //eslint-disable-line
				})
				.catch(error => {
					Materialize.toast('Error al crear el producto', 2000); //eslint-disable-line
					console.log(error);
				});
		}
	}
};
