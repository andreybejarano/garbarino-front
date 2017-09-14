class ContextService {
	constructor(context) {
		this.site = context.country_code;
		this.lang = context.language;
	}

	/**
	 * Get the context parameters wraped in an object
	 * @returns {Object} context parameters
	 */
	getContextParameters() {
		return {
			site: this.site,
			lang: this.lang
		};
	}
}

module.exports = ContextService;