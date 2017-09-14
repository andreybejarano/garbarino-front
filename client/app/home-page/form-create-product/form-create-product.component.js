export const FormCreateProductComponent = {
	templateUrl: 'home-page/form-create-product/form-create-product.html',
	controller: class FormCreateProductComponent {
		constructor() {
			'ngInject';
		}

		$onInit() {
			this.categories = [
				{
					id: 12345,
					label: 'Televisor'
				},
				{	
					id: 123123,
					label: 'Software'
				}

			];
			$(document).ready(function () { //eslint-disable-line no-undef
				$('select').material_select(); //eslint-disable-line no-undef
			});
		}
	}
};
