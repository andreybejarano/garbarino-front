export const FormCreateProductComponent = {
	templateUrl: 'home-page/form-create-product/form-create-product.html',
	controller: class FormCreateProductComponent {
		constructor(CatalogService) {
			'ngInject';
			this.CatalogService = CatalogService;
		}

		$onInit() {
			this.getCategories();
			this.getBrands();
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
	}
};
