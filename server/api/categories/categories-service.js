class CategoriesService {
	static getCategories() {
		return [
			{
				id: 12345,
				description: 'Televisor'
			},
			{
				id: 123123,
				description: 'Software'
			}
		];
	}
}

module.exports = CategoriesService;