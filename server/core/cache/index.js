const cacheConfig = require('./cache-config');
const cacheManager = require('cache-manager');
const memoryCache = cacheManager.caching(cacheConfig.default_config);


class Cache {

/**
 * get cache record
 * @param {string} method key to store
 * @returns {Promise}
 */
	getCache(method){
		return new Promise( (resolve, reject) => {
			memoryCache.get(method, (err, result) => {
				if(err){ reject(err); }
				resolve(result);
			});
		});
	}

	/**
 * create cache records
 * @param {string} method key to store
 * @param {object} config config of the cache
 * @param {object} method params to store
 * @returns {Promise}
 */
	createCache(method, config, params){
		return new Promise( (resolve, reject) => {
			memoryCache.set(method, params, config, (err) => {
				if(err) { reject(err); }
				resolve(params);
			});
		});
	}

	/**
 * Intercept the methods of the services to implement cache
 * @param {object} reference class to intercept
 * @returns {Promise}
 */
	cacheWrapper(reference) {
		Object.getOwnPropertyNames( cacheConfig ).forEach((method) => {
			if((typeof reference[method] === 'function')) {
				const q = reference[method];
				reference[method] = (...args) => {
					return new Promise((resolve, reject) => {
						this.getCache(method)
							.then((cacheValue) => {
								if(cacheValue){
									resolve(cacheValue);
								}else{
									q.apply(this, args)
										.then((response) => {
											this.createCache(method, cacheConfig[method], response)
												.then(resolve(response))
												.catch(reject());
										})
										.catch((error) => {
											reject(error);
										});
								}
							})
							.catch((error) => reject(error));
					});
				};
			}
		});

		return reference;
	}
}

module.exports = Cache;