export const FormCreateProductComponent = {
	templateUrl: 'home-page/form-create-product/form-create-product.html',
	bindings: {
		sendProduct: '&'
	},
	controller: class FormCreateProductComponent {
		constructor($scope, EventEmitter, CatalogService) {
			'ngInject';
			this.$scope = $scope;
			this.EventEmitter = EventEmitter;
			this.CatalogService = CatalogService;
			this.productForm = {};
		}

		$onInit() {
			this.$scope.$on('clearFormProduct', () => {
				this.clearFormProduct();
			});
			this.getCategories();
			this.getBrands();
		}

		clearFormProduct() {
			this.productForm = {};
		}

		getCategories() {
			this.CatalogService.getCategories()
				.then(categories => {
					this.categories = categories;
				});
		}

		getBrands() {
			this.CatalogService.getBrands()
				.then(brands => {
					this.brands = brands;
				});
		}

		onSendProduct() {
			this.sendProduct(this.EventEmitter(this.productForm));
		}
	}
};
