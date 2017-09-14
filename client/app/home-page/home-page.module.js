import { HomePage } from './home-page.component';
import { FormCreateProductModule } from './form-create-product/form-create-product.module';
import { CardDetailsProductModule } from './card-details-product/card-details-product.module';

export const HomePageModule = angular
	.module('homePage', [FormCreateProductModule, CardDetailsProductModule])
	.component('homePage', HomePage)
	.name;
