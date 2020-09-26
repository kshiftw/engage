/*
API route for handling account registration.
*/

const rateLimit = require('express-rate-limit');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const { User } = require('../src/database');

module.exports = (router) => {
	router.post(
		'/register',

		// Limit registration to 5 requests per hour
		rateLimit({
			windowMS: 60 * 60 * 1000,
			max: 5,
		}),

		// Validate username and password lengths
		[
			check('username').isString().isLength({ min: 3, max: 32 }),
			check('password').isString().isLength({ min: 5, max: 256 }),
		],
		async (req, res) => {
			const errors = validationResult(req);

			// If there are validation errors, return
			if (!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() });
			}

			const { username, password } = req.body;

			// If the username already exists, return
			if (await User.exists({ username })) {
				return res.status(423).json({ error: 'Username already exists' });
			}

			// Convert password into passwordHash using bcrypt hashing
			const passwordHash = await bcrypt.hash(password, 10);

			// Create a new user in the database with given username, email, passwordHash
			const user = await User.create({
				username,
				passwordHash,
			});

			res.json({
				user: {
					_id: user._id,
					username: user.username,
				},
			});
		}
	);
};
