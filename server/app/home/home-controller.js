'use strict';

class HomeController{

	static getHome(req, res) {
		res.render('home');
	}
}

module.exports = HomeController;
