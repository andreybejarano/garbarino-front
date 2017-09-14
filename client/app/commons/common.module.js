import { CatalogService } from './catalog-service';
import { ProductsService } from './products-service';
export const CommonsModule =
	angular.module('common', [])
		.service('CatalogService', CatalogService)
		.service('ProductsService', ProductsService)
		.constant('apiPath', '/garbarino-front/api')
		.name;
