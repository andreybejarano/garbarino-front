import { FormCreateProductComponent } from './form-create-product.component';

export const FormCreateProductModule = angular
	.module('formCreateProduct', [])
	.component('formCreateProduct', FormCreateProductComponent)
	.name;
