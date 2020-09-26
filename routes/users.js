/*
API route to retrieve user object
*/

const requireToken = require('../src/requireToken');
const requireUser = require('../src/requireUser');

module.exports = (router) => {
	// Utilize requireToken and requireUser middleware to authenticate the user
	router.get('/users/self', requireToken, requireUser, (req, res) => {
		const { user } = req;
		res.json({
			user,
		});
	});
};
