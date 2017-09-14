export const HomePage = {
	templateUrl: 'home-page/home-page.html',
	controller: class HomePage {
		constructor() {
			'ngInject';
		}

		$onInit() {
			this.products = [
				{
					'name': 'televisor 32 LED',
					'price': 19999.99,
					'list_price': 29999.99,
					'brand': 'SONY',
					'category_id': 12345,
					'img' : 'tvsonyled32.jpg'
				},
				{
					'name': 'televisor 50 4K',
					'price': 29999.99,
					'list_price': 39999.99,
					'brand': 'LG',
					'category_id': 12345,
					'img' : 'tvlgled50.jpg'
				},
				{
					'name': 'Microsoft OFFICE 365 PERSONAL',
					'price': 999.99,
					'list_price': 999.99,
					'brand': 'Microsoft',
					'category_id': 123123,
					'virtual': true,
					'img' : 'softwaremicrosoft.jpg'
				}
			];
		}
	}
};
